/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { Text, View } from 'react-native';
import TabNavigator from './src/components/navigation/TabNavigator';
import Experts from './src/screens/Experts';
import FitnessTools from './src/screens/FitnessTools';
import Coummunity from './src/screens/Community';
import ChatPage from './src/screens/ChatPage';
// import Splash from './src/screens/Splash';
import WaterIntake from './src/components/fitnesstools/WaterIntake';
import BMICalculator from './src/components/fitnesstools/BMICalculator';
import CalorieMaintenance from './src/components/fitnesstools/CalorieMaintenance';
import BodyFatPercentage from './src/components/fitnesstools/BodyFatPercentage';
import FollowersList from './src/components/pages/FollowersList';
import Login from './src/components/pages/Login';
import UserProfile from './src/components/pages/UserProfile';
import TrainerProfile from './src/components/pages/TrainerProfile';
import Signup from './src/components/pages/Signup';
import ExpertsLists from './src/components/pages/ExpertsLists';
import CreateBlog from './src/components/pages/CreateBlog';
import ChatScreen from './src/components/pages/ChatScreen';
import MyProfile from './src/components/pages/MyProfile';
import Welcome from './src/screens/Welcome';
import AuthChoice from './src/screens/AuthChoice';
import BlogDetails from './src/components/pages/BlogDetails';
import UserBlogs from './src/components/pages/UserBlogs';
// import EditProfileScreen from './src/components/profile-pages/EditProfileScreen';
import EditProfile from './src/components/profile-pages/EditProfileScreen';
import BankDetailsPage from './src/components/profile-pages/BankDetailsPage';
import CallStartScreen from './src/components/profile-pages/CallStartPage';
import CallScreen from './src/components/profile-pages/CallScreen';
import io from 'socket.io-client';
import { useEffect, useRef } from 'react';
import IncomingCallScreen from './src/components/profile-pages/IncomingCallScreen';
// import { useNavigation } from '@react-navigation/native';
import { NavigationContainerRef } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const socket = io('https://fitness-backend-node.onrender.com');

function App(): React.JSX.Element {

  const navigationRef = useRef<NavigationContainerRef<any>>(null);
  const isReadyRef = useRef(false);
  const socketInitialized = useRef(false);

  useEffect(() => {
    if (socketInitialized.current) return;
    socketInitialized.current = true;

    const initializeSocket = async () => {
      const userId = await AsyncStorage.getItem('userId');
      if (userId) {
        socket.emit('register', { userId });
        console.log('✅ Socket registered for user:', userId);

        socket.on('incomingCall', ({ from, signalData, callId }) => {
          console.log('📞 Incoming call from:', from);

          if (isReadyRef.current && navigationRef.current) {
            navigationRef.current.navigate('IncomingCall', {
              callerId: from,
              signalData,
              callId,
            });
          } else {
            console.warn('⚠️ Navigation not ready to handle incoming call');
          }
        });
      }
    };

    initializeSocket();

    return () => {
      socket.off('incomingCall');
      socket.disconnect();
    };
  }, []);

  // useEffect(() => {
  //   const registerSocket = async () => {
  //     try {
  //       const userId = await AsyncStorage.getItem('userId');
  //       if (userId) {
  //         socket.emit('register', { userId });
  //         console.log('Socket registered for user:', userId);
  //       }
  //     } catch (error) {
  //       console.error('Error registering socket:', error);
  //     }
  //   };
  
  //   registerSocket();
  
  //   socket.on('incomingCall', ({ from, signalData, callId }) => {
  //     console.log('Incoming call from:', from);
  //     setTimeout(() => {
  //       if (isReadyRef.current && navigationRef.current) {
  //     navigationRef.current?.navigate('IncomingCall', {
  //       callerId: from,
  //       signalData,
  //       callId,
  //     });
  //   } else {
  //     console.log('Navigation not ready');
  //   }
  // }, 500); // 0.5s delay
  //   });
  
  //   return () => {
  //     socket.off('incomingCall'); // good practice
  //     socket.disconnect();
  //   };
  // }, []);
  
  return (
    <NavigationContainer ref={navigationRef}  onReady={() => {
      isReadyRef.current = true;
    }} >
    
      <Stack.Navigator initialRouteName="Welcome">
        {/* <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        /> */}
         <Stack.Screen
    name="Welcome"
    component={Welcome}
    options={{ headerShown: false }}
  />
        <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="AuthChoice" component={AuthChoice} options={{ headerShown: false }} />
       
        <Stack.Screen name="Experts" component={Experts} />
        <Stack.Screen name="Tools" component={FitnessTools} />
        <Stack.Screen name="Coummunity" component={Coummunity} />
        <Stack.Screen name="Chat" component={ChatPage} />

        <Stack.Screen name="Trainer" component={TrainerProfile} />
        <Stack.Screen name="Followers" component={FollowersList} />
        <Stack.Screen name="Following" component={FollowersList} />
    
        <Stack.Screen name="Signup" component={Signup}  />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="User" component={UserProfile} />
        <Stack.Screen name="All Experts" component={ExpertsLists} />
        <Stack.Screen name="Blog Post" component={CreateBlog} />
        <Stack.Screen name="chat-msg" component={ChatScreen} />
        <Stack.Screen name="my-profile" component={MyProfile} />
        <Stack.Screen name="BlogDetails" component={BlogDetails} options={{ title: 'Blog Details' }} />
        <Stack.Screen name="Your Blogs" component={UserBlogs} options={{ title: 'Your Blogs' }} />
        <Stack.Screen name="Edit Profile" component={EditProfile} options={{ title: 'Edit Your Profile' }} />
        <Stack.Screen name="Bank Details" component={BankDetailsPage} options={{ title: 'Add Bank Details' }} />

        <Stack.Screen name="CallStartScreen" component={CallStartScreen} />
<Stack.Screen name="CallScreen" component={CallScreen} />
<Stack.Screen
          name="IncomingCall"
          component={IncomingCallScreen}
          options={{ headerShown: false }}
        />


        {/* TOOLS  */}
        <Stack.Screen name="bmi" component={BMICalculator} />
        <Stack.Screen name="calorie-maintain" component={CalorieMaintenance} />
        <Stack.Screen name="water-intake" component={WaterIntake} />
        <Stack.Screen name="body-fat" component={BodyFatPercentage} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export { socket };
export default App;


// npx react-native run-android

