// frontend/screens/CallStartScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios'; // ✅ install axios if not already

const API_BASE_URL = 'https://fitness-backend-eight.vercel.app/api/call'; // 👈 change to your backend

const CallStartScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userId, trainerId } = route.params || {};

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId || !trainerId) {
      navigation.navigate('Home');
      return;
    }

    const startCall = async () => {
      try {
        const res = await axios.post(`${API_BASE_URL}/start`, { userId, trainerId });
        console.log('Call started:', res.data);

        // Wait 2 seconds for better UX
        setTimeout(() => {
          navigation.replace('CallScreen', {
            userId,             // your current user's ID
            peerId: trainerId,
            receiverId: trainerId,
            callId: res.data.callId, // Pass callId also
            isCaller: true      // since this user initiated the call
          });
        }, 2000);
      } catch (error) {
        console.error('Start call failed:', error);
        Alert.alert('Call Failed', error.response?.data?.message || 'Something went wrong');
        navigation.navigate('Home');
      } finally {
        setLoading(false);
      }
    };

    startCall();
  }, [userId, trainerId, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Successful!</Text>
      <Text style={styles.subtitle}>Starting your call...</Text>
      {loading && <ActivityIndicator size="large" color="#34D399" style={{ marginTop: 20 }} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#059669',
  },
  subtitle: {
    fontSize: 18,
    color: '#047857',
    marginTop: 10,
  },
});

export default CallStartScreen;
