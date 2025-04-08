import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import {useNavigation} from '@react-navigation/native';

const { width } = Dimensions.get('window');

const tools = [
  {
    id: '1',
    name: 'BMI Calculator',
    description: 'Calculate your Body Mass Index to understand your weight category.',
    image: require('../assets/Images/bmi.png'),
    page_url: 'bmi',
  },
  {
    id: '2',
    name: 'Calorie Maintenance',
    description: 'Find out how many calories you need to maintain your weight.',
    image: require('../assets/Images/low-calorie.png'),
    page_url: 'calorie-maintain',
  },
  {
    id: '3',
    name: 'Water Intake',
    description: 'Track your daily water intake requirements.',
    image: require('../assets/Images/hydration.png'),
    page_url: 'water-intake',
  },
  {
    id: '4',
    name: 'Body Fat Percentage',
    description: 'Estimate your body fat percentage using measurements.',
    image: require('../assets/Images/body-fat.png'),
    page_url: 'body-fat',
  },
];

const FitnessTools = () => {

    const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Essential Fitness Tools</Text>
      <Text style={styles.description}>
        Improve your health journey with smart and easy-to-use tools. Designed to help you understand and optimize your fitness.
      </Text>

      {tools.map((tool) => (
        <TouchableOpacity key={tool.id} style={styles.card} onPress={() => navigation.navigate(`${tool.page_url}`)} >
          <Image source={tool.image} style={styles.icon} />
          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>{tool.name}</Text>
            <Text style={styles.cardDesc}>{tool.description}</Text>
          </View>
        </TouchableOpacity>
      ))}
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
    textAlign: 'center',
    color: '#329e8e',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#444',
    marginBottom: 25,
    paddingHorizontal: 10,
  },
  card: {
    width: width - 40,
    flexDirection: 'row',
    backgroundColor: '#eafaf7',
    borderRadius: 16,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#329e8e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    alignItems: 'center'
  },
  icon: {
    width: 60,
    height: 60,
    marginRight: 15,
    borderRadius: 12,
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#329e8e',
    marginBottom: 5,
  },
  cardDesc: {
    fontSize: 14,
    color: '#555',
  }
});

export default FitnessTools;