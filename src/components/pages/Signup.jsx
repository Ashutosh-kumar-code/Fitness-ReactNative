import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator
} from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { launchImageLibrary } from 'react-native-image-picker';

const rolesWithImages = [
  { role: 'user', label: 'User', image: require('../../assets/Images/trainer_1.png') },
  { role: 'trainer', label: 'Trainer', image: require('../../assets/Images/trainer_1.png') },
];

const genders = ['Male', 'Female', 'Other'];
const languages = ['English', 'Hindi', 'Spanish', 'French'];
const trainerTypes = ['Trainer', 'Dietician', 'Dermatologist'];

const Signup = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [city, setCity] = useState('');
  const [bio, setBio] = useState('');
  const [languagesSpoken, setLanguagesSpoken] = useState([]);
  const [profileImage, setProfileImage] = useState(null);

  const [trainerType, setTrainerType] = useState('');
  const [experience, setExperience] = useState('');
  const [currentOccupation, setCurrentOccupation] = useState('');
  const [availableTimings, setAvailableTimings] = useState('');
  const [tagline, setTagline] = useState('');
  const [feesChat, setFeesChat] = useState('');
  const [feesCall, setFeesCall] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleLanguage = (lang) => {
    if (languagesSpoken.includes(lang)) {
      setLanguagesSpoken(languagesSpoken.filter(l => l !== lang));
    } else {
      setLanguagesSpoken([...languagesSpoken, lang]);
    }
  };

  const handleImagePick = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) return;
      if (response.errorMessage) {
        Alert.alert('Image Picker Error', response.errorMessage);
      } else {
        const uri = response.assets?.[0]?.uri;
        if (uri) setProfileImage(uri);
      }
    });
  };

  const handleSignup = async () => {
    if (!name || !email || !password || !phoneNumber || !age || !gender || !city) {
      Alert.alert('Error', 'Please fill all required fields.');
      return;
    }
  
    const userData = {
      name,
      email,
      password,
      role,
      bio,
      phoneNumber,
      age,
      gender,
      city,
      profileImage, // assuming you're sending URI or base64 here
      languages: languagesSpoken,
    };
  
    if (role === 'trainer') {
      Object.assign(userData, {
        trainerType,
        experience,
        currentOccupation,
        availableTimings,
        tagline,
        feesChat,
        feesCall,
      });
    }
  
    setLoading(true);
    try {
      const response = await axios.post('https://fitness-backend-eight.vercel.app/api/user/register', userData);
      Alert.alert('Success', response.data.message);
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Step 1: Choose Role */}
      {step === 1 && (
        <View>
          <Text style={styles.title}>Choose Your Role</Text>
          <View style={styles.roleGrid}>
            {rolesWithImages.map((item) => (
              <TouchableOpacity
                key={item.role}
                onPress={() => {
                  setRole(item.role);
                  setStep(2);
                }}
                style={styles.roleCard}
              >
                <Image source={item.image} style={styles.roleImage} />
                <Text style={styles.roleLabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Step 2: Upload Image */}
      {step === 2 && (
        <View>
          <Text style={styles.title}>Upload Profile Image</Text>
          <TouchableOpacity onPress={handleImagePick} style={styles.imageUploadBox}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.imagePreview} />
            ) : (
              <Text style={styles.uploadText}>Tap to select image</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setStep(3)} style={styles.button}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Step 3: Personal Info */}
      {step === 3 && (
        <View>
          <Text style={styles.title}>Personal Info</Text>
          <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
          <TextInput placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" style={styles.input} />
          <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
          <TextInput placeholder="Phone Number" value={phoneNumber} onChangeText={setPhoneNumber} keyboardType="phone-pad" style={styles.input} />
          <TextInput placeholder="Age" value={age} onChangeText={setAge} keyboardType="numeric" style={styles.input} />

          <View style={styles.pickerContainer}>
            <Picker selectedValue={gender} onValueChange={setGender} style={styles.picker}>
              <Picker.Item label="Select Gender" value="" />
              {genders.map(g => <Picker.Item key={g} label={g} value={g} />)}
            </Picker>
          </View>

          <TextInput placeholder="City" value={city} onChangeText={setCity} style={styles.input} />
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
          <TextInput placeholder="Bio (optional)" value={bio} onChangeText={setBio} style={styles.input} multiline />

          {role === 'trainer' && (
            <View>
              <View style={styles.pickerContainer}>
                <Picker selectedValue={trainerType} onValueChange={setTrainerType} style={styles.picker}>
                  <Picker.Item label="Select Trainer Type" value="" />
                  {trainerTypes.map(type => <Picker.Item key={type} label={type} value={type} />)}
                </Picker>
              </View>
              <TextInput placeholder="Experience" value={experience} onChangeText={setExperience} style={styles.input} />
              <TextInput placeholder="Current Occupation" value={currentOccupation} onChangeText={setCurrentOccupation} style={styles.input} />
              <TextInput placeholder="Available Timings" value={availableTimings} onChangeText={setAvailableTimings} style={styles.input} />
              <TextInput placeholder="Tagline" value={tagline} onChangeText={setTagline} style={styles.input} />
              <TextInput placeholder="Fees per hour (Chat)" value={feesChat} onChangeText={setFeesChat} keyboardType="numeric" style={styles.input} />
              <TextInput placeholder="Fees per hour (Call)" value={feesCall} onChangeText={setFeesCall} keyboardType="numeric" style={styles.input} />
            </View>
          )}

          <TouchableOpacity onPress={handleSignup} style={styles.button} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Register</Text>}
          </TouchableOpacity>
        </View>
      )}
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
  roleGrid: { flexDirection: 'row', justifyContent: 'space-around' },
  roleCard: {
    alignItems: 'center', width: '45%', backgroundColor: '#e6faf6', padding: 15,
    borderRadius: 10, borderWidth: 2, borderColor: '#329e8e'
  },
  roleImage: { width: 80, height: 80, marginBottom: 10, resizeMode: 'contain' },
  roleLabel: { fontSize: 16, fontWeight: '600', color: '#329e8e' },
  label: { fontWeight: 'bold', marginBottom: 6, marginTop: 10, color: '#329e8e' },
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
  pickerContainer: {
    borderWidth: 1.5, borderColor: '#329e8e',
    borderRadius: 10, marginBottom: 12, overflow: 'hidden', backgroundColor: '#f9f9f9'
  },
  picker: { height: 50, color: '#333', paddingHorizontal: 10 },
  imageUploadBox: {
    height: 180, borderWidth: 2, borderColor: '#329e8e',
    borderRadius: 10, justifyContent: 'center', alignItems: 'center',
    backgroundColor: '#f0fdfa', marginBottom: 20
  },
  imagePreview: { width: '100%', height: '100%', borderRadius: 10 },
  uploadText: { color: '#329e8e', fontSize: 16 }
});

export default Signup;
