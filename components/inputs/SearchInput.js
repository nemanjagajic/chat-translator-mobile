import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import IconSearch from '../../assets/search-outline.svg'
import Colors from '../../constants/Colors'

const SearchInput = ({ value, onChangeText, searchUser }) => {
  return (
    <View style={styles.container}>
      <IconSearch width={26} height={26} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={text => onChangeText(text)}
        returnKeyType={'search'}
        onSubmitEditing={() => searchUser(value)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.WHITE_200,
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 20,
    height: 45,
    paddingHorizontal: 10
  },
  input: {
    flex: 1,
    height: 40,
    marginLeft: 10,
    fontSize: 18,
    color: Colors.BLACK
  }
})

export default SearchInput
