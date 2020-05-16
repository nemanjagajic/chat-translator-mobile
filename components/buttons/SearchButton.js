import React from 'react'
import { View } from 'react-native'
import IconSearch from '../../assets/search-outline.svg'

const SearchButton = ({ style = null }) => {
  return (
    <View style={style}>
      <IconSearch width={26} height={26} />
    </View>
  )
}

export default SearchButton
