import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

const AuthChoice = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#E6F6F4" barStyle="dark-content" />

      {/* Skip Button */}
      <TouchableOpacity style={styles.skipBtn} onPress={() => navigation.replace('Main')}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      {/* Header Image */}
      <Animatable.Image
        animation="fadeInDown"
        delay={200}
        source={require('../assets/Images/extended.png')}
        style={styles.headerImage}
        resizeMode="contain"
      />

      {/* Heading + Subheading */}
      <Animatable.View animation="fadeInUp" delay={300} style={styles.content}>
        <Text style={styles.heading}>Welcome to FitZone</Text>
        <Text style={styles.subheading}>
          Start your journey to a healthier, stronger you. Sign up or log in to explore workouts,
          tips, and community!
        </Text>
      </Animatable.View>

      {/* Buttons */}
      <Animatable.View animation="fadeInUp" delay={500} style={styles.buttonsWrapper}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#329E8E' }]}
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#FF5733' }]}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>I Already Have One</Text>
        </TouchableOpacity>
      </Animatable.View>

      {/* Extra Info */}
      <Animatable.View animation="fadeInUp" delay={700} style={styles.extraSection}>
        <Text style={styles.trustText}>💪 Join 10,000+ fitness lovers worldwide</Text>

        <View style={styles.bulletsWrapper}>
          <Text style={styles.bullet}>🔥 Personalized workout plans</Text>
          <Text style={styles.bullet}>👥 Connect with expert trainers</Text>
        </View>

        <Animatable.Text
          animation="pulse"
          iterationCount="infinite"
          direction="alternate"
          style={styles.motivation}
        >
          “Your only limit is you.”
        </Animatable.Text>
      </Animatable.View>
    </View>
  );
};

export default AuthChoice;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F6F4',
    paddingTop: 60,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  skipBtn: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
  },
  skipText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#888',
  },
  headerImage: {
    width: 280,
    height: 200,
    marginBottom: 20,
  },
  content: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 10,
    color: '#1F2F3F',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  subheading: {
    fontSize: 15,
    color: '#4D4D4D',
    marginBottom: 10,
    textAlign: 'center',
    lineHeight: 22,
  },
  buttonsWrapper: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 30,
    marginVertical: 10,
    width: '85%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  extraSection: {
    marginTop: 30,
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
  },
  trustText: {
    fontSize: 14,
    color: '#444',
    fontWeight: '600',
    marginBottom: 10,
  },
  bulletsWrapper: {
    alignItems: 'flex-start',
    width: '90%',
    marginBottom: 10,
  },
  bullet: {
    fontSize: 13,
    color: '#666',
    marginBottom: 5,
    paddingLeft: 10,
  },
  motivation: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#888',
    marginTop: 10,
  },
});
