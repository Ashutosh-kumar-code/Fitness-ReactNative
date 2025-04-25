import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, StyleSheet, Image,
  TouchableOpacity, Alert, ActivityIndicator
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const response = await axios.get(
        `https://fitness-backend-eight.vercel.app/api/blog?author=${userId}`
      );
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching user blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteBlog = async (blogId) => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      await axios.delete(
        `https://fitness-backend-eight.vercel.app/api/blog/delete/${blogId}`,
        { data: { userId } }
      );
      setBlogs(prev => prev.filter(b => b._id !== blogId));
      Alert.alert('Success', 'Blog deleted successfully');
    } catch (error) {
      console.error('Error deleting blog:', error);
      Alert.alert('Error', 'Could not delete the blog');
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#329e8e" />
      </View>
    );
  }

  if (blogs.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noBlogs}>You haven't posted any blogs yet.</Text>
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={blogs}
      keyExtractor={item => item._id}
      renderItem={({ item }) => (
        <View style={styles.card}>
          {item.image && <Image source={{ uri: item?.image }} style={styles.image} />}
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.content}>{item.content.slice(0, 100)}...</Text>
          <View style={styles.actions}>
            <Text>{item.likes} Likes</Text>
            <TouchableOpacity onPress={() => deleteBlog(item._id)}>
              <Text style={styles.deleteText}>🗑️ Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#f4fcfb',
    flexGrow: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noBlogs: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 50,
    color: '#666',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
  },
  image: {
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
    color: '#329e8e',
  },
  content: {
    fontSize: 14,
    color: '#444',
    marginBottom: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  deleteText: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default UserBlogs;
