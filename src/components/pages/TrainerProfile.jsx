import React, { useEffect, useState } from 'react';
import {
    View, Text, Image, TouchableOpacity,
    StyleSheet, Dimensions, ScrollView, ActivityIndicator
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const { width } = Dimensions.get('window');

const TrainerProfile = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { userId: id } = route.params || {};

    const [trainer, setTrainer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isFollowing, setIsFollowing] = useState(false);
    const [followers, setFollowers] = useState(0);
    const [following, setFollowing] = useState(0);
    const [currentUserId, setCurrentUserId] = useState(null);

    useEffect(() => {
        AsyncStorage.getItem('userId').then(id => {
            if (id) setCurrentUserId(id);
        });
    }, []);

    useEffect(() => {
        if (!id) {
            setError('No trainer found like this');
            setLoading(false);
            return;
        }

        const fetchProfile = async () => {
            try {
                const res = await axios.get(`https://fitness-backend-eight.vercel.app/api/user/profile/${id}`);
                setTrainer(res.data);
                setFollowers(res.data.followers || 0);
                setFollowing(res.data.following || 0);
            } catch (err) {
                console.error('Profile fetch error:', err);
                setError('No trainer found like this');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [id]);

    useEffect(() => {
        const checkFollowingStatus = async () => {
            if (!currentUserId || !id) return;
            try {
                const res = await axios.get('https://fitness-backend-eight.vercel.app/api/follow/is-following', {
                 userId: currentUserId, targetId: id 
                });
                setIsFollowing(res.data.isFollowing);
            } catch (err) {
                console.log('Check follow error', err);
            }
        };

        if (currentUserId && id) {
            checkFollowingStatus();
        }
    }, [currentUserId, id]);

    const toggleFollow = async () => {
        if (!currentUserId || !id) return;

        try {
            if (isFollowing) {
                await axios.post('https://fitness-backend-eight.vercel.app/api/follow/unfollow', {
                    userId: currentUserId,
                    targetId: id,
                });
                setFollowers(prev => prev - 1);
            } else {
                await axios.post('https://fitness-backend-eight.vercel.app/api/follow/follow', {
                    userId: currentUserId,
                    targetId: id,
                });
                setFollowers(prev => prev + 1);
            }

            setIsFollowing(!isFollowing);
        } catch (err) {
            console.log('Follow/unfollow error', err);
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" style={{ marginTop: 50 }} color="#329e8e" />;
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center', fontSize: 18, color: 'red' }}>{error}</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <View style={styles.profileHeader}>
                    <View style={[styles.avatarContainer, trainer.verified ? styles.verifiedBorder : styles.normalBorder]}>
                        <Image
                            source={trainer.profileImage ? { uri: trainer.profileImage } : require('../../assets/Images/trainer_1.png')}
                            style={styles.avatar}
                        />
                        {trainer.verified && <Text style={styles.verifiedBadge}>✔</Text>}
                    </View>
                    <Text style={styles.name}>{trainer.name}</Text>
                    <Text style={styles.role}>{trainer.expertise || 'Fitness Coach'}</Text>

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

                <View style={styles.detailsContainer}>
                    <Text style={styles.detailText}>{trainer.experience || 'N/A'} Years</Text>
                    <Text style={styles.detailText}>{trainer.currentOccupation || 'N/A'}</Text>
                    <Text style={styles.detailText}>{trainer.city || 'N/A'}</Text>
                </View>

                <Text style={styles.description}>
                    {trainer.bio || 'No description provided by trainer.'}
                </Text>

                <View style={styles.pricingContainer}>
                    <TouchableOpacity style={styles.circularButton}>
                        <Text style={styles.priceText}>Call{'\n'}₹{trainer.feesCall || 0}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.circularButton}>
                        <Text style={styles.priceText}>Chat{'\n'}₹{trainer.feesChat || 0}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.bookingContainer}>
                    <Text style={styles.nextAvailable}>Next available at</Text>
                    <Text style={styles.time}>{trainer.nextAvailable || '11:45 AM - Tomorrow'}</Text>
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
