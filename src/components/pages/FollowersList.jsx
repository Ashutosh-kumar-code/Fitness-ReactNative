import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');

const followers = [
    {
        id: '1',
        name: 'Alice Johnson',
        profileImage: 'https://via.placeholder.com/100',
        location: 'New York, USA'
    },
    {
        id: '2',
        name: 'Bob Smith',
        profileImage: 'https://via.placeholder.com/100',
        location: 'Los Angeles, USA'
    },
    {
        id: '3',
        name: 'Charlie Brown',
        profileImage: 'https://via.placeholder.com/100',
        location: 'Chicago, USA'
    },
    {
        id: '4',
        name: 'Diana Prince',
        profileImage: 'https://via.placeholder.com/100',
        location: 'Miami, USA'
    },
];

const FollowersList = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Followers</Text>
            <FlatList
                data={followers}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Image source={{ uri: item.profileImage }} style={styles.avatar} />
                        <View style={styles.infoContainer}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.location}>{item.location}</Text>
                        </View>
                        <TouchableOpacity style={styles.followButton}>
                            <Text style={styles.followText}>View</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingTop: 5,
        paddingBottom: 5,
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#329e8e',
        textAlign: 'center'
    },
    listContainer: {
        paddingBottom: 10,
    },
    card: {
        backgroundColor: '#e0f7f5',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 15,
        marginBottom: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    infoContainer: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 3,
    },
    location: {
        fontSize: 14,
        color: 'gray',
    },
    followButton: {
        backgroundColor: '#329e8e',
        paddingVertical: 6,
        paddingHorizontal: 15,
        borderRadius: 20,
    },
    followText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default FollowersList;