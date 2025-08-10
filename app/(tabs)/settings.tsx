import { useContext, useEffect } from 'react';
import * as React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native'
import { DarkModeContext } from '../DarkModeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsPage() {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error('DarkModeContext is undefined. Make sure your component is wrapped in a DarkModeContext.Provider.');
  }
  const { isDarkMode, toggleDarkMode } = context;

  useEffect(() => {
    const fetchDarkMode = async () => {
      const darkMode = await AsyncStorage.getItem('isDarkMode')
      toggleDarkMode()
    }
    fetchDarkMode()
  }, [])
  
  useEffect(() => {
    AsyncStorage.setItem('isDarkMode', isDarkMode.toString())
  }, [isDarkMode])

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings Page</Text>
      <View style={styles.toggleContainer}>
        <Text style={styles.text}>Dark Mode</Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleDarkMode}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
})
