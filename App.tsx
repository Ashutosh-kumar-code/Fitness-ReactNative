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





























































// const MainScreen = ({ activeTab }: any) => {
//   switch (activeTab) {
//     case "Home":
//       return <Home />;
//     case "Shorts":
//       return <Shorts />;
//     case "Subscription":
//       return <Subscription />;
//     case "User":
//       return <UserProfile />;
//     default:
//       return <Home />;
//   }
// };




// <NavigationContainer>
// <Header/>
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="Main">
//         {() => <MainScreen activeTab={activeTab} />}
//       </Stack.Screen>
//       <Stack.Screen name="DailyDevotion" component={() => <View><Text>Hello</Text></View>} />

//     </Stack.Navigator>
//     <FooterTabs  navigation={{ navigate: setActiveTab }} />

// </NavigationContainer>






// <NavigationContainer>
//   <Stack.Navigator initialRouteName="Home">

//     {TabsRoutes.map((tabs, index) =>
//       <Stack.Screen
//         key={index}
//         name={tabs.name}
//         component={tabs.Component}
//         options={tabs.options}

//       />
//     )
//     }

//   </Stack.Navigator>
//   <FooterTabs navigation={navigation} />

// </NavigationContainer>




