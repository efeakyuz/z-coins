
import Screen from '@/components/common/Screen';
import InfiniteList from '@/components/List/InfiniteList';
import { Colors } from '@/constants/Colors';
import { PADDING } from '@/constants/styles';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';

const Home = () => {
  const theme = useColorScheme() ?? 'light';
  return (
    <Screen style={styles.container}>
      <StatusBar style="dark" />
      <Text style={[styles.text, { color: theme === 'light' ? Colors.light.text : Colors.dark.text }]}>Trending Coins</Text>
      <InfiniteList />
    </Screen >
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F9FA',
    gap: PADDING,
  },
  text: {
    fontSize: 20,
    lineHeight: 20,
    fontWeight: 'bold',
    paddingHorizontal: PADDING
  },
});

export default Home;
