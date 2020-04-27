import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import AuthLoadingScreen from '../screens/AuthLoadingScreen'
import AuthScreen from '../screens/AuthScreen'
import HomeScreen from '../screens/HomeScreen'

const AppNavigator = createSwitchNavigator({
  AuthLoadingScreen,
  AuthScreen,
  HomeScreen
})

export default createAppContainer(AppNavigator);
