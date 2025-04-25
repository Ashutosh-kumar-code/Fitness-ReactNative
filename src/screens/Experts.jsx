import React, { useEffect, useState } from 'react';
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
import axios from 'axios';

const { width } = Dimensions.get('window');

const Experts = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');

  const [trainers, setTrainers] = useState([]);
  const [dermatologists, setDermatologists] = useState([]);
  const [dieticians, setDieticians] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrainersByType(); // Fetch all types
  }, []);

  const fetchTrainersByType = async () => {
    try {
      const [trainerRes, dermaRes, dietRes] = await Promise.all([
        axios.post('https://fitness-backend-eight.vercel.app/api/user/verified-trainers', {
          trainerType: 'Trainer'
        }),
        axios.post('https://fitness-backend-eight.vercel.app/api/user/verified-trainers', {
          trainerType: 'Dermatologist'
        }),
        axios.post('https://fitness-backend-eight.vercel.app/api/user/verified-trainers', {
          trainerType: 'Dietician'
        }),
      ]);
  
      setTrainers(trainerRes.data || []);
      setDermatologists(dermaRes.data || []);
      setDieticians(dietRes.data || []);
    } catch (error) {
      console.error('Error fetching trainers:', error);
    } finally {
      setLoading(false);
    }
  };
  
  

  const renderTrainerSection = (data, title, navigateTo) => {
    const hasData = Array.isArray(data) && data.length > 0;
    const limitedData = hasData && data.length > 9 ? data.slice(0, 9).concat({ _id: 'see-more' }) : data;

    if (loading) {
      return (
        <View style={[styles.container, { justifyContent: 'center', flex: 1 }]}>
          <Text style={{ fontSize: 16, color: '#555' }}>Loading experts...</Text>
        </View>
      );
    }
    return (
      <>
        <Text style={styles.sectionTitle}>{title}</Text>
        {hasData ? (
          <FlatList
            data={limitedData}
            keyExtractor={(item) => item._id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              if (item._id === 'see-more') {
                return (
                  <TouchableOpacity style={[styles.trainerCard, { justifyContent: 'center' }]} onPress={() => navigation.navigate(navigateTo)}>
                    <Image source={require('../assets/Images/menu.png')} />
                    <Text style={styles.seeMoreText}>See More</Text>
                  </TouchableOpacity>
                );
              }

              return (
                <TouchableOpacity style={styles.trainerCard} onPress={() => navigation.navigate('Trainer', { trainer: item })}>
                  <View style={styles.trainerImageContainer}>
                    {/* <Image
                      source={item.image ? { uri: item.image } : require('../assets/Images/trainer.png')}
                      style={styles.trainerImage}
                    /> */}
                  </View>
                  <Text style={styles.trainerName}>{item.name}</Text>
                  <Text style={styles.trainerExperience}>{item.experience || 0} years</Text>
                </TouchableOpacity>
              );
            }}
          />
        ) : (
          <View style={styles.noDataCard}>
            <Image source={require('../assets/Images/empty.png')} style={styles.noDataImage} />
            <Text style={styles.noDataText}>No {title.toLowerCase()} found</Text>
          </View>
        )}
      </>
    );
  };

  const storyNotes = [
    { id: 1, name: 'Ravi', image: require('../assets/Images/trainer.png') },
    { id: 2, name: 'Sita', image: require('../assets/Images/trainer_1.png') },
    { id: 3, name: 'John', image: require('../assets/Images/trainer.png') },
    { id: 4, name: 'Anita', image: require('../assets/Images/trainer_1.png') },
  ];

  const advertiseData = [
    require('../assets/Images/advertisement1.png'),
    require('../assets/Images/advertisement2.png'),
    require('../assets/Images/advertisement1.png')
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
        <TouchableOpacity style={styles.searchButton} onPress={() => {}}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Search</Text>
        </TouchableOpacity>
      </View>

      {/* Notes */}
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

      {/* Slider */}
      <FlatList
        data={advertiseData}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        decelerationRate="fast"
        snapToInterval={width}
        snapToAlignment="center"
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ width }}>
            <Image source={item} style={styles.sliderImage} />
          </View>
        )}
      />

      {/* Trainer Sections */}
      {renderTrainerSection(trainers, 'Meet Our Experts')}
      {renderTrainerSection(dermatologists, 'Meet Our Top Dermatologist')}
      {renderTrainerSection(dieticians, 'Meet Our Top Dietician')}
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
    marginBottom: 14,
  },
  noteWrapper: {
    alignItems: 'center',
    marginHorizontal: 5,
  },
  outerCircle: {
    width: 68,
    height: 68,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: '#329e8e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerImage: {
    width: 62,
    height: 62,
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
    borderRadius: 28,
    backgroundColor: '#e1f3f0',
    borderWidth: 1,
    borderColor: '#a8dcd4',
    alignItems: 'center',
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
    marginTop: 10,
  },
  sliderImage: {
    width: '96%',
    height: 180,
    resizeMode: 'cover',
    borderRadius: 22,
  },
  noDataCard: {
    width: '100%',
    backgroundColor: '#f0f4f4',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  noDataImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  noDataText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#888',
    textAlign: 'center',
  },
});

export default Experts;
