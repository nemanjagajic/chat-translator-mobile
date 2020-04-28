import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import HomeScreen from '../screens/HomeScreen'

const HomeStack = createStackNavigator({
  HomeScreen
})

export default createAppContainer(HomeStack)

