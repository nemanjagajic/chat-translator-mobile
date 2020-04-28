import React from 'react'
import {View} from 'react-native'
import Colors from '../../constants/Colors'
import {Ionicons} from '@expo/vector-icons'

const SearchButton = ({ style = null }) => {
  return (
    <View style={style}>
      <Ionicons name="ios-search" size={28} color={Colors.WHITE} />
    </View>
  )
}

export default SearchButton
