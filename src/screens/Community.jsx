import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, Image,
  StyleSheet, Dimensions, ActivityIndicator, RefreshControl
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const Coummunity = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [userRole, setUserRole] = useState('');
  const navigation = useNavigation();

  const fetchBlogs = async () => {
    try {
      setRefreshing(true);
      const response = await axios.get('https://fitness-backend-eight.vercel.app/api/blog');
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const getUserRole = async () => {
    const role = await AsyncStorage.getItem('userRole');
    setUserRole(role);
  };

  useEffect(() => {
    fetchBlogs();
    getUserRole();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.blogCard}>
      <TouchableOpacity onPress={() => navigation.navigate('Trainer', { userId: item.author._id })}>
        <View style={styles.header}>
          <Image
            source={{ uri: item?.author?.profileImage || 'https://via.placeholder.com/50' }}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.user}>{item.author?.name}</Text>
            <Text style={styles.username}>{item.author?.role}</Text>
          </View>
        </View>
      </TouchableOpacity>

      {item.image ? (
        <TouchableOpacity onPress={() => navigation.navigate('BlogDetails', { blogId: item._id })}>
          <Image source={{ uri: item?.image }} style={styles.blogImage} />
        </TouchableOpacity>
      ) : null}

      {item.content?.trim() ? (
        <TouchableOpacity onPress={() => navigation.navigate('BlogDetails', { blogId: item._id })}>
          <Text style={styles.content}>{item.content}</Text>
        </TouchableOpacity>
      ) : null}

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.iconText}>❤️</Text>
          <Text style={styles.actionText}>{item.likedBy?.length || 0}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.iconText}>💬</Text>
          <Text style={styles.actionText}>{item.comments?.length || 0}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#329e8e" style={{ marginTop: 30 }} />
      ) : (
        <FlatList
          data={blogs}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchBlogs} />}
        />
      )}

      {userRole === 'trainer' && (
        <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('Blog Post')}>
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      )}
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
  blogImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: 'cover'
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
    alignItems: 'center'
  },
  fabText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  }
});

export default Coummunity;
