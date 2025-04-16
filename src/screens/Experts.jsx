import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const Experts = () => {
  const navigation = useNavigation();

  const [trainers, setTrainers] = useState([
    { id: '1', name: 'Trainer One', experience: 5, image: require('../assets/Images/trainer.png') },
    { id: '2', name: 'Trainer Two', experience: 3, image: require('../assets/Images/trainer_1.png') },
    { id: '3', name: 'Trainer Three', experience: 7, image: require('../assets/Images/trainer.png') },
  ]);

  const [filteredTrainers, setFilteredTrainers] = useState(trainers);
  const [search, setSearch] = useState('');

  const handleSearch = () => {
    const query = search.toLowerCase();
    const result = trainers.filter(trainer =>
      trainer.name.toLowerCase().includes(query)
    );
    setFilteredTrainers(result);
  };

  const storyNotes = [
    { id: 1, name: 'Ravi', image: require('../assets/Images/trainer.png') },
    { id: 2, name: 'Sita', image: require('../assets/Images/trainer_1.png') },
    { id: 3, name: 'John', image: require('../assets/Images/trainer.png') },
    { id: 4, name: 'Anita', image: require('../assets/Images/trainer_1.png') },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      {/* Search */}
      <View style={styles.searchRow}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search trainer..."
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Search</Text>
        </TouchableOpacity>
      </View>

      {/* Notes - Instagram story style */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.notesContainer}>
        {storyNotes.map((note, index) => (
          <View key={index} style={styles.noteWrapper}>
            <View style={styles.outerCircle}>
              <Image source={note.image} style={styles.innerImage} />
            </View>
            <Text style={styles.username}>{note.name}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Trainers Section */}
      <Text style={styles.sectionTitle}>Meet Our Trainers</Text>
      <FlatList
        data={[...filteredTrainers, { id: 'see-more' }]}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          if (item.id === 'see-more') {
            return (
              <TouchableOpacity
                style={[styles.trainerCard, { justifyContent: 'center' }]}
                onPress={() => navigation.navigate('all-trainers')}
              >
                <Text style={styles.seeMoreText}>See More</Text>
              </TouchableOpacity>
            );
          }

          return (
            <TouchableOpacity style={styles.trainerCard} onPress={() => navigation.navigate('trainer-profile')}>
              <View style={styles.trainerImageContainer}>
                <Image source={item.image} style={styles.trainerImage} />
              </View>
              <Text style={styles.trainerName}>{item.name}</Text>
              <Text style={styles.trainerExperience}>{item.experience} years</Text>
            </TouchableOpacity>
          );
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  searchRow: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 15,
  },
  searchInput: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    borderColor: '#329e8e',
    borderRadius: 10,
    paddingLeft: 15,
    backgroundColor: '#f5f5f5',
  },
  searchButton: {
    backgroundColor: '#329e8e',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderRadius: 10,
    height: 45,
    marginLeft: 10,
  },
  notesContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  noteWrapper: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  outerCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: '#329e8e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  username: {
    fontSize: 12,
    color: '#555',
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#329e8e',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  trainerCard: {
    width: 130,
    marginRight: 15,
    padding: 10,
    borderRadius: 12,
    backgroundColor: '#e1f3f0',
    borderWidth: 1,
    borderColor: '#a8dcd4',
    alignItems: 'center',
    elevation: 3,
  },
  trainerImageContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  trainerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  trainerName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a6460',
    textAlign: 'center',
  },
  trainerExperience: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
  },
  seeMoreText: {
    fontSize: 14,
    color: '#1a6460',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Experts;
