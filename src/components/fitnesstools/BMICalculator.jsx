import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, Image, ScrollView } from 'react-native';

const { width } = Dimensions.get('window');

const BMICalculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');

  const calculateBMI = () => {
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    if (h > 0 && w > 0) {
      const result = (w / (h * h)).toFixed(1);
      setBmi(result);
      if (result < 18.5) setCategory('Underweight');
      else if (result >= 18.5 && result < 24.9) setCategory('Normal');
      else if (result >= 25 && result < 29.9) setCategory('Overweight');
      else setCategory('Obese');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>BMI Calculator</Text>
      <Image source={require('../../assets/Images/bmi.png')} style={styles.image} />
      <Text style={styles.subtitle}>Know your health category by calculating your Body Mass Index.</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter height in cm"
          keyboardType="numeric"
          style={styles.input}
          value={height}
          onChangeText={setHeight}
        />
        <TextInput
          placeholder="Enter weight in kg"
          keyboardType="numeric"
          style={styles.input}
          value={weight}
          onChangeText={setWeight}
        />
        <TouchableOpacity style={styles.button} onPress={calculateBMI}>
          <Text style={styles.buttonText}>Calculate</Text>
        </TouchableOpacity>
      </View>

      {bmi && (
        <View style={styles.resultCard}>
          <Text style={styles.resultText}>Your BMI is</Text>
          <Text style={styles.bmiValue}>{bmi}</Text>
          <Text style={styles.category}>Category: <Text style={styles.highlight}>{category}</Text></Text>
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
    minHeight: '100%'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#329e8e',
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 15
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#444',
    marginBottom: 20,
    paddingHorizontal: 10
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center'
  },
  input: {
    width: width - 60,
    borderWidth: 1.5,
    borderColor: '#329e8e',
    borderRadius: 14,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#f9fdfc',
    color: '#333'
  },
  button: {
    backgroundColor: '#329e8e',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    // elevation: 4
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  resultCard: {
    marginTop: 30,
    backgroundColor: '#eafaf7',
    padding: 25,
    borderRadius: 20,
    alignItems: 'center',
    width: width - 40,
    shadowColor: '#329e8e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  resultText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5
  },
  bmiValue: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#329e8e',
    marginBottom: 10
  },
  category: {
    fontSize: 18,
    color: '#333'
  },
  highlight: {
    fontWeight: 'bold',
    color: '#21756b'
  }
});

export default BMICalculator;