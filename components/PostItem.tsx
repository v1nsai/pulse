import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

type PostItemProps = {
  title: string;
  content: string;
  author: string;
  avatarUrl?: string;
};

export default function PostItem({ title, content, author, avatarUrl }: PostItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {avatarUrl && <Image source={{ uri: avatarUrl }} style={styles.avatar} />}
        <Text style={styles.author}>{author}</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  author: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  content: {
    fontSize: 14,
    color: '#333',
  },
});
