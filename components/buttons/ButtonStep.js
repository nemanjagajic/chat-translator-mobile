import React from 'react'
import { StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import Colors from '../../constants/Colors'
import IconForward from '../../assets/arrow-forward-white.svg'


const ButtonStep = ({ onPress, inProgress = false, disabled = false }) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress} style={[styles.container, disabled ? styles.disabledButton : null]}
    >
      {inProgress ? (
        <ActivityIndicator size="small" color={Colors.WHITE} />
      ) : (
        <IconForward height={30} width={30} />
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: Colors.MAIN,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  disabledButton: {
    backgroundColor: Colors.GRAY_100
  }
})

export default ButtonStep
