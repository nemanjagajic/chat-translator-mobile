import React from 'react'
import { TouchableOpacity } from 'react-native'
import IconAddFriend from '../../assets/person-add-outline.svg'

const AddFriendButton = ({ style = null, onPress }) => {
  return (
    <TouchableOpacity
      style={style}
      onPress={onPress}
    >
      <IconAddFriend height={26} width={26} />
    </TouchableOpacity>
  )
}

export default AddFriendButton
