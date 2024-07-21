import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    // Simulate a loading process then navigate to the home screen
    const timer = setTimeout(() => {
      router.replace('/home');
    }, 2000); // Adjust the duration as needed

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/zcoins.png')} style={styles.logo} />
      <Text style={[styles.subtitle, { position: 'absolute', bottom: 30 }]}>BiLira Cryptocurrency Exchange</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  logo: {
    marginBottom: 20,
  },
  subtitle: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: '#343A40',
  },
});

export default Index;
