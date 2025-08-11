import React, { useContext } from 'react';
import { View, Text, Image } from 'react-native';
import { DarkModeContext } from '@/app/DarkModeContext';

type PostItemProps = {
  title: string;
  content: string;
  author: string;
  avatarUrl?: string;
};

export default function PostItem({ title, content, author, avatarUrl }: PostItemProps) {
  const darkModeContext = useContext(DarkModeContext);
  const isDarkMode = darkModeContext?.isDarkMode ?? false;

  return (
    <View className={`p-4 my-2 rounded-lg shadow-md ${!isDarkMode ? 'bg-gray-800 shadow-white' : 'bg-white shadow-black'}`}>
      <View className="flex-row items-center mb-2">
        {avatarUrl && <Image source={{ uri: avatarUrl }} className="w-10 h-10 rounded-full mr-2" />}
        <Text className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-black'}`}>{author}</Text>
      </View>
      <Text className={`text-xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>{title}</Text>
      <Text className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-800'}`}>{content}</Text>
    </View>
  );
}