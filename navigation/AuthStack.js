import { createStackNavigator, TransitionPresets } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import AuthScreen from '../screens/AuthScreen'
import LoginScreen from '../screens/auth/LoginScreen'
import SignUpScreen from '../screens/auth/SignUpScreen'

const AuthStack = createStackNavigator({
  AuthScreen,
  LoginScreen,
  SignUpScreen
}, {
  defaultNavigationOptions: {
    ...TransitionPresets.SlideFromRightIOS,
  }
})

export default createAppContainer(AuthStack)

