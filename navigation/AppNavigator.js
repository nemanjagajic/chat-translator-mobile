import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import AuthLoadingScreen from '../screens/AuthLoadingScreen'
import AuthScreen from '../screens/AuthScreen'
import AppDrawer from './AppDrawer'

const AppNavigator = createSwitchNavigator({
  AuthLoadingScreen,
  AuthScreen,
  Home: AppDrawer
})

export default createAppContainer(AppNavigator)
