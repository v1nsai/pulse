import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import { DarkModeContext } from '@/app/DarkModeContext';

type PostItemProps = {
  title: string;
  content: string;
  author: string;
  avatarUrl?: string;
  url?: string;
  images?: string[];
};

function getImageType(base64: string): string | null {
  const signature = atob(base64.substring(0, 8))
    .split("")
    .map((char) => char.charCodeAt(0).toString(16).padStart(2, "0"))
    .join(" ");

  if (signature.startsWith("89 50 4e 47")) return "image/png";
  if (signature.startsWith("ff d8 ff")) return "image/jpeg";
  if (signature.startsWith("47 49 46 38")) return "image/gif";
  if (signature.startsWith("42 4d")) return "image/bmp";
  if (signature.startsWith("3c 73 76 67 20")) return "image/svg+xml";
  if (signature.startsWith("52 49 46 46") && base64.includes("WEBP")) return "image/webp";

  return null;
}

export default function PostItem({ title, content, author, avatarUrl, url, images }: PostItemProps) {
  const darkModeContext = useContext(DarkModeContext);
  const isDarkMode = darkModeContext?.isDarkMode ?? false;
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    if (url) {
      const fetchOpenGraphData = async () => {
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error('Failed to fetch the URL');
          }
          const html = await response.text();
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
          const metaTags = doc.getElementsByTagName('meta');

          let ogImage = null;
          for (let i = 0; i < metaTags.length; i++) {
            const property = metaTags[i].getAttribute('property');
            if (property === 'og:image') {
              ogImage = metaTags[i].getAttribute('content');
              break;
            }
          }

          if (ogImage) {
            setPreviewImage(ogImage);
          }
        } catch (error) {
          console.error('Failed to fetch Open Graph data:', error);
        }
      };
      fetchOpenGraphData();
    }
  }, [url]);

  return (
    <View
      className={`p-4 my-2 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800 shadow-white' : 'bg-white shadow-black'}`}
    >
      <View className="flex-row items-center mb-2">
        {avatarUrl && (
          <Image
            source={{ uri: avatarUrl }}
            className="w-10 h-10 rounded-full mr-2"
          />
        )}
        <Text className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-black'}`}>{author}</Text>
      </View>
      <Text className={`text-xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>{title}</Text>
      <Text className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>{content}</Text>
      {previewImage && (
        <Image
          source={{ uri: previewImage }}
          className="w-full h-40 rounded-lg mt-2"
        />
      )}
      {images && images.length > 0 && (
        <FlatList
          data={images}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            const type = getImageType(item);
            return (
              <Image
                source={{ uri: `data:${type};base64,${item}` }}
                className="w-full h-40 rounded-lg mt-2"
              />
            );
          }}
          showsHorizontalScrollIndicator={true}
          className="mt-4"
        />
      )}
    </View>
  );
}