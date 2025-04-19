/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
//   Dimensions,
} from 'react-native';

const astrologers = [
  {
    id: '1',
    name: 'Misstie',
    skills: 'Numerology, Tarot, Vedic',
    rate: 50,
    originalRate: null,
    image: require('../../assets/Images/trainer.png'),
    isOnline: true,
  },
  {
    id: '2',
    name: 'Pratiek',
    skills: 'Vedic, Numerology, Vastu',
    rate: 112,
    originalRate: 116,
    image: require('../../assets/Images/trainer_1.png'),
    isOnline: true,
  },
  {
    id: '3',
    name: 'Priyankka',
    skills: 'Numerology, Tarot, Psychic',
    rate: 63,
    originalRate: null,
    image: require('../../assets/Images/trainer_1.png'),
    isOnline: false,
    waitTime: '5m',
  },
  {
    id: '4',
    name: 'Riddhi333',
    skills: 'Vedic, Numerology, Prashana',
    rate: 54,
    originalRate: 60,
    image: require('../../assets/Images/trainer_1.png'),
    isOnline: true,
  },
  {
    id: '5',
    name: 'AnupamK',
    skills: 'Vedic',
    rate: 26,
    originalRate: 32,
    image: require('../../assets/Images/trainer.png'),
    isOnline: false,
    waitTime: '6m',
  },
  {
    id: '4',
    name: 'Riddhi333',
    skills: 'Vedic, Numerology, Prashana',
    rate: 54,
    originalRate: 60,
    image: require('../../assets/Images/trainer_1.png'),
    isOnline: true,
  },
  {
    id: '5',
    name: 'AnupamK',
    skills: 'Vedic',
    rate: 26,
    originalRate: 32,
    image: require('../../assets/Images/trainer.png'),
    isOnline: false,
    waitTime: '6m',
  },
  {
    id: '4',
    name: 'Riddhi333',
    skills: 'Vedic, Numerology, Prashana',
    rate: 54,
    originalRate: 60,
    image: require('../../assets/Images/trainer_1.png'),
    isOnline: true,
  },
  {
    id: '5',
    name: 'AnupamK',
    skills: 'Vedic',
    rate: 26,
    originalRate: 32,
    image: require('../../assets/Images/trainer.png'),
    isOnline: false,
    waitTime: '6m',
  },
];

const ExpertsLists = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Astro Experts</Text>
      <FlatList
        data={astrologers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.profileImage} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.skills}>{item.skills}</Text>
              <View style={styles.rateRow}>
                {item.originalRate && (
                  <Text style={styles.originalRate}>₹ {item.originalRate}</Text>
                )}
                <Text style={styles.discountedRate}>₹ {item.rate}/min</Text>
              </View>
            </View>
            <TouchableOpacity
              style={[
                styles.chatButton,
                // eslint-disable-next-line react-native/no-inline-styles
                { backgroundColor: item.isOnline ? '#329e8e' : '#ddd' },
              ]}
              disabled={!item.isOnline}
            >
              <Text style={{ color: item.isOnline ? '#fff' : '#999' }}>
                {item.isOnline ? 'Chat' : `Wait - ${item.waitTime}`}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#329e8e',
    marginBottom: 15,
    alignSelf: 'center',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3fdfa',
    borderRadius: 18,
    padding: 10,
    marginBottom: 12,
    // elevation: 3,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a6460',
  },
  skills: {
    fontSize: 13,
    color: '#777',
    marginVertical: 4,
  },
  rateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  originalRate: {
    textDecorationLine: 'line-through',
    color: '#888',
    marginRight: 5,
    fontSize: 13,
  },
  discountedRate: {
    fontSize: 14,
    color: '#f4a261',
    fontWeight: 'bold',
  },
  chatButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ExpertsLists;
