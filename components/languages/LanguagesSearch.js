import React from 'react'
import { StyleSheet, View, TextInput } from 'react-native'
import Colors from '../../constants/Colors'
import $t from '../../i18n'

const LanguagesSearch = ({ filterLanguages }) => {
  return (
    <TextInput
      onChangeText={text => filterLanguages(text)}
      style={styles.container}
      placeholder={$t('Chat.searchLanguage')}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: Colors.WHITE_200,
    height: 50,
    width: '95%',
    alignSelf: 'center',
    borderRadius: 30,
    marginTop: 10,
    paddingLeft: 20,
    fontSize: 16
  }
})

export default LanguagesSearch
