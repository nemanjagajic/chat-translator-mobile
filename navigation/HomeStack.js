import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import HomeScreen from '../screens/HomeScreen'
import FriendsScreen from '../screens/friends/FriendsScreen'

const HomeStack = createStackNavigator({
  HomeScreen,
  FriendsScreen
})

export default createAppContainer(HomeStack)

