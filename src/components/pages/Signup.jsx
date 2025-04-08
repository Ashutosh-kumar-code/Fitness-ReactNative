import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Alert, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';

const Signup = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [bio, setBio] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [city, setCity] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [experience, setExperience] = useState('');
    const [currentOccupation, setCurrentOccupation] = useState('');
    const [availableTimings, setAvailableTimings] = useState('');
    const [tagline, setTagline] = useState('');
    const [loading, setLoading] = useState(false);
    
    const handleSignup = async () => {
        if (!name || !email || !password || !age || !gender || !city) {
            Alert.alert('Error', 'Please fill all required fields.');
            return;
        }
        
        const userData = { name, email, password, role, bio, age, gender, city, profileImage };
        if (role === 'trainer') {
            userData.experience = experience;
            userData.currentOccupation = currentOccupation;
            userData.availableTimings = availableTimings;
            userData.tagline = tagline;
        }
        
        setLoading(true);
        try {
            const response = await axios.post('https://your-api-url/register', userData);
            Alert.alert('Success', response.data.message);
            navigation.navigate('Login');
        } catch (error) {
            Alert.alert('Error', error.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Signup</Text>
            <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
            <TextInput placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" style={styles.input} />
            <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
            <TextInput placeholder="Age" value={age} onChangeText={setAge} keyboardType="numeric" style={styles.input} />
            <TextInput placeholder="Gender" value={gender} onChangeText={setGender} style={styles.input} />
            <TextInput placeholder="City" value={city} onChangeText={setCity} style={styles.input} />
            <TextInput placeholder="Bio (optional)" value={bio} onChangeText={setBio} multiline style={styles.input} />
            {/* <View style={styles.roleContainer}>
                <TouchableOpacity onPress={() => setRole('user')} style={[styles.roleButton, role === 'user' && styles.selectedRole]}>
                    <Text style={[styles.roleText, role === 'user' && styles.selectedRoleText]}>User</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setRole('trainer')} style={[styles.roleButton, role === 'trainer' && styles.selectedRole]}>
                    <Text style={[styles.roleText, role === 'trainer' && styles.selectedRoleText]}>Trainer</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setRole('dermatologist')} style={[styles.roleButton, role === 'dermatologist' && styles.selectedRole]}>
                    <Text style={[styles.roleText, role === 'dermatologist' && styles.selectedRoleText]}>Dermatologist</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setRole('dietician')} style={[styles.roleButton, role === 'dietician' && styles.selectedRole]}>
                    <Text style={[styles.roleText, role === 'dietician' && styles.selectedRoleText]}>Dietician</Text>
                </TouchableOpacity>
                
            </View> */}
            <View style={styles.roleContainer}>
  <View style={styles.roleRow}>
    <TouchableOpacity onPress={() => setRole('user')} style={[styles.roleButton, role === 'user' && styles.selectedRole]}>
      <Text style={[styles.roleText, role === 'user' && styles.selectedRoleText]}>User</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => setRole('trainer')} style={[styles.roleButton, role === 'trainer' && styles.selectedRole]}>
      <Text style={[styles.roleText, role === 'trainer' && styles.selectedRoleText]}>Trainer</Text>
    </TouchableOpacity>
  </View>
  <View style={styles.roleRow}>
    <TouchableOpacity onPress={() => setRole('dermatologist')} style={[styles.roleButton, role === 'dermatologist' && styles.selectedRole]}>
      <Text style={[styles.roleText, role === 'dermatologist' && styles.selectedRoleText]}>Dermatologist</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => setRole('dietician')} style={[styles.roleButton, role === 'dietician' && styles.selectedRole]}>
      <Text style={[styles.roleText, role === 'dietician' && styles.selectedRoleText]}>Dietician</Text>
    </TouchableOpacity>
  </View>
</View>

            {(role === 'trainer' || role === 'dermatologist' || role === 'dietician') && (
                <View style={styles.extraFields}>
                    <TextInput placeholder="Experience" value={experience} onChangeText={setExperience} style={styles.input} />
                    <TextInput placeholder="Current Occupation" value={currentOccupation} onChangeText={setCurrentOccupation} style={styles.input} />
                    <TextInput placeholder="Available Timings" value={availableTimings} onChangeText={setAvailableTimings} style={styles.input} />
                    <TextInput placeholder="Tagline" value={tagline} onChangeText={setTagline} style={styles.input} />
                </View>
            )}
            <TouchableOpacity onPress={handleSignup} style={styles.button} disabled={loading}>
                <Text style={styles.buttonText}>{loading ? 'Registering...' : 'Register'}</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#329e8e'
    },
    input: {
        height: 45,
        borderWidth: 2,
        borderColor: '#329e8e',
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 12,
        backgroundColor: '#f9f9f9'
    },
    roleContainer: {
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        marginBottom: 10,
    },
    roleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
      },      
    roleButton: {
        flex: 1,
        padding: 12,
        marginHorizontal: 5,
        borderWidth: 2,
        borderColor: '#329e8e',
        borderRadius: 8,
        alignItems: 'center', 
    },
    selectedRole: {
        backgroundColor: '#329e8e',
    },
    selectedRoleText: {
        color: 'white'
    },
    roleText: {
        color: '#329e8e',
        fontWeight: 'bold'
    },
    button: {
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: '#329e8e',
        shadowColor: '#329e8e',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
    extraFields: {
        marginTop: 10
    }
});

export default Signup;
