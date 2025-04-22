// src/screens/Welcome.tsx

import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

const Welcome = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Animatable.View
        animation="fadeInUp"
        delay={300}
        duration={1000}
        style={styles.card}
      >
        <Animatable.Image
          animation="bounceIn"
          delay={100}
          source={require('../assets/Images/extended.png')}
          style={styles.image}
          resizeMode="contain"
        />

        <Animatable.Text animation="fadeInDown" delay={400} style={styles.title}>
          <Text style={{ color: '#FF5733' }}>Make </Text>
          Your Body
          {'\n'}
          <Text style={{ color: '#329E8E' }}>Healthy & Fit</Text>
        </Animatable.Text>

        <Animatable.Text
          animation="fadeIn"
          delay={700}
          style={styles.subtitle}
        >
          Best GYM & Fitness Center Build Your Health & ultimate fitness solution.
        </Animatable.Text>

        <Animatable.View animation="pulse" iterationCount="infinite" delay={1500}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.replace('AuthChoice')}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </Animatable.View>
      </Animatable.View>
    </View>
  );
};

export default Welcome;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F6F4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#329E8E',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#329E8E',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
