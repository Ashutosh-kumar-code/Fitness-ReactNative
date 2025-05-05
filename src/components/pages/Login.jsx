import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please enter email and password.');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post('https://fitness-backend-node.onrender.com/api/user/login', { email, password });

            const { token, user } = response.data;

            // Save token and user ID to AsyncStorage
            await AsyncStorage.setItem('userToken', token);
            await AsyncStorage.setItem('userId', user._id);
            await AsyncStorage.setItem('userRole', user.role);

            Alert.alert('Success', 'Login successful!');
            navigation.replace('Main'); // Replace so user can’t go back to login
        } catch (error) {
            Alert.alert('Error', error.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" style={styles.input} />
            <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
            <TouchableOpacity onPress={handleLogin} style={styles.button} disabled={loading}>
                <Text style={styles.buttonText}>{loading ? 'Logging in...' : 'Login'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.signupText}>Don't have an account? Sign up</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    signupText: {
        textAlign: 'center',
        marginTop: 10,
        color: '#329e8e',
        fontSize: 16,
        fontWeight: 'bold'
    }
});

export default Login;
