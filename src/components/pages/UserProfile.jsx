import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import {useNavigation} from '@react-navigation/native';
const { width } = Dimensions.get('window');

const UserProfile = () => {
        const navigation = useNavigation();
    const [isFollowing, setIsFollowing] = useState(false);

    const user = {
        name: "John Doe",
        email: "johndoe@example.com",
        role: "Fitness Enthusiast",
        bio: "Passionate about fitness and healthy living.",
        age: 28,
        gender: "Male",
        city: "New York",
        profileImage: require('../../assets/Images/trainer.png'),
        interests: ["Yoga", "Running", "Nutrition"],
        followers: 120,
        following: 80,
    };

    const toggleFollow = () => {
        setIsFollowing(prev => !prev);
    };

    return (
        <View style={styles.container}>
            <View style={styles.profileHeader}>
                <View style={styles.avatarContainer}>
                    <Image source={ user.profileImage } style={styles.avatar} />
                </View>
                <Text style={styles.name}>{user.name}</Text>
                <Text style={styles.role}>{user.role}</Text>
                
                <TouchableOpacity 
                    style={[styles.followButton, { backgroundColor: isFollowing ? '#aaa' : '#329e8e' }]}
                    onPress={toggleFollow}>
                    <Text style={styles.followText}>{isFollowing ? 'Following' : 'Follow'}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.detailsContainer}>
                <Text style={styles.detailText}>Age: {user.age}</Text>
                <Text style={styles.detailText}>Gender: {user.gender}</Text>
                <Text style={styles.detailText}>City: {user.city}</Text>
            </View>

            <Text style={styles.bio}>{user.bio}</Text>

            <View style={styles.socialContainer}>
                 <TouchableOpacity onPress={() => navigation.navigate('Followers')} >  
                <View style={styles.socialBox}>
                    <Text style={styles.socialNumber}>{user.followers}</Text>
                    <Text style={styles.socialLabel}>Followers</Text>
                </View>
                </TouchableOpacity>
                   <TouchableOpacity onPress={() => navigation.navigate('Following')} > 
                <View style={styles.socialBox}>
                    <Text style={styles.socialNumber}>{user.following}</Text>
                    <Text style={styles.socialLabel}>Following</Text>
                </View>
                </TouchableOpacity>
            </View>

            <View style={styles.interestsContainer}>
                <Text style={styles.sectionTitle}>Interests</Text>
                <View style={styles.interestsList}>
                    {user.interests.map((interest, index) => (
                        <Text key={index} style={styles.interestItem}>{interest}</Text>
                    ))}
                </View>
            </View>

            <TouchableOpacity style={styles.editProfileButton}>
                <Text style={styles.editProfileText}>Edit Profile</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingTop: 30,
    },
    profileHeader: {
        alignItems: 'center',
        marginBottom: 20,
    },
    avatarContainer: {
        borderWidth: 3,
        borderColor: '#329e8e',
        borderRadius: 65,
        padding: 5,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#329e8e',
    },
    role: {
        fontSize: 16,
        color: '#666',
        marginTop: 4,
        marginBottom: 10,
    },
    followButton: {
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    followText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    detailsContainer: {
        alignItems: 'center',
        marginVertical: 10,
    },
    detailText: {
        fontSize: 16,
        color: '#444',
        marginVertical: 2,
    },
    bio: {
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 10,
        color: '#444',
    },
    socialContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 15,
    },
    socialBox: {
        alignItems: 'center',
    },
    socialNumber: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#329e8e',
    },
    socialLabel: {
        fontSize: 14,
        color: '#666',
    },
    interestsContainer: {
        marginVertical: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#329e8e',
    },
    interestsList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    interestItem: {
        backgroundColor: '#e0f7f5',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
        marginRight: 8,
        marginBottom: 8,
        color: '#329e8e',
        fontWeight: '600',
    },
    editProfileButton: {
        backgroundColor: '#329e8e',
        padding: 15,
        borderRadius: 30,
        width: width * 0.8,
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    editProfileText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default UserProfile;
