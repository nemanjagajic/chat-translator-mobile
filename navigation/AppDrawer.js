import { createDrawerNavigator } from 'react-navigation-drawer'
import HomeStack from './HomeStack'
import Drawer from '../components/drawer/Drawer'

export default createDrawerNavigator({
  HomeStack
}, {
  initialRouteName: 'HomeStack',
  contentComponent: Drawer
})
