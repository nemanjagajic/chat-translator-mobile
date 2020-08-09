import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import AuthLoadingScreen from '../screens/AuthLoadingScreen'
import AppDrawer from './AppDrawer'
import AuthStack from './AuthStack'

const AppNavigator = createSwitchNavigator({
  AuthLoadingScreen,
  AuthStack,
  Home: AppDrawer
})

export default createAppContainer(AppNavigator)
