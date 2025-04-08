// import Add from "../screens/Add"
// import BrandListScreen from "../screens/BrandListScreen"
import Chat from "../screens/ChatPage"
import Coummunity from "../screens/Community"
import Experts from "../screens/Experts"
import Home from "../screens/Home"
// import Leaderboard from "../screens/Leaderboard"
import Tools from "../screens/FitnessTools"

// import UserProfile from "../screens/UserProfile"

export const TabsRoutes = [
  // {
  //   name: "Home",
  //   Component: Home,
  //   options: { headerShown: false }
  // },
  {
    name: "Experts",
    Component: Experts,
    options: { headerShown: false  }

  },
  {
    name: "Chat",
    Component: Chat,
    options: { headerShown: false,tabBarLabel: 'Chat' }

  },
  {
    name: "Tools",
    Component: Tools,
    options: { headerShown: false }

  },
  {
    name: "Community",
    Component: Coummunity,
    options: { headerShown: false }
  },
]