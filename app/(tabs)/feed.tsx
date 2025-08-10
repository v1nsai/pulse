import React, { useState, useEffect } from 'react'
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native'
import PostItem from '@/components/PostItem'
import { useDarkMode } from '@/app/DarkModeContext';

const BACKEND_URL = 'https://jsonplaceholder.typicode.com'

type Post = {
  id: string | number
  title: string
  body: string
  author: string
  avatarUrl: string
}

export default function Feed() {
  const { isDarkMode } = useDarkMode();
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    if (loading || !hasMore) return

    setLoading(true)
    try {
      const response = await fetch(`${BACKEND_URL}/posts/`)
      const data = await response.json()

      if (data.length === 0) {
        setHasMore(false)
      } else {
        setPosts((prevPosts) => [...prevPosts, ...data])
        setPage((prevPage) => prevPage + 1)
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const renderFooter = () => {
    if (!loading) return null
    return <ActivityIndicator style={styles.loader} />
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#000' : '#f5f5f5',
    },
    loader: {
      marginVertical: 20,
    },
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <PostItem
            title={item.title}
            content={item.body}
            author={item.author}
            avatarUrl={item.avatarUrl}
          />
        )}
        onEndReached={fetchPosts}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </View>
  )
}
