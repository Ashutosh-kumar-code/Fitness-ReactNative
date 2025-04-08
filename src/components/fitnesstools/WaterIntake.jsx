import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const WaterIntake = () => {
  const [weight, setWeight] = useState('');
  const [intake, setIntake] = useState(null);

  const calculateIntake = () => {
    if (!weight) return;
    const w = parseFloat(weight);
    const waterIntake = w * 35; // in ml
    setIntake(waterIntake);
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.heading}>💧 Daily Water Intake</Text>
      <Text style={styles.subheading}>Stay hydrated! Know how much water your body needs every day based on your weight.</Text>

      <View style={styles.graphicBox}>
        <Text style={styles.graphic}>🚰 + 🧍‍♂️ = 💪</Text>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Enter Your Weight (kg)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
          placeholder="e.g. 70"
        />
      </View>

      <TouchableOpacity style={styles.calculateButton} onPress={calculateIntake}>
        <Text style={styles.calculateText}>Calculate Water Need</Text>
      </TouchableOpacity>

      {intake && (
        <View style={styles.resultBox}>
          <Text style={styles.resultText}>Your recommended daily water intake is:</Text>
          <Text style={styles.waterAmount}>{(intake / 1000).toFixed(2)} Liters</Text>
          <Text style={styles.tip}>💡 Tip: Carry a water bottle with you to meet your daily goal!</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#329e8e',
    marginBottom: 10,
    textAlign: 'center'
  },
  subheading: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 25,
  },
  graphicBox: {
    backgroundColor: '#eafaf7',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20
  },
  graphic: {
    fontSize: 24,
    textAlign: 'center'
  },
  inputGroup: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    color: '#333'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    color: '#333'
  },
  calculateButton: {
    backgroundColor: '#329e8e',
    paddingVertical: 14,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginTop: 10
  },
  calculateText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  resultBox: {
    backgroundColor: '#d7f4ee',
    marginTop: 30,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#329e8e',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4
  },
  resultText: {
    fontSize: 16,
    color: '#444',
    marginBottom: 5,
    textAlign: 'center'
  },
  waterAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#329e8e',
    marginBottom: 5
  },
  tip: {
    fontSize: 14,
    color: '#555',
    fontStyle: 'italic',
    textAlign: 'center'
  }
});

export default WaterIntake;