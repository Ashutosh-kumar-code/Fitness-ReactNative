import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const TrainerProfile = ({ verified = true }) => {
    const navigation = useNavigation();

    const [isFollowing, setIsFollowing] = useState(false);
    const [followers, setFollowers] = useState(120);
    const [following] = useState(45);

    const toggleFollow = () => {
        setIsFollowing(prev => !prev);
        setFollowers(prev => prev + (isFollowing ? -1 : 1));
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <View style={styles.profileHeader}>
                    <View style={[styles.avatarContainer, verified ? styles.verifiedBorder : styles.normalBorder]}>
                        <Image source={require('../../assets/Images/trainer_1.png')} style={styles.avatar} />
                        {verified && <Text style={styles.verifiedBadge}>✔</Text>}
                    </View>
                    <Text style={styles.name}>Shivansh Sharma</Text>
                    <Text style={styles.role}>Fitness/ Wellness Coach</Text>

                    <TouchableOpacity
                        style={[styles.followButton, { backgroundColor: isFollowing ? '#aaa' : '#329e8e' }]}
                        onPress={toggleFollow}
                    >
                        <Text style={styles.followText}>{isFollowing ? 'Following' : 'Follow'}</Text>
                    </TouchableOpacity>

                    <View style={styles.followStats}>
                        <TouchableOpacity onPress={() => navigation.navigate('Followers')}>
                            <View style={styles.statBox}>
                                <Text style={styles.statNumber}>{followers}</Text>
                                <Text style={styles.statLabel}>Followers</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Following')}>
                            <View style={styles.statBox}>
                                <Text style={styles.statNumber}>{following}</Text>
                                <Text style={styles.statLabel}>Following</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.ratingContainer}>
                    <Text style={styles.ratingText}>⭐ 4.0 (5 reviews)</Text>
                </View>

                <View style={styles.detailsContainer}>
                    <Text style={styles.detailText}>7+ Years</Text>
                    <Text style={styles.detailText}>Freelance Nutritionist</Text>
                    <Text style={styles.detailText}>Bareilly</Text>
                </View>

                <Text style={styles.description}>
                    I can help with achieving your health goals and unlocking your best life. As a passionate fitness coach, I'm dedicated to supporting individuals in reaching their full potential.
                </Text>

                <View style={styles.pricingContainer}>
                    <TouchableOpacity style={styles.circularButton}>
                        <Text style={styles.priceText}>Call{'\n'}₹250</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.circularButton}>
                        <Text style={styles.priceText}>Video{'\n'}₹500</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.circularButton}>
                        <Text style={styles.priceText}>Chat{'\n'}₹200</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.bookingContainer}>
                    <Text style={styles.nextAvailable}>Next available at</Text>
                    <Text style={styles.time}>11:45 AM - Tomorrow</Text>
                    <TouchableOpacity style={styles.bookNowButton}>
                        <Text style={styles.bookNowText}>Book now →</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        paddingBottom: 30,
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
    },
    profileHeader: {
        alignItems: 'center',
        marginBottom: 15,
    },
    avatarContainer: {
        position: 'relative',
        padding: 5,
        borderRadius: 60,
    },
    verifiedBorder: {
        borderWidth: 3,
        borderColor: '#006699',
    },
    normalBorder: {
        borderWidth: 3,
        borderColor: '#ccc',
    },
    avatar: {
        width: 110,
        height: 110,
        borderRadius: 55,
    },
    verifiedBadge: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        backgroundColor: 'darkgreen',
        color: 'white',
        borderRadius: 10,
        paddingHorizontal: 4,
        fontSize: 14,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#329e8e',
    },
    role: {
        fontSize: 15,
        color: 'gray',
        marginTop: 2,
        marginBottom: 10,
    },
    followButton: {
        paddingVertical: 8,
        paddingHorizontal: 24,
        borderRadius: 20,
    },
    followText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    followStats: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
        gap: 30,
    },
    statBox: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#329e8e',
    },
    statLabel: {
        fontSize: 14,
        color: 'gray',
    },
    ratingContainer: {
        alignItems: 'center',
        marginVertical: 5,
    },
    ratingText: {
        fontSize: 16,
    },
    detailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    detailText: {
        fontSize: 14,
        color: '#444',
    },
    description: {
        fontSize: 15,
        textAlign: 'center',
        marginVertical: 10,
        color: '#444',
    },
    pricingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
    },
    circularButton: {
        backgroundColor: '#329e8e',
        padding: 15,
        borderRadius: 50,
        alignItems: 'center',
        width: 80,
        height: 80,
        justifyContent: 'center',
    },
    priceText: {
        color: 'white',
        fontSize: 13,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    bookingContainer: {
        alignItems: 'center',
        marginVertical: 10,
    },
    nextAvailable: {
        fontSize: 14,
        color: 'gray',
    },
    time: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#329e8e',
    },
    bookNowButton: {
        backgroundColor: '#329e8e',
        padding: 15,
        borderRadius: 30,
        marginTop: 10,
        width: 200,
        alignItems: 'center',
    },
    bookNowText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default TrainerProfile;
