import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BankDetailsPage = () => {
  const [accountHolderName, setAccountHolderName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [bankName, setBankName] = useState('');
  const [loading, setLoading] = useState(false);
  const [bankDetails, setBankDetails] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetchBankDetails = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await axios.get('https://fitness-backend-eight.vercel.app/api/bank/me', {
        headers: { Authorization: `Bearer ${token}` }
      });

      const detail = response.data;
      setBankDetails(detail);
      setAccountHolderName(detail.accountHolderName);
      setAccountNumber(detail.accountNumber);
      setIfscCode(detail.ifscCode);
      setBankName(detail.bankName);
    } catch (error) {
      setBankDetails(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBankDetails();
  }, []);

  const fetchBankInfoFromIFSC = async (code) => {
    try {
      const response = await axios.get(`https://ifsc.razorpay.com/${code}`);
      return response.data;
    } catch (error) {
      return null;
    }
  };

  const handleSaveOrUpdate = async () => {
    const nameRegex = /^[A-Za-z\s]{3,}$/;
    const accountNumberRegex = /^\d{9,18}$/;
    const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    const bankNameRegex = /^[A-Za-z\s]{3,}$/;

    if (!accountHolderName.trim() || !nameRegex.test(accountHolderName.trim())) {
      Alert.alert('Invalid Input', 'Enter a valid account holder name (letters only, min 3 characters)');
      return;
    }

    if (!accountNumber.trim() || !accountNumberRegex.test(accountNumber.trim())) {
      Alert.alert('Invalid Input', 'Enter a valid account number (9–18 digits)');
      return;
    }

    if (!ifscCode.trim() || !ifscRegex.test(ifscCode.trim().toUpperCase())) {
      Alert.alert('Invalid Input', 'Enter a valid IFSC code (e.g., SBIN0001234)');
      return;
    }

    if (!bankName.trim() || !bankNameRegex.test(bankName.trim())) {
      Alert.alert('Invalid Input', 'Enter a valid bank name (letters only, min 3 characters)');
      return;
    }

    setLoading(true);

    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await axios.post(
        'https://fitness-backend-eight.vercel.app/api/bank/save',
        {
          accountHolderName: accountHolderName.trim(),
          accountNumber: accountNumber.trim(),
          ifscCode: ifscCode.trim().toUpperCase(),
          bankName: bankName.trim(),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      Alert.alert('Success', response.data.message);
      setBankDetails(response.data.detail);
      setIsEditing(false);
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to save bank details');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trainer Bank Details</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#329e8e" style={styles.loadingIndicator} />
      ) : bankDetails && !isEditing ? (
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>Bank Details</Text>
          <Text>Account Holder Name: {bankDetails.accountHolderName}</Text>
          <Text>Account Number: {bankDetails.accountNumber}</Text>
          <Text>IFSC Code: {bankDetails.ifscCode}</Text>
          <Text>Bank Name: {bankDetails.bankName}</Text>
          <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
            <Text style={styles.buttonText}>Edit Details</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.form}>
          <Text style={styles.label}>Account Holder Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Account Holder Name"
            value={accountHolderName}
            onChangeText={setAccountHolderName}
          />

          <Text style={styles.label}>Account Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Account Number"
            keyboardType="numeric"
            value={accountNumber}
            onChangeText={setAccountNumber}
          />

          <Text style={styles.label}>IFSC Code</Text>
          <TextInput
            style={styles.input}
            placeholder="IFSC Code"
            value={ifscCode}
            onChangeText={setIfscCode}
            autoCapitalize="characters"
            onBlur={async () => {
              const trimmedCode = ifscCode.trim().toUpperCase();
              if (trimmedCode.length === 11) {
                const data = await fetchBankInfoFromIFSC(trimmedCode);
                if (data) {
                  setBankName(data.BANK);
                } else {
                  Alert.alert('Invalid IFSC', 'Please enter a valid IFSC code');
                  setBankName('');
                }
              }
            }}
          />

          <Text style={styles.label}>Bank Name</Text>
          <TextInput
            style={[styles.input, { backgroundColor: '#f9f9f9' }]}
            placeholder="Bank Name"
            value={bankName}
            onChangeText={setBankName}
            editable={false}
          />

          <TouchableOpacity style={styles.button} onPress={handleSaveOrUpdate}>
            <Text style={styles.buttonText}>{bankDetails ? 'Update' : 'Save'} Bank Details</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  form: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: '#329e8e',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  editButton: {
    marginTop: 15,
    backgroundColor: '#f1a400',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  detailsContainer: {
    marginTop: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  loadingIndicator: {
    marginTop: 50,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
    marginTop: 10,
  },
});

export default BankDetailsPage;
