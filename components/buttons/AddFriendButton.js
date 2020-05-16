import React from 'react'
import { View } from 'react-native'
import Colors from '../../constants/Colors'
import { Ionicons } from '@expo/vector-icons'

const AddFriendButton = ({ style = null }) => {
  return (
    <View style={style}>
      <Ionicons name='md-person-add' size={28} color={Colors.MAIN} />
    </View>
  )
}

export default AddFriendButton
