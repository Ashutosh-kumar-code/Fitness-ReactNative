import React from 'react';
import { View,Image, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Header = () => {
  return (
    <View className="flex flex-row justify-between border-b py-4 px-[10px] border-b-[#CECECE] bg-white">
    <Image source={require('../assets/Images/Logo.png')} className="" />
    <View className="flex flex-row gap-4">
      <TouchableOpacity>
        <Image
          source={require('../assets/Images/cast1.png')}
          className="w-6 h-6"
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          source={require('../assets/Images/bell1.png')}
          className="w-6 h-6"
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          source={require('../assets/Images/search1.png')}
          className="w-6 h-6"
        />
      </TouchableOpacity>
    </View>
  </View>
  );
};


export default Header;