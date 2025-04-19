import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import {useNavigation} from '@react-navigation/native';

const chats = {
    active: [
        {
            id: '1',
            name: 'Shivansh Sharma',
            lastMessage: 'Let’s continue the session tomorrow.',
            time: '11:45 AM',
            avatar: require('../assets/Images/gymnast.png'),
        },
        {
            id: '2',
            name: 'Naina Verma',
            lastMessage: 'Great advice, thank you!',
            time: '10:30 AM',
            avatar: require('../assets/Images/gymnast.png'),
        },
    ],
    expired: [
        {
            id: '3',
            name: 'Rohit Sinha',
            lastMessage: 'Session ended.',
            time: '3 days ago',
            avatar: require('../assets/Images/gymnast.png'),
        },
    ],
};

const ChatPage = () => {

          const navigation = useNavigation();
    const [tab, setTab] = useState('active');

    return (
        <View style={styles.container}>
            {/* Tabs */}
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tab, tab === 'active' && styles.activeTab]}
                    onPress={() => setTab('active')}
                >
                    <Text style={[styles.tabText, tab === 'active' && styles.activeTabText]}>Active Chats</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, tab === 'expired' && styles.activeTab]}
                    onPress={() => setTab('expired')}
                >
                    <Text style={[styles.tabText, tab === 'expired' && styles.activeTabText]}>Expired Chats</Text>
                </TouchableOpacity>
            </View>

            {/* Chat List */}
            <FlatList
                data={chats[tab]}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.chatCard}  >
                        <Image source={item.avatar } style={styles.avatar}  />
                        <View style={styles.chatInfo}>
                            <Text style={styles.name}  >{item.name} </Text>
                            <Text style={styles.message}>{item.lastMessage}</Text>
                        </View>
                        <Text style={styles.time}>{item.time}</Text>
                    </TouchableOpacity>
                )}
                ListEmptyComponent={<Text style={styles.emptyText}>No chats found</Text>}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 20,
        paddingHorizontal: 15,
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
        gap: 10,
    },
    tab: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
    },
    activeTab: {
        backgroundColor: '#329e8e',
    },
    tabText: {
        fontSize: 14,
        color: '#666',
    },
    activeTabText: {
        color: 'white',
        fontWeight: 'bold',
    },
    chatCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        padding: 12,
        borderRadius: 12,
        marginBottom: 10,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 2,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 12,
    },
    chatInfo: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#329e8e',
    },
    message: {
        fontSize: 14,
        color: '#555',
        marginTop: 2,
    },
    time: {
        fontSize: 12,
        color: 'gray',
    },
    emptyText: {
        textAlign: 'center',
        color: 'gray',
        marginTop: 40,
        fontSize: 16,
    },
});

export default ChatPage;
