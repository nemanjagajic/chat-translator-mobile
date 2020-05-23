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
      animationDuration={0}
      useNativeDriver={false}
      backdrop={true}
      backdropOpacity={0}
      swipeToClose={false}
      keyboardTopOffset={0}
    >
      <LanguagesList languages={languages} setLanguage={setLanguage} closeModal={closeModal} />
    </Modal>
  )
}

const styles = StyleSheet.create({
  modal: {
    height: '100%'
  },
})

export default LanguagesModal
