import React, { useEffect, useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity,
  ScrollView, Image, Alert, ActivityIndicator
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { launchImageLibrary } from 'react-native-image-picker';

const genders = ['Male', 'Female', 'Other'];
const languages = ['English', 'Hindi', 'Spanish', 'French'];
const trainerTypes = ['Trainer', 'Dietician', 'Dermatologist'];

const EditProfile = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [userId, setUserId] = useState('');

  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [city, setCity] = useState('');
  const [bio, setBio] = useState('');
  const [languagesSpoken, setLanguagesSpoken] = useState([]);

  const [trainerType, setTrainerType] = useState('');
  const [experience, setExperience] = useState('');
  const [currentOccupation, setCurrentOccupation] = useState('');
  const [availableTimings, setAvailableTimings] = useState('');
  const [tagline, setTagline] = useState('');
  const [feesChat, setFeesChat] = useState('');
  const [feesCall, setFeesCall] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        const storedRole = await AsyncStorage.getItem('userRole');
        setUserId(storedUserId);
        setUserRole(storedRole);

        const res = await axios.get(`https://fitness-backend-eight.vercel.app/api/user/profile/${storedUserId}`);
        const user = res.data;

        setName(user.name || '');
        setEmail(user.email || '');
        setPhoneNumber(user.phoneNumber || '');
        setAge(user.age?.toString() || '');
        setGender(user.gender || '');
        setCity(user.city || '');
        setBio(user.bio || '');
        setLanguagesSpoken(user.languages || []);
        setProfileImage(user.profileImage || '');

        if (storedRole === 'trainer') {
          setTrainerType(user.trainerType || '');
          setExperience(user.experience || '');
          setCurrentOccupation(user.currentOccupation || '');
          setAvailableTimings(user.availableTimings || '');
          setTagline(user.tagline || '');
          setFeesChat(user.feesChat?.toString() || '');
          setFeesCall(user.feesCall?.toString() || '');
        }
      } catch (error) {
        console.error('Failed to fetch user profile', error);
        Alert.alert('Error', 'Could not load profile');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const toggleLanguage = (lang) => {
    setLanguagesSpoken(prev =>
      prev.includes(lang) ? prev.filter(l => l !== lang) : [...prev, lang]
    );
  };

  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (!response.didCancel && response.assets?.[0]?.uri) {
        setProfileImage(response.assets[0].uri);
      }
    });
  };

  const handleSave = async () => {
    let uploadedImageUrl = profileImage;
  
    // If user selected a new image (not already uploaded)
    if (profileImage && !profileImage.startsWith('https')) {
      const data = new FormData();
      data.append('file', {
        uri: profileImage,
        type: 'image/jpeg', // or your correct mime type
        name: 'upload.jpg'
      });
      data.append('upload_preset', 'your_upload_preset'); // You will get this from Cloudinary settings
      data.append('cloud_name', 'your_cloud_name'); // Your Cloudinary cloud name
  
      try {
        const res = await fetch('https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', {
          method: 'POST',
          body: data
        });
  
        const cloudData = await res.json();
        uploadedImageUrl = cloudData.secure_url;
      } catch (error) {
        console.error('Cloudinary upload error', error);
        Alert.alert('Error', 'Could not upload image');
        return;
      }
    }
  
    const profileData = {
      userId,
      name,
      email,
      phoneNumber,
      age,
      gender,
      city,
      bio,
      languagesSpoken,
      profileImage: uploadedImageUrl,
    };
  
    if (userRole === 'trainer') {
      profileData.trainerType = trainerType;
      profileData.experience = experience;
      profileData.currentOccupation = currentOccupation;
      profileData.availableTimings = availableTimings;
      profileData.tagline = tagline;
      profileData.feesChat = feesChat;
      profileData.feesCall = feesCall;
    }
  
    setSaving(true);
    try {
      await axios.put('https://fitness-backend-eight.vercel.app/api/user/profile/update', profileData);
      Alert.alert('Success', 'Profile updated successfully');
    } catch (error) {
      console.error('Update failed', error);
      Alert.alert('Error', 'Could not update profile');
    } finally {
      setSaving(false);
    }
  };
  
  

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} color="#329e8e" />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>

      <TouchableOpacity onPress={pickImage} style={styles.imageUploadBox}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.imagePreview} />
        ) : (
          <Text style={styles.uploadText}>Tap to select image</Text>
        )}
      </TouchableOpacity>

      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Phone Number" value={phoneNumber} onChangeText={setPhoneNumber} />
      <TextInput style={styles.input} placeholder="Age" value={age} onChangeText={setAge} keyboardType="numeric" />

      <View style={styles.pickerContainer}>
        <Picker selectedValue={gender} onValueChange={setGender} style={styles.picker}>
          <Picker.Item label="Select Gender" value="" />
          {genders.map(g => <Picker.Item key={g} label={g} value={g} />)}
        </Picker>
      </View>

      <TextInput style={styles.input} placeholder="City" value={city} onChangeText={setCity} />
      <Text style={styles.label}>Languages</Text>
      <View style={styles.checkboxGroup}>
        {languages.map(lang => (
          <TouchableOpacity
            key={lang}
            onPress={() => toggleLanguage(lang)}
            style={[styles.checkbox, languagesSpoken.includes(lang) && styles.checkedCheckbox]}
          >
            <Text style={[styles.checkboxText, languagesSpoken.includes(lang) && styles.checkedText]}>{lang}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput style={styles.input} placeholder="Bio (optional)" value={bio} onChangeText={setBio} multiline />

      {userRole === 'trainer' && (
        <>
          <View style={styles.pickerContainer}>
            <Picker selectedValue={trainerType} onValueChange={setTrainerType} style={styles.picker}>
              <Picker.Item label="Select Trainer Type" value="" />
              {trainerTypes.map(type => <Picker.Item key={type} label={type} value={type} />)}
            </Picker>
          </View>
          <TextInput style={styles.input} placeholder="Experience" value={experience} onChangeText={setExperience} />
          <TextInput style={styles.input} placeholder="Current Occupation" value={currentOccupation} onChangeText={setCurrentOccupation} />
          <TextInput style={styles.input} placeholder="Available Timings" value={availableTimings} onChangeText={setAvailableTimings} />
          <TextInput style={styles.input} placeholder="Tagline" value={tagline} onChangeText={setTagline} />
          <TextInput style={styles.input} placeholder="Fees per hour (Chat)" value={feesChat} onChangeText={setFeesChat} keyboardType="numeric" />
          <TextInput style={styles.input} placeholder="Fees per hour (Call)" value={feesCall} onChangeText={setFeesCall} keyboardType="numeric" />
        </>
      )}

      <TouchableOpacity onPress={handleSave} style={styles.button} disabled={saving}>
        {saving ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Save Changes</Text>}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#329e8e' },
  input: {
    height: 45, borderWidth: 1.5, borderColor: '#329e8e', borderRadius: 10,
    paddingHorizontal: 15, marginBottom: 12, backgroundColor: '#f9f9f9'
  },
  label: { fontWeight: 'bold', marginBottom: 6, marginTop: 10, color: '#329e8e' },
  pickerContainer: {
    borderWidth: 1.5, borderColor: '#329e8e',
    borderRadius: 10, marginBottom: 12, overflow: 'hidden', backgroundColor: '#f9f9f9'
  },
  picker: { height: 50, color: '#333', paddingHorizontal: 10 },
  checkboxGroup: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10 },
  checkbox: {
    paddingVertical: 8, paddingHorizontal: 12, borderRadius: 20, borderWidth: 1.5,
    borderColor: '#329e8e', marginRight: 8, marginBottom: 8
  },
  checkedCheckbox: { backgroundColor: '#329e8e' },
  checkboxText: { color: '#329e8e' },
  checkedText: { color: 'white' },
  button: {
    backgroundColor: '#329e8e', paddingVertical: 14,
    borderRadius: 10, alignItems: 'center', marginTop: 20
  },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  imageUploadBox: {
    height: 180, borderWidth: 2, borderColor: '#329e8e',
    borderRadius: 10, justifyContent: 'center', alignItems: 'center',
    backgroundColor: '#f0fdfa', marginBottom: 20
  },
  imagePreview: { width: '100%', height: '100%', borderRadius: 10 },
  uploadText: { color: '#329e8e', fontSize: 16 }
});

export default EditProfile;
