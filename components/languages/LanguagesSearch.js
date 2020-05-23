import React from 'react'
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native'
import Colors from '../../constants/Colors'
import $t from '../../i18n'
import IconSearch from '../../assets/search-outline.svg'
import IconClose from '../../assets/close.svg'

const LanguagesSearch = ({ filterLanguages, closeModal }) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <IconSearch width={22} height={22} />
        <TextInput
          style={styles.input}
          onChangeText={text => filterLanguages(text)}
          placeholder={$t('Chat.searchLanguage')}
          placeholderTextColor={Colors.GRAY}
          color={Colors.BLACK}
        />
      </View>
      <TouchableOpacity
        onPress={closeModal}
        style={styles.icon}
      >
        <IconClose width={24} height={24} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: 50,
    marginTop: 50,
    width: '95%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.WHITE_200,
    height: 50,
    borderRadius: 30,
    paddingLeft: 20,
    fontSize: 16,
    color: Colors.BLACK,
  },
  input: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 16
  },
  icon: {
    marginRight: 5,
    marginLeft: 10
  }
})

export default LanguagesSearch
