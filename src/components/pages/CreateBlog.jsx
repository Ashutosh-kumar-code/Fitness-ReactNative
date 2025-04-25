import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Image,
  StyleSheet, Dimensions, ScrollView, Alert
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const { width } = Dimensions.get('window');

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo', quality: 1 });
    if (result?.assets?.length) setImage(result.assets[0]);
    else Alert.alert('Image selection canceled');
  };

  const handlePost = async () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert('Error', 'Title and content are required.');
      return;
    }

    try {
      const userId = await AsyncStorage.getItem('userId');
      const role = 'user'; // Replace or retrieve from AsyncStorage if you store it

      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('userId', userId);
      formData.append('role', role);

      if (image) {
        formData.append('image', {
          uri: image.uri,
          name: image.fileName || 'blog.jpg',
          type: image.type || 'image/jpeg'
        });
      }

      const response = await axios.post('https://fitness-backend-eight.vercel.app/api/blog/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      Alert.alert('Success', 'Blog posted successfully!');
      setTitle('');
      setContent('');
      setImage(null);

    } catch (error) {
      console.error(error);
      Alert.alert('Error', error.response?.data?.message || 'Failed to post blog');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Create Blog</Text>

      <TextInput placeholder="Title" value={title} onChangeText={setTitle} style={styles.input} />

      <TouchableOpacity style={styles.imageUploadBox} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image.uri }} style={styles.previewImage} />
        ) : (
          <Text style={styles.uploadText}>+ Upload Image (Optional)</Text>
        )}
      </TouchableOpacity>

      <TextInput
        style={[styles.input, { height: 120 }]}
        placeholder="Write something inspiring..."
        placeholderTextColor="#888"
        multiline
        numberOfLines={6}
        value={content}
        onChangeText={setContent}
      />

      <TouchableOpacity style={styles.postButton} onPress={handlePost}>
        <Text style={styles.postButtonText}>Post Blog</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f4fcfb',
    flex: 1,
  },
  heading: {
    fontSize: 24,
    color: '#329e8e',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  imageUploadBox: {
    backgroundColor: '#e0f7f5',
    borderStyle: 'dashed',
    borderColor: '#329e8e',
    borderWidth: 2,
    borderRadius: 15,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    overflow: 'hidden',
  },
  uploadText: {
    color: '#329e8e',
    fontSize: 16,
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 15,
    fontSize: 16,
    textAlignVertical: 'top',
    borderColor: '#d6eae7',
    borderWidth: 1,
    marginBottom: 20,
  },
  postButton: {
    backgroundColor: '#329e8e',
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  postButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CreateBlog;
