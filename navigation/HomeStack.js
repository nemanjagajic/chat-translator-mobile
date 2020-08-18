import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import HomeScreen from '../screens/HomeScreen'
import FriendsScreen from '../screens/friends/FriendsScreen'
import ChatScreen from '../screens/chats/ChatScreen'
import AddFriendScreen from '../screens/friends/AddFriendScreen'
import ProfileScreen from '../screens/profile/ProfileScreen'

const HomeStack = createStackNavigator({
  HomeScreen,
  FriendsScreen,
  ChatScreen,
  AddFriendScreen,
  ProfileScreen
})

export default createAppContainer(HomeStack)

