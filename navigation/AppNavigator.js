import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import AuthLoadingScreen from '../screens/AuthLoadingScreen'
import AuthScreen from '../screens/AuthScreen'
import HomeStack from './HomeStack'

const AppNavigator = createSwitchNavigator({
  AuthLoadingScreen,
  AuthScreen,
  Home: HomeStack
})

export default createAppContainer(AppNavigator);
