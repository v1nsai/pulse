import { Link, Stack } from 'expo-router';
import { Text, View } from '@/components/Themed';
import React from 'react';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View className="flex-1 items-center justify-center p-5">
        <Text className="text-xl font-bold">This screen doesn't exist.</Text>

        <Link href="/feed" className="mt-4 py-4">
          <Text className="text-sm text-blue-600">Go to my home feed</Text>
        </Link>
      </View>
    </>
  );
}
