import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import HomeScreen from '../screens/HomeScreen'
import FriendsScreen from '../screens/friends/FriendsScreen'
import ChatScreen from '../screens/chats/ChatScreen'

const HomeStack = createStackNavigator({
  HomeScreen,
  FriendsScreen,
  ChatScreen
})

export default createAppContainer(HomeStack)

