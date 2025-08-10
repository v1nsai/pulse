import React from 'react';
import { useDarkMode } from '../DarkModeContext';
import { View, Text, StyleSheet, Switch } from 'react-native';

export default function SettingsPage() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings Page</Text>
      <View style={styles.toggleContainer}>
        <Text style={styles.text}>Dark Mode</Text>
        <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
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
});