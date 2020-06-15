import React from 'react'
import { FlatList, StyleSheet } from 'react-native'
import Colors from '../../constants/Colors'
import SearchItem from './SearchItem'

const SearchList = ({ users }) => {
  return (
    <FlatList
      style={styles.container}
      data={users}
      renderItem={({ item, index }) => (
        <SearchItem
          {...item}
          isFirst={index === 0}
          isLast={index === users.length - 1}
        />
      )}
      keyExtractor={item => item._id}
      showsVerticalScrollIndicator={false}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
    paddingLeft: 20,
    paddingRight: 20,
  },
})

export default SearchList
