import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { DarkModeContext } from '@/app/DarkModeContext';

type PostItemProps = {
  title: string;
  content: string;
  author: string;
  avatarUrl?: string;
  url?: string;
};

export default function PostItem({ title, content, author, avatarUrl, url }: PostItemProps) {
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
    </View>
  );
}