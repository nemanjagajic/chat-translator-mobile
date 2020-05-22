import React from 'react'
import { StyleSheet } from 'react-native'
import Modal from 'react-native-modalbox'
import LanguagesList from '../languages/LanguagesList'

const LanguagesModal = ({ isOpen, closeModal, languages, setLanguage }) => {
  return (
    <Modal
      isOpen={isOpen}
      style={styles.modal}
      position={'bottom'}
      onClosed={closeModal}
      coverScreen
      easing={null}
      animationDuration={250}
      useNativeDriver={false}
      backdrop={true}
      backdropOpacity={0}
      swipeToClose={false}
    >
      <LanguagesList languages={languages} setLanguage={setLanguage} />
    </Modal>
  )
}

const styles = StyleSheet.create({
  modal: {
    height: 500,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30
  },
})

export default LanguagesModal
