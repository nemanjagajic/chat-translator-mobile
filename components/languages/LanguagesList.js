import React, { useState } from 'react'
import { FlatList, StyleSheet, View, Text } from 'react-native'
import Colors from '../../constants/Colors'
import LanguagesItem from './LanguagesItem'
import LanguagesSearch from './LanguagesSearch'

const LanguagesList = ({ languages, setLanguage, closeModal }) => {
  const [filteredLanguages, setFilteredLanguages] = useState(languages)

  const filterLanguages = text => {
    const languagesResult = languages.filter(l => l.name.toLowerCase().includes(text.toLowerCase()))
    setFilteredLanguages(languagesResult)
  }

  return (
    <View style={styles.container}>
      <LanguagesSearch filterLanguages={filterLanguages} closeModal={closeModal} />
      {filteredLanguages.length > 0 ? (
        <FlatList
          data={filteredLanguages}
          renderItem={({ item, index }) => (
            <LanguagesItem
              {...item}
              isLast={index === filteredLanguages.length - 1}
              setLanguage={setLanguage}
            />
          )}
          keyExtractor={item => item.code}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'handled'}
        />
      ) : (
        <Text style={styles.noResults}>No Results</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
    width: '100%',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30
  },
  noResults: {
    fontSize: 18,
    color: Colors.GRAY_300,
    textAlign: 'center',
    marginTop: 25
  }
})

export default LanguagesList
