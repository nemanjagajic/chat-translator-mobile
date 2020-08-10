import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Switch, TouchableOpacity } from 'react-native'
import Modal from 'react-native-modalbox'
import $t from '../../i18n'
import Colors from '../../constants/Colors'
import LanguagesModal from './LanguagesModal'
import { useDispatch, useSelector } from 'react-redux'
import {
  RECEIVE,
  RECEIVE_LANGUAGE_PROPERTY,
  SEND,
  SEND_LANGUAGE_PROPERTY,
  SHOW_ORIGINAL_MESSAGES_PROPERTY
} from '../../constants/Messages'
import { setChatSettingsProperty } from '../../store/chats/actions'

const ChatSettingsModal = ({ chat, isOpen, closeModal, showOriginalMessages }) => {
  const dispatch = useDispatch()
  const languages = useSelector(state => state.chats.languages)

  const send = chat && languages && languages.find(l => l.code === chat.me.sendLanguage)
  const receive = chat && languages && languages.find(l => l.code === chat.me.receiveLanguage)
  const friendSend = chat && languages && languages.find(l => l.code === chat.friend.sendLanguage)
  const friendReceive = chat && languages && languages.find(l => l.code === chat.friend.receiveLanguage)

  const [showOriginals, setShowOriginals] = useState(showOriginalMessages)
  const [selectingLanguage, setSelectingLanguage] = useState(null)
  const [languageSend, setLanguageSend] = useState(send)
  const [languageReceive, setLanguageReceive] = useState(receive)

  const setLanguage = (language) => {
    dispatch(setChatSettingsProperty({
      chatId: chat._id,
      property: selectingLanguage === SEND ? SEND_LANGUAGE_PROPERTY : RECEIVE_LANGUAGE_PROPERTY,
      value: language.code
    }))
    selectingLanguage === SEND ? setLanguageSend(language) : setLanguageReceive(language)
    if (!languageSend) setLanguagePredefined(language, SEND_LANGUAGE_PROPERTY)
    if (!languageReceive) setLanguagePredefined(language, RECEIVE_LANGUAGE_PROPERTY)
    setSelectingLanguage(null)
  }

  const setLanguagePredefined = (language, property = '') => {
    console.log('setLanguagePredefined')
    console.log({ language, property })
    dispatch(setChatSettingsProperty({
      chatId: chat._id,
      property: property,
      value: language.code
    }))
    property === SEND_LANGUAGE_PROPERTY ? setLanguageSend(language) : setLanguageReceive(language)
  }

  const setShowOriginalMessages = showOriginals => {
    dispatch(setChatSettingsProperty({
      chatId: chat._id,
      property: SHOW_ORIGINAL_MESSAGES_PROPERTY,
      value: showOriginals
    }))
    setShowOriginals(showOriginals)
  }

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
    >
      <View style={styles.container}>
        <View style={styles.originalMessages}>
          <Text style={styles.originalMessagesText}>{$t('Chat.alwaysShowOriginalMessages')}</Text>
          <Switch
            style={styles.switch}
            trackColor={{ false: Colors.GRAY_100, true: Colors.GREEN_100 }}
            thumbColor={showOriginals ? Colors.ACCENT : Colors.WHITE_200}
            ios_backgroundColor={Colors.WHITE_200}
            onValueChange={() => setShowOriginalMessages(!showOriginals)}
            value={showOriginals}
          />
        </View>
        <Text style={styles.selectCountry}>{$t('Chat.selectLanguages')}</Text>
        <View style={styles.countryPickerWrapper}>
          <View style={styles.pickedLanguageWrapper}>
            <Text style={styles.pickLanguageText}>{$t('Chat.sendMessages')}</Text>
            <TouchableOpacity onPress={() => setSelectingLanguage(SEND)} style={styles.pickedLanguage}>
              <Text style={[styles.languageText, { color: languageSend ? Colors.MAIN : Colors.MAIN_200 }]}>
                { languageSend ? languageSend.name : $t('Chat.selectLanguage') }
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.pickedLanguageWrapper}>
            <Text style={styles.pickLanguageText}>{$t('Chat.receiveMessages')}</Text>
            <TouchableOpacity onPress={() => setSelectingLanguage(RECEIVE)} style={styles.pickedLanguage}>
              <Text style={[styles.languageText, { color: languageReceive ? Colors.MAIN : Colors.MAIN_200 }]}>
                { languageReceive ? languageReceive.name : $t('Chat.selectLanguage') }
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.selectCountry}>{$t('Chat.selectLanguagesFriend')}</Text>
        <View style={styles.countryPickerWrapper}>
          <View style={styles.pickedLanguageWrapper}>
            <View onPress={() => setSelectingLanguage(SEND)} style={styles.pickedLanguage}>
              <Text style={[styles.languageText, { color: Colors.GRAY_300 }]}>
                { friendSend && friendSend.name }
              </Text>
            </View>
          </View>
          <View style={styles.pickedLanguageWrapper}>
            <View onPress={() => setSelectingLanguage(RECEIVE)} style={styles.pickedLanguage}>
              <Text style={[styles.languageText, { color: Colors.GRAY_300 }]}>
                { friendReceive && friendReceive.name }
              </Text>
            </View>
          </View>
        </View>

        <LanguagesModal
          isOpen={!!selectingLanguage}
          closeModal={() => setSelectingLanguage(null)}
          languages={languages}
          setLanguage={setLanguage}
        />
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modal: {
    height: 450,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  container: {
    flex: 1,
    marginTop: 40,
    paddingHorizontal: 20
  },
  originalMessages: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  originalMessagesText: {
    fontSize: 16,
    color: Colors.BLACK,
  },
  switch: {
    marginLeft: 15
  },
  selectCountry: {
    fontSize: 16,
    marginTop: 40,
    textAlign: 'center',
    color: Colors.GRAY_300
  },
  countryPickerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },
  pickedLanguageWrapper: {
    width: '48%'
  },
  pickedLanguage: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: Colors.WHITE_100,
    width: '100%',
    height: 50,
    marginTop: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  pickLanguageText: {
    textAlign: 'center',
    fontSize: 15,
    color: Colors.BLACK
  },
  languageText: {
    fontSize: 16,
    color: Colors.MAIN_300,
    fontWeight: '500'
  }
})

export default ChatSettingsModal
