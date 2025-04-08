import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Header from '../Header';
import {TabsRoutes} from '../../routes/TabsRoutes';
import {
  useNavigation,
  useNavigationState,
  useIsFocused,
  useRoute,
} from '@react-navigation/native';
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const navigation = useNavigation();
  const route = useRoute();

  console.log(route);

  return (
    <View className="flex-1 bg-white relative">
     <View className=' '>
     <Header />
     </View>
    
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused}) => {
            let iconSource;

            if (route.name === 'Home') {
              iconSource = focused
                ? require('../../assets/Images/home-dark.png')
                : require('../../assets/Images/home.png');
            } else if (route.name === 'Experts') {
              iconSource = focused
                ? require('../../assets/Images/expert_1.png')
                : require('../../assets/Images/expert.png');
            } else if (route.name === 'Chat') {
              iconSource = focused
                ? require('../../assets/Images/chat_1.png')
                : require('../../assets/Images/chat.png');
            } else if (route.name === 'Tools') {
              iconSource = focused
                ? require('../../assets/Images/support_1.png')
                : require('../../assets/Images/support.png');
            } else if (route.name === 'Community') {
              iconSource = focused
                ? require('../../assets/Images/community_1.png')
                : require('../../assets/Images/community.png');
            }

            return (
              <Image
                source={iconSource}
                className="w-8 h-6 py-4 object-cover"
              />
            );
          },
          tabBarActiveTintColor: '#441752',
          tabBarInactiveTintColor: '#000000',
          tabBarStyle:
            route.name === 'Shorts'
              ? {display: 'none'}
              : {
                  fontWeight: "bold",
                  backgroundColor: '#ffffff',
                  height: 75,
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15,
                  paddingTop: 13,
                  paddingBottom: 13,
                  shadowColor: '#000',
                  shadowOpacity: 0.1,
                  shadowOffset: {width: 0, height: -3},
                  elevation: 5,
                },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: 'bold',
            paddingTop: 6,
          },
        })}>
        {TabsRoutes.map((tabs, index) => (
          <Tab.Screen
            key={index}
            name={tabs.name}
            component={tabs.Component}
            options={tabs.options}
          />
        ))}
      </Tab.Navigator>
    </View>
  );
};

export default TabNavigator;
