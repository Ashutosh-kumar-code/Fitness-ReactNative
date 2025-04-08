import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const CalorieMaintenance = () => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [activity, setActivity] = useState('');
  const [calories, setCalories] = useState(null);

  const calculateCalories = () => {
    if (!age || !weight || !height || !gender || !activity) return;

    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseInt(age);
    let bmr = gender === 'male'
      ? 10 * w + 6.25 * h - 5 * a + 5
      : 10 * w + 6.25 * h - 5 * a - 161;

    const activityMultipliers = {
      low: 1.2,
      moderate: 1.55,
      high: 1.9
    };

    const calorieNeeds = bmr * (activityMultipliers[activity] || 1.2);
    setCalories(calorieNeeds.toFixed(0));
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.heading}>Calorie Maintenance</Text>
      <Text style={styles.subheading}>Calculate how many calories you need daily to maintain your current weight.</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Age</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
          placeholder="e.g. 25"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Gender</Text>
        <View style={styles.rowButtons}>
          <TouchableOpacity onPress={() => setGender('male')} style={[styles.genderButton, gender === 'male' && styles.selected, { width: '48%' }]}>
            <Text style={styles.buttonText}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setGender('female')} style={[styles.genderButton, gender === 'female' && styles.selected, { width: '48%' }]}>
            <Text style={styles.buttonText}>Female</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Weight (kg)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
          placeholder="e.g. 70"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Height (cm)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={height}
          onChangeText={setHeight}
          placeholder="e.g. 175"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Activity Level</Text>
        <View style={styles.rowButtons}>
          <TouchableOpacity onPress={() => setActivity('low')} style={[styles.activityButton, activity === 'low' && styles.selected, { width: '30%' }]}>
            <Text style={styles.buttonText}>Low</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActivity('moderate')} style={[styles.activityButton, activity === 'moderate' && styles.selected, { width: '30%' }]}>
            <Text style={styles.buttonText}>Moderate</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActivity('high')} style={[styles.activityButton, activity === 'high' && styles.selected, { width: '30%' }]}>
            <Text style={styles.buttonText}>High</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.calculateButton} onPress={calculateCalories}>
        <Text style={styles.calculateText}>Calculate</Text>
      </TouchableOpacity>

      {calories && (
        <View style={styles.resultBox}>
          <Text style={styles.resultText}>You need approximately</Text>
          <Text style={styles.calories}>{calories} kcal</Text>
          <Text style={styles.resultText}>per day to maintain your weight.</Text>
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
    fontSize: 26,
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
  rowButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  genderButton: {
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#329e8e',
    alignItems: 'center'
  },
  activityButton: {
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#329e8e',
    alignItems: 'center',
    marginBottom: 10
  },
  selected: {
    backgroundColor: '#329e8e'
  },
  buttonText: {
    color: '#333',
    fontWeight: 'bold'
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
    backgroundColor: '#eafaf7',
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
  calories: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#329e8e'
  }
});

export default CalorieMaintenance;