
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function MyProfile() {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    try {
      await AsyncStorage.multiRemove(['userToken', 'userId', 'userRole']);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const fetchProfile = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem('userId');
      const res = await axios.get(`https://fitness-backend-eight.vercel.app/api/user/profile/${storedUserId}`);
      setUserData(res.data);
    } catch (error) {
      console.error('Failed to load profile:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const menuOptions = [
    { label: 'Edit Profile', icon: 'edit', onPress: () => navigation.navigate('Edit Profile') },
    { label: 'Your Blogs', icon: 'article', onPress: () => navigation.navigate('Your Blogs') },
    { label: 'Bank Details', icon: 'article', onPress: () => navigation.navigate('Bank Details') },
    { label: 'Logout', icon: 'logout', onPress: handleLogout },
  ];

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 50 }} size="large" color="#329e8e" />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Profile</Text>
        <View style={styles.coins}>
          <Image source={require('../../assets/Images/rupee.png')} />
          <Text style={styles.coinsText}>{userData?.wallet || 0}</Text>
        </View>
      </View>

      <View style={styles.profileSection}>
      <Image
  source={userData?.profileImage ? { uri: userData?.profileImage } : require('../../assets/Images/trainer.png')}
  style={styles.profileImage}
/>
        <Text style={styles.name}>{userData?.name || 'User Name'}</Text>
      </View>

      <View style={styles.optionsContainer}>
        {menuOptions.map((option, index) => (
          <TouchableOpacity key={index} style={styles.option} onPress={option.onPress}>
            <View style={styles.optionLeft}>
              <Image source={require('../../assets/Images/profile1.png')} />
              <Text style={styles.optionText}>{option.label}</Text>
            </View>
            <Image source={require('../../assets/Images/right-arrow.png')} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    header: {
      paddingTop: 50,
      paddingHorizontal: 20,
      paddingBottom: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#000',
    },
    coins: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    coinsText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#000',
    },
    profileSection: {
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 30,
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      borderWidth: 3,
      borderColor: '#329E8E',
      backgroundColor: '#f0f0f0',
    },
    name: {
      marginTop: 10,
      fontSize: 18,
      fontWeight: '600',
      color: '#333',
    },
    optionsContainer: {
      paddingHorizontal: 20,
    },
    option: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
    optionLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    optionText: {
      fontSize: 16,
      color: '#333',
    },
    deleteAccount: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 30,
      gap: 12,
    },
    deleteText: {
      color: 'red',
      fontSize: 16,
      fontWeight: '600',
    },
  });
