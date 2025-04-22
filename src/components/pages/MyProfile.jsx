import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function MyProfile() {
  const menuOptions = [
    { label: 'Edit Profile', icon: 'edit', onPress: () => {} },
    { label: 'Help Centre', icon: 'help-outline', onPress: () => {} },
    { label: 'Logout', icon: 'logout', onPress: () => {} },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Profile</Text>
        <View style={styles.coins}>
          <Image
          source={require('../../assets/Images/rupee.png')}
        />
          <Text style={styles.coinsText}>0</Text>
        </View>
      </View>

      <View style={styles.profileSection}>
        <Image
          source={require('../../assets/Images/trainer_1.png')}
          style={styles.profileImage}
        />
        <Text style={styles.name}>Sanket Jare</Text>
      </View>

      <View style={styles.optionsContainer}>
        {menuOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.option}
            onPress={option.onPress}
          >
            <View style={styles.optionLeft}>
              <Image
          source={require('../../assets/Images/profile1.png')}
        />
              <Text style={styles.optionText}>{option.label}</Text>
            </View>
            <Image
          source={require('../../assets/Images/right-arrow.png')}
        />
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.deleteAccount}>
        <Image
          source={require('../../assets/Images/trash.png')}
        />
          <Text style={styles.deleteText}>Delete Account</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  coins: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  coinsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#329E8E',
    backgroundColor: '#f0f0f0',
  },
  name: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  optionsContainer: {
    paddingHorizontal: 20,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  deleteAccount: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    gap: 12,
  },
  deleteText: {
    color: 'red',
    fontSize: 16,
    fontWeight: '600',
  },
});
