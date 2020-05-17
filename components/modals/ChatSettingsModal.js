import React, { useState } from 'react'
import { StyleSheet, Text, View, Switch } from 'react-native'
import Modal from 'react-native-modalbox'
import $t from '../../i18n'
import Colors from '../../constants/Colors'
import CountryPicker, { FlagButton } from 'react-native-country-picker-modal'
import IconArrowLeft from '../../assets/arrow-back-black-outline.svg'
import IconArrowRight from '../../assets/arrow-forward-outline.svg'

const ChatSettingsModal = ({ isOpen, closeModal }) => {
  const [showOriginals, setShowOriginals] = useState(true)
  const [sendMessagesCountry, setSendMessagesCountry] = useState(null)
  const [receiveMessagesCountry, setReceiveMessagesCountry] = useState(null)

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
            onValueChange={() => setShowOriginals(!showOriginals)}
            value={showOriginals}
          />
        </View>
        <Text style={styles.selectCountry}>{$t('Chat.selectSendingCountry')}</Text>
        <View>
          <View style={styles.messageOptionWrapper}>
            <Text style={styles.optionText}>{$t('Chat.sendMessages')}</Text>
            <IconArrowRight height={20} width={20} />
          </View>
          <View style={styles.pickedCountry}>
            <FlagButton withEmoji countryCode={sendMessagesCountry && sendMessagesCountry.cca2} />
            <Text style={styles.countryText}>{ sendMessagesCountry && sendMessagesCountry.name }</Text>
          </View>
          <CountryPicker
            withFilter
            withAlphaFilter
            withEmoji
            onSelect={c => setSendMessagesCountry(c)}
            containerButtonStyle={styles.countryPickerButton}
            placeholder={$t('Chat.selectCountry')}
          />
        </View>
        <View>
          <View style={styles.messageOptionWrapper}>
            <Text style={styles.optionText}>{$t('Chat.receiveMessages')}</Text>
            <IconArrowLeft height={20} width={20} />
          </View>
          <View style={styles.pickedCountry}>
            <FlagButton withEmoji countryCode={receiveMessagesCountry && receiveMessagesCountry.cca2} />
            <Text style={styles.countryText}>{ receiveMessagesCountry && receiveMessagesCountry.name }</Text>
          </View>
          <CountryPicker
            withFilter
            withAlphaFilter
            withEmoji
            onSelect={c => setReceiveMessagesCountry(c)}
            containerButtonStyle={styles.countryPickerButton}
            placeholder={$t('Chat.selectCountry')}
          />
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modal: {
    height: 600,
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
    fontSize: 18,
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
  optionText: {
    fontSize: 18,
    color: Colors.BLACK,
    textAlign: 'center',
    marginRight: 10
  },
  countryPickerButton: {
    width: 150,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: Colors.ACCENT,
    borderRadius: 20,
    marginTop: 5,
    alignSelf: 'center'
  },
  pickedCountry: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: Colors.WHITE_100,
    width: '100%',
    height: 50,
    marginTop: 10,
    borderRadius: 20,
    alignItems: 'center',
    paddingLeft: 20
  },
  countryText: {
    fontSize: 18,
    color: Colors.BLACK,
    textAlign: 'center',
    marginLeft: 5,
    fontWeight: '400'
  },
  messageOptionWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30
  }
})

export default ChatSettingsModal
