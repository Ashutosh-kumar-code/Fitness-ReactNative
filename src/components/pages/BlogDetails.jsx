import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const BlogDetails = () => {
  const route = useRoute();
  const { blogId } = route.params;
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [isLiked, setIsLiked] = useState(false);

  const fetchBlog = async () => {
    try {
      const response = await axios.get(`https://fitness-backend-eight.vercel.app/api/blog/${blogId}`);
      setBlog(response.data);

      const userId = await AsyncStorage.getItem('userId');
      setIsLiked(response.data.likedBy?.includes(userId));
    } catch (error) {
      console.error('Error fetching blog:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [blogId]);

  const toggleLike = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const url = isLiked ? 'unlike' : 'like';

      const response = await axios.put(`https://fitness-backend-eight.vercel.app/api/blog/${url}/${blogId}`, { userId });
      setIsLiked(!isLiked);
      setBlog(prev => ({ ...prev, likes: response.data.likes }));
    } catch (error) {
      console.error('Like/unlike error:', error);
    }
  };

  const submitComment = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!commentText.trim()) return Alert.alert('Please enter a comment');

      await axios.post(`https://fitness-backend-eight.vercel.app/api/blog/comment/${blogId}`, {
        userId,
        text: commentText,
      });

      setCommentText('');
      fetchBlog();
    } catch (error) {
      console.error('Comment error:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#329e8e" />
      </View>
    );
  }

  if (!blog) {
    return (
      <View style={styles.loaderContainer}>
        <Text style={styles.errorText}>Blog not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={blog.author.profileImage ? { uri: blog.author.profileImage } : require('../../assets/Images/trainer.png')}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.authorName}>{blog.author.name}</Text>
          <Text style={styles.role}>{blog.author.role}</Text>
        </View>
      </View>

      {blog.image && <Image source={{ uri: blog.image }} style={styles.blogImage} />}

      <Text style={styles.title}>{blog.title}</Text>
      <Text style={styles.content}>{blog.content}</Text>

      <View style={styles.likesContainer}>
        <TouchableOpacity onPress={toggleLike} style={styles.likeButton}>
          <Text style={{ fontSize: 20 }}>
  {isLiked ? '❤️' : '🤍'}
</Text>

          <Text style={styles.likeCount}>{blog.likes} Likes</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.commentsSection}>
        <Text style={styles.commentsHeader}>Comments</Text>
        {blog.comments && blog.comments.length > 0 ? (
          blog.comments.map((comment, index) => (
            <View key={index} style={styles.commentCard}>
              <Image
                source={comment.user.profileImage ? { uri: comment.user.profileImage } : require('../../assets/Images/trainer.png')}
                style={styles.commentAvatar}
              />
              <View>
                <Text style={styles.commentAuthor}>{comment.user.name}</Text>
                <Text style={styles.commentText}>{comment.text}</Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noComments}>No comments yet.</Text>
        )}

        <View style={styles.commentInputBox}>
          <TextInput
            placeholder="Add a comment..."
            value={commentText}
            onChangeText={setCommentText}
            style={styles.commentInput}
          />
          <TouchableOpacity onPress={submitComment}>
          <Text style={{ fontSize: 20 }}>💬</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f4fcfb',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    borderWidth: 2,
    borderColor: '#329e8e',
  },
  authorName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  role: {
    fontSize: 14,
    color: 'gray',
  },
  blogImage: {
    width: width - 40,
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
    alignSelf: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#329e8e',
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
    marginBottom: 20,
  },
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  likeCount: {
    marginLeft: 8,
    fontSize: 16,
  },
  commentsSection: {
    marginTop: 20,
  },
  commentsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  commentCard: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'flex-start',
  },
  commentAvatar: {
    width: 35,
    height: 35,
    borderRadius: 18,
    marginRight: 10,
  },
  commentAuthor: {
    fontWeight: '600',
  },
  commentText: {
    color: '#444',
    fontSize: 14,
  },
  noComments: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#888',
  },
  commentInputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#dcecec',
  },
  commentInput: {
    flex: 1,
    height: 40,
  },
});

export default BlogDetails;