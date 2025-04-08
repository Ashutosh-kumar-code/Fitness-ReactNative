import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, ScrollView, Dimensions, TextInput } from 'react-native';
import {useNavigation} from '@react-navigation/native';

const { width } = Dimensions.get('window');

const Experts = () => {

      const navigation = useNavigation();

    const [labs, setLabs] = useState([
        { id: '1', name: 'Dermatologist', image: require('../assets/Images/medical.png') },
        { id: '2', name: 'Trainer', image: require('../assets/Images/gym.png') },
        { id: '3', name: 'Dietician', image: require('../assets/Images/diet.png') },
    ]);

    const [trainers, setTrainers] = useState([
        { id: '1', name: 'Trainer One', experience: 5, lab: 'Dermatologist', tagline: 'Strength Specialist', image: require('../assets/Images/trainer.png') },
        { id: '2', name: 'Trainer Two', experience: 3, lab: 'Dermatologist', tagline: 'Cardio Expert', image: require('../assets/Images/trainer_1.png') },
        { id: '2', name: 'Trainer Two', experience: 3, lab: 'Dietician', tagline: 'Cardio Expert', image: require('../assets/Images/trainer_1.png') },
        { id: '3', name: 'Trainer Three', experience: 7, lab: 'Trainer', tagline: 'Muscle Builder', image: require('../assets/Images/trainer.png') }
    ]);

    const [filteredTrainers, setFilteredTrainers] = useState(trainers);
    const [selectedLab, setSelectedLab] = useState(null);
    const [search, setSearch] = useState('');

    const filterTrainers = (lab) => {
        setSelectedLab(lab);
        if (lab) {
            setFilteredTrainers(trainers.filter(trainer => trainer.lab === lab));
        } else {
            setFilteredTrainers(trainers);
        }
    };

    const handleSearch = () => {
        const query = search.toLowerCase();
        const result = trainers.filter(trainer =>
            trainer.name.toLowerCase().includes(query) ||
            trainer.tagline.toLowerCase().includes(query)
        );
        setFilteredTrainers(result);
    };

    return (
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
            <Text style={styles.title}>Welcome to <Text style={{ color: '#329e8e' }}>FitHub</Text></Text>
            <Text style={styles.subtitle}>Find the best trainers and labs to achieve your fitness goals.</Text>

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

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.labContainer}>
                {labs.map((item) => (
                    <TouchableOpacity 
                        key={item.id} 
                        style={[styles.labButton, selectedLab === item.name && styles.selectedLab]} 
                        onPress={() => filterTrainers(item.name)}>
                        <Image source={ item.image } style={styles.labIcon} />
                        <Text style={styles.labText}>{item.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <Text style={styles.sectionTitle}>Meet Our Trainers</Text>
            <FlatList 
                data={filteredTrainers}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={styles.trainerWrapper}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.trainerCard} onPress={() => navigation.navigate('trainer-profile')} >
                        <Image source={item.image } style={styles.trainerImage} />
                        <Text style={styles.trainerName}>{item.name}</Text>
                        <Text style={styles.trainerTagline}>{item.tagline}</Text>
                        <Text style={styles.trainerInfo}>{item.experience} years experience</Text>
                    </TouchableOpacity>
                )}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
        color: '#555'
    },
    searchRow: {
        flexDirection: 'row',
        marginBottom: 15,
        width: '100%'
    },
    searchInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: 15,
        height: 45,
        backgroundColor: '#f5f5f5'
    },
    searchButton: {
        backgroundColor: '#329e8e',
        paddingHorizontal: 15,
        marginLeft: 10,
        borderRadius: 10,
        justifyContent: 'center'
    },
    labContainer: {
        flexDirection: 'row',
        marginBottom: 20
    },
    labButton: {
        alignItems: 'center',
        padding: 10,
        borderRadius: 15,
        backgroundColor: '#f0f0f0',
        marginHorizontal: 5,
        width: 90
    },
    selectedLab: {
        backgroundColor: '#c6f2ed'
    },
    labIcon: {
        width: 32,
        height: 32,
        marginBottom: 5
    },
    labText: {
        color: '#333',
        fontSize: 14,
        textAlign: 'center',
        fontWeight: '600'
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#329e8e',
        marginBottom: 15
    },
    trainerWrapper: {
        justifyContent: 'space-between',
        gap: 10,
    },
    trainerCard: {
        width: (width / 2) - 30,
        alignItems: 'center',
        padding: 15,
        borderRadius: 15,
        backgroundColor: '#eafaf7',
        marginBottom: 15,
        shadowColor: '#329e8e',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5
    },
    trainerImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10
    },
    trainerName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#329e8e'
    },
    trainerTagline: {
        fontSize: 14,
        fontStyle: 'italic',
        color: '#666',
        textAlign: 'center'
    },
    trainerInfo: {
        fontSize: 13,
        color: '#555',
        marginTop: 5
    }
});

export default Experts;