import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { socket } from '../../../App';
// import { socket } from '../../../App'; // Adjust the import if needed
import { Vibration } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { mediaDevices } from 'react-native-webrtc';

const IncomingCallScreen = ({ route }) => {
  const { callerId, signalData, callId } = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    Vibration.vibrate([500, 1000, 500, 1000], true); // pattern + repeat
  
    return () => Vibration.cancel(); // cleanup
  }, []);

  const acceptCall = async () => {
    const userId = await AsyncStorage.getItem('userId');
    if (!userId) return;
  
    // Get user's media stream
    const stream = await mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
  
    socket.emit('acceptCall', { to: callerId, signal: signalData, userId });
  
    navigation.replace('CallScreen', {
      peerId: callerId,
      callId,
      isCaller: false,
      localStream: stream.toURL(), // Pass stream URL
      incomingSignal: signalData,  // Save signal data from caller
    });
  };

  // const acceptCall = async () => {
  //   const userId = await AsyncStorage.getItem('userId');
  //   if (!userId) {
  //     console.warn('User ID not found in AsyncStorage');
  //     return;
  //   }

  //   socket.emit('acceptCall', { to: callerId, signal: signalData,userId });
  //   navigation.replace('CallScreen', {
  //     peerId: callerId,
  //     callId,
  //     isCaller: false, // Trainer is answering
  //   });
  // };

  const rejectCall = () => {
    // You can emit rejectCall event if you want
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Incoming Call...</Text>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.acceptButton} onPress={acceptCall}>
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rejectButton} onPress={rejectCall}>
          <Text style={styles.buttonText}>Reject</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default IncomingCallScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 28,
    marginBottom: 60,
  },
  buttons: {
    flexDirection: 'row',
  },
  acceptButton: {
    backgroundColor: 'green',
    padding: 20,
    borderRadius: 50,
    marginRight: 30,
  },
  rejectButton: {
    backgroundColor: 'red',
    padding: 20,
    borderRadius: 50,
  },
  buttonText: {
    color: 'white',
    fontSize: 22,
  },
});
