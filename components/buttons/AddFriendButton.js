import React from 'react'
import { View } from 'react-native'
import IconAddFriend from '../../assets/person-add-outline.svg'

const AddFriendButton = ({ style = null }) => {
  return (
    <View style={style}>
      <IconAddFriend height={26} width={26} />
    </View>
  )
}

export default AddFriendButton
