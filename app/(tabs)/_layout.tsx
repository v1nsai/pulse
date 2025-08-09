import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import MaterialCommunityIcons from '@expo/vector-icons/build/MaterialCommunityIcons';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'] | React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  color: string;
  iconLibrary?: 'FontAwesome' | 'MaterialCommunityIcons';
}) {
  const { iconLibrary, name, color } = props;
  if (iconLibrary === 'MaterialCommunityIcons') {
    return <MaterialCommunityIcons 
      name={name as React.ComponentProps<typeof MaterialCommunityIcons>['name']} 
      color={color} 
      size={28} 
      style={{ marginBottom: -3 }} />
  }
  if (iconLibrary === 'FontAwesome') {
    return <FontAwesome 
      name={name as React.ComponentProps<typeof FontAwesome>['name']} 
      color={color} 
      size={28} 
      style={{ marginBottom: -3 }} />
  }
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="feed"
        options={{
          title: 'Feed',
          tabBarIcon: ({ color }) => <TabBarIcon name="post-outline" color={color} iconLibrary='MaterialCommunityIcons' />,
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: 'Messages',
          tabBarIcon: ({ color }) => <TabBarIcon name="envelope" color={color} iconLibrary='FontAwesome' />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} iconLibrary='FontAwesome' />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} iconLibrary='FontAwesome' />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <TabBarIcon name="cog" color={color} iconLibrary='FontAwesome' />,
        }}
      />
    </Tabs>
  );
}
