import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const BodyFatPercentage = () => {
  const [waist, setWaist] = useState('');
  const [neck, setNeck] = useState('');
  const [height, setHeight] = useState('');
  const [hip, setHip] = useState(''); // For females
  const [gender, setGender] = useState('');
  const [bodyFat, setBodyFat] = useState(null);

  const calculateBodyFat = () => {
    if (!waist || !neck || !height || !gender) return;
    const w = parseFloat(waist);
    const n = parseFloat(neck);
    const h = parseFloat(height);
    const hp = parseFloat(hip);

    let bf = 0;

    if (gender === 'male') {
      bf = 495 / (1.0324 - 0.19077 * Math.log10(w - n) + 0.15456 * Math.log10(h)) - 450;
    } else if (gender === 'female') {
      if (!hip) return;
      bf = 495 / (1.29579 - 0.35004 * Math.log10(w + hp - n) + 0.22100 * Math.log10(h)) - 450;
    }

    setBodyFat(bf.toFixed(2));
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.heading}>Body Fat Percentage</Text>
      <Text style={styles.subheading}>Estimate your body fat using the U.S. Navy Method.</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Gender</Text>
        <View style={styles.rowButtons}>
          <TouchableOpacity onPress={() => setGender('male')} style={[styles.optionButton, gender === 'male' && styles.selected]}>
            <Text style={styles.optionText}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setGender('female')} style={[styles.optionButton, gender === 'female' && styles.selected]}>
            <Text style={styles.optionText}>Female</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Waist (cm)</Text>
        <TextInput style={styles.input} keyboardType="numeric" value={waist} onChangeText={setWaist} placeholder="e.g. 85" />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Neck (cm)</Text>
        <TextInput style={styles.input} keyboardType="numeric" value={neck} onChangeText={setNeck} placeholder="e.g. 40" />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Height (cm)</Text>
        <TextInput style={styles.input} keyboardType="numeric" value={height} onChangeText={setHeight} placeholder="e.g. 175" />
      </View>

      {gender === 'female' && (
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Hip (cm)</Text>
          <TextInput style={styles.input} keyboardType="numeric" value={hip} onChangeText={setHip} placeholder="e.g. 95" />
        </View>
      )}

      <TouchableOpacity style={styles.calculateButton} onPress={calculateBodyFat}>
        <Text style={styles.calculateText}>Calculate</Text>
      </TouchableOpacity>

      {bodyFat && (
        <View style={styles.resultBox}>
          <Text style={styles.resultHighlight}>Your Body Fat</Text>
          <Text style={styles.resultValue}>{bodyFat}%</Text>
          <Text style={styles.resultNote}>Based on the U.S. Navy Body Fat Formula</Text>
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
    textAlign: 'center',
  },
  subheading: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 25,
  },
  inputGroup: {
    width: '100%',
    marginBottom: 18,
  },
  label: {
    fontSize: 15,
    color: '#333',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    backgroundColor: '#f9f9f9',
    fontSize: 16,
    color: '#333',
  },
  rowButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionButton: {
    width: '48%',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#329e8e',
    alignItems: 'center',
  },
  selected: {
    backgroundColor: '#329e8e',
  },
  optionText: {
    color: '#333',
    fontWeight: 'bold',
  },
  calculateButton: {
    backgroundColor: '#329e8e',
    paddingVertical: 14,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  calculateText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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
    elevation: 4,
  },
  resultHighlight: {
    fontSize: 18,
    color: '#444',
    marginBottom: 8,
    fontWeight: '600',
  },
  resultValue: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#329e8e',
  },
  resultNote: {
    fontSize: 13,
    color: '#888',
    marginTop: 5,
  },
});

export default BodyFatPercentage;