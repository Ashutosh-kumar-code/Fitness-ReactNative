import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import {useNavigation} from '@react-navigation/native';

const { width } = Dimensions.get('window');

const blogs = [
    {
        id: '1',
        user: 'John Doe',
        username: '@john_doe',
        time: '10 min ago',
        content: 'Just finished an intense workout session! Feeling amazing.',
        avatar: 'https://via.placeholder.com/50',
        likes: 12,
        comments: 4
    },
    {
        id: '2',
        user: 'Jane Smith',
        username: '@jane_smith',
        time: '20 min ago',
        content: 'Healthy eating is just as important as exercising! Keep it balanced.',
        avatar: 'https://via.placeholder.com/50',
        likes: 30,
        comments: 10
    }
];

const Coummunity = () => {

        const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <FlatList 
                data={blogs}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.blogCard}>
                        <TouchableOpacity onPress={() => navigation.navigate('User')}>  
                        <View style={styles.header} >
                            <Image source={require('../assets/Images/gymnast.png')} style={styles.avatar}   />
                            <View>
                                <Text style={styles.user}>{item.user}</Text>
                                <Text style={styles.username}>{item.username} • {item.time}</Text>
                            </View>
                        </View>
                        </TouchableOpacity>
                        <Text style={styles.content}>{item.content}</Text>
                        <View style={styles.actions}>
                            <TouchableOpacity style={styles.actionButton}>
                                <Text style={styles.iconText}>❤️</Text>
                                <Text style={styles.actionText}>{item.likes}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.actionButton}>
                                <Text style={styles.iconText}>💬</Text>
                                <Text style={styles.actionText}>{item.comments}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
            <TouchableOpacity style={styles.fab}   >
                <Text style={styles.fabText} onPress={() => navigation.navigate('Blog Post')} >+</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10
    },
    blogCard: {
        backgroundColor: '#e0f7f5',
        padding: 15,
        borderRadius: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        width: width - 20,
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: '#329e8e',
        borderStyle: 'dashed'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    avatar: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        marginRight: 10,
        borderWidth: 2,
        borderColor: '#329e8e'
    },
    user: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    username: {
        fontSize: 14,
        color: 'gray'
    },
    content: {
        fontSize: 16,
        marginBottom: 10
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15
    },
    iconText: {
        fontSize: 18,
        marginRight: 5
    },
    actionText: {
        fontSize: 14,
        color: '#329e8e'
    },
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        backgroundColor: '#329e8e',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        // elevation: 6,
        boxShadow: '2px 2px 15px gray',

    },
    fabText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    }
});

export default Coummunity;
