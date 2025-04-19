import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import {useNavigation} from '@react-navigation/native';

const { width } = Dimensions.get('window');

const Header = () => {

      const navigation = useNavigation();

  return (
    <View style={styles.wrapper}>
      {/* Curved Background */}
      <View style={styles.curvedBackground}>
        <View style={styles.headerContent}>
          {/* Left: Logo + Title */}
          <View style={styles.logoContainer}>
            <Image source={require('../assets/Images/logo.png')} style={styles.logo} />
            <Text style={styles.appName}>Fitness</Text>
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('my-profile')} >
            <Text style={styles.loginText}>Profile</Text>
          </TouchableOpacity>
          {/* Right: Login Button */}
          <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')} >
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    backgroundColor: '#fff',
  },
  curvedBackground: {
    backgroundColor: '#329E8E',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: width,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logo: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  appName: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'serif',
    color: 'white',
  },
  loginButton: {
    backgroundColor: 'white',
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 20,
  },
  loginText: {
    color: '#329E8E',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Header;
