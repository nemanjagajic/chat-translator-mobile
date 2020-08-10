import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Platform, KeyboardAvoidingView } from 'react-native'
import $t from '../../i18n'
import Colors from '../../constants/Colors'
import IconBack from '../../assets/arrow-back-outline.svg'
import ButtonStep from '../../components/buttons/ButtonStep'
import { REGISTER_EMAIL, REGISTER_PASSWORD, REGISTER_USER_DATA } from '../../constants/Auth'
import { register } from '../../store/auth/actions'

const MIN_PASSWORD_LENGTH = 8

const SignUpScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const loginInProgress = useSelector(state => state.auth.loginInProgress)

  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    navigation.setParams({ step: REGISTER_EMAIL })
  }, [])

  const handleButtonStepPressed = () => {
    if (isButtonDisabled()) return
    const step = navigation.getParam('step')
    if (step === REGISTER_EMAIL) {
      navigation.setParams({ step: REGISTER_USER_DATA })
    } else if (step === REGISTER_USER_DATA) {
      navigation.setParams({ step: REGISTER_PASSWORD })
    } else {
      dispatch(register({
        email,
        firstName,
        lastName,
        password,
        navigateHome: () => navigation.navigate('Home')
      }))
    }
  }

  const isEmailValid = () => /\S+@\S+\.\S+/.test(email)
  const isPasswordValid = () => password.length >= MIN_PASSWORD_LENGTH
  const isFullNameValid = () => firstName.trim() !== '' && lastName.trim() !== ''

  const isButtonDisabled = () => {
    return loginInProgress
      || !isEmailValid()
      || (step === REGISTER_USER_DATA && !isFullNameValid())
      || (step === REGISTER_PASSWORD && !isPasswordValid())
  }

  const step = navigation && navigation.getParam('step')

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={styles.container}
      keyboardVerticalOffset={90}
    >
      {step === REGISTER_EMAIL && (
        <View style={styles.contentContainer}>
          <Text style={styles.enterEmail}>{$t('Auth.enterEmail')}</Text>
          <TextInput
            value={email}
            style={styles.input}
            onChangeText={text => setEmail(text)}
            placeholder={$t('Auth.email')}
            placeholderTextColor={Colors.GRAY}
            color={Platform.OS === 'ios' ? Colors.BLACK : null}
            autoCapitalize={'none'}
            onSubmitEditing={handleButtonStepPressed}
          />
          <Text style={styles.inputDescription}>
            Please enter <Text style={{ color: isEmailValid() ? Colors.ACCENT : Colors.RED }}>valid</Text> email format
          </Text>
        </View>
      )}
      {step === REGISTER_USER_DATA && (
        <View style={styles.contentContainer}>
          <Text style={styles.enterEmail}>{$t('Auth.enterFullName')}</Text>
          <TextInput
            value={firstName}
            style={styles.input}
            onChangeText={text => setFirstName(text)}
            placeholder={$t('Auth.firstName')}
            placeholderTextColor={Colors.GRAY}
            color={Platform.OS === 'ios' ? Colors.BLACK : null}
            onSubmitEditing={handleButtonStepPressed}
          />
          <TextInput
            value={lastName}
            style={styles.input}
            onChangeText={text => setLastName(text)}
            placeholder={$t('Auth.lastName')}
            placeholderTextColor={Colors.GRAY}
            color={Platform.OS === 'ios' ? Colors.BLACK : null}
            onSubmitEditing={handleButtonStepPressed}
          />
          <Text style={styles.inputDescription}>
            Both fields must be <Text style={{ color: isFullNameValid() ? Colors.ACCENT : Colors.RED }}>populated</Text>
          </Text>
        </View>
      )}
      {step === REGISTER_PASSWORD && (
        <View style={styles.contentContainer}>
          <Text style={styles.enterEmail}>{$t('Auth.enterPassword')}</Text>
          <TextInput
            value={password}
            secureTextEntry={true}
            style={styles.input}
            onChangeText={text => setPassword(text)}
            placeholder={$t('Auth.password')}
            placeholderTextColor={Colors.GRAY}
            color={Platform.OS === 'ios' ? Colors.BLACK : null}
            onSubmitEditing={handleButtonStepPressed}
          />
          <Text style={styles.inputDescription}>
            Password must be at least
            <Text style={{ color: isPasswordValid() ? Colors.ACCENT : Colors.RED }}> {MIN_PASSWORD_LENGTH} characters</Text> long
          </Text>
        </View>
      )}
      <View style={styles.bottomContainer}>
        <View style={styles.circlesWrapper}>
          <View style={[styles.circle, step === REGISTER_EMAIL ? styles.circleSelected : null]} />
          <View style={[styles.circle, step === REGISTER_USER_DATA ? styles.circleSelected : null]} />
          <View style={[styles.circle, step === REGISTER_PASSWORD ? styles.circleSelected : null]} />
        </View>
        <ButtonStep disabled={isButtonDisabled()} inProgress={loginInProgress} onPress={handleButtonStepPressed} />
      </View>
    </KeyboardAvoidingView>
  )
}

SignUpScreen.navigationOptions = ({ navigation }) => ({
  title: $t('Auth.signUp'),
  headerStyle: {
    shadowColor: 'transparent'
  },
  headerTitleStyle: {
    color: Colors.MAIN,
    fontSize: 22
  },
  headerLeft: () => (
    <TouchableOpacity
      style={{ marginLeft: 15 }}
      onPress={() => {
        const step = navigation.getParam('step')
        if (step === REGISTER_EMAIL) {
          navigation.goBack()
        } else if (step === REGISTER_USER_DATA) {
          navigation.setParams({ step: REGISTER_EMAIL })
        } else {
          navigation.setParams({ step: REGISTER_USER_DATA })
        }
      }}
    >
      <IconBack height={28} width={28} />
    </TouchableOpacity>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    paddingHorizontal: 20,
    paddingTop: 50
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.WHITE_200,
    borderRadius: 20,
    paddingLeft: 10,
    marginTop: 20,
    fontSize: 18
  },
  enterEmail: {
    fontSize: 20,
    paddingLeft: 5,
    color: Colors.BLACK,
  },
  contentContainer: {
    flex: 5
  },
  bottomContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20
  },
  circlesWrapper: {
    flex: 1,
    height: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingLeft: 60
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 100,
    backgroundColor: Colors.GRAY_200,
    margin: 5
  },
  circleSelected: {
    backgroundColor: Colors.MAIN
  },
  inputDescription: {
    fontSize: 15,
    marginTop: 30,
    paddingLeft: 5,
    color: Colors.GRAY_500
  }
})

export default SignUpScreen
