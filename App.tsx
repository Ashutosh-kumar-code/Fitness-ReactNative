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



const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        {/* <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        /> */}
        <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
       
        <Stack.Screen name="Experts" component={Experts} />
        <Stack.Screen name="Tools" component={FitnessTools} />
        <Stack.Screen name="Coummunity" component={Coummunity} />
        <Stack.Screen name="Chat" component={ChatPage} />

        <Stack.Screen name="trainer-profile" component={TrainerProfile} />
        <Stack.Screen name="Followers" component={FollowersList} />
        <Stack.Screen name="Following" component={FollowersList} />
    
        <Stack.Screen name="Signup" component={Signup}  />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="User" component={UserProfile} />
        <Stack.Screen name="All Experts" component={ExpertsLists} />
        <Stack.Screen name="Blog Post" component={CreateBlog} />
        <Stack.Screen name="chat-msg" component={ChatScreen} />
        <Stack.Screen name="my-profile" component={MyProfile} />


        {/* TOOLS  */}
        <Stack.Screen name="bmi" component={BMICalculator} />
        <Stack.Screen name="calorie-maintain" component={CalorieMaintenance} />
        <Stack.Screen name="water-intake" component={WaterIntake} />
        <Stack.Screen name="body-fat" component={BodyFatPercentage} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;


// npx react-native run-android

