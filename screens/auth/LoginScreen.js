import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Platform, KeyboardAvoidingView } from 'react-native'
import $t from '../../i18n'
import Colors from '../../constants/Colors'
import IconBack from '../../assets/arrow-back-outline.svg'
import ButtonStep from '../../components/buttons/ButtonStep'
import { LOGIN_EMAIL, LOGIN_PASSWORD } from '../../constants/Auth'
import { logIn } from '../../store/auth/actions'
import IconEye from '../../assets/eye-outline.svg'
import IconEyeOff from '../../assets/eye-off-outline.svg'

const MIN_PASSWORD_LENGTH = 8

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const loginInProgress = useSelector(state => state.auth.loginInProgress)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    navigation.setParams({ step: LOGIN_EMAIL })
  }, [])

  const handleButtonStepPressed = () => {
    if (isButtonDisabled()) return
    const step = navigation.getParam('step')
    if (step === LOGIN_EMAIL) {
      navigation.setParams({ step: LOGIN_PASSWORD })
    } else {
      dispatch(logIn({
        email,
        password,
        navigateHome: () => navigation.navigate('Home')
      }))
    }
  }

  const isEmailValid = () => /\S+@\S+\.\S+/.test(email)
  const isPasswordValid = () => password.length >= MIN_PASSWORD_LENGTH

  const isButtonDisabled = () => {
    return loginInProgress || !isEmailValid() || (step === LOGIN_PASSWORD && !isPasswordValid())
  }

  const step = navigation && navigation.getParam('step')

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={styles.container}
      keyboardVerticalOffset={90}
    >
      {step === LOGIN_EMAIL ? (
        <View style={styles.contentContainer}>
          <Text style={styles.enterText}>{$t('Auth.enterEmail')}</Text>
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
      ) : (
        <View style={styles.contentContainer}>
          <Text style={styles.enterText}>{$t('Auth.enterPassword')}</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              value={password}
              secureTextEntry={!showPassword}
              style={styles.inputPassword}
              onChangeText={text => setPassword(text)}
              placeholder={$t('Auth.password')}
              placeholderTextColor={Colors.GRAY}
              color={Platform.OS === 'ios' ? Colors.BLACK : null}
              onSubmitEditing={handleButtonStepPressed}
            />
            {showPassword ? (
              <TouchableOpacity
                onPress={() => setShowPassword(false)}
              >
                <IconEyeOff height={28} width={28} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => setShowPassword(true)}
              >
                <IconEye height={28} width={28} />
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.inputDescription}>
            Password must be at least
            <Text style={{ color: isPasswordValid() ? Colors.ACCENT : Colors.RED }}> {MIN_PASSWORD_LENGTH} characters</Text> long
          </Text>
        </View>
      )}
      <View style={styles.bottomContainer}>
        <View style={styles.circlesWrapper}>
          <View style={[styles.circle, step === LOGIN_EMAIL ? styles.circleSelected : null]} />
          <View style={[styles.circle, step === LOGIN_PASSWORD ? styles.circleSelected : null]} />
        </View>
        <ButtonStep disabled={isButtonDisabled()} inProgress={loginInProgress} onPress={handleButtonStepPressed} />
      </View>
    </KeyboardAvoidingView>
  )
}

LoginScreen.navigationOptions = ({ navigation }) => ({
  title: $t('Auth.loginTitle'),
  headerStyle: {
    backgroundColor: Colors.BACKGROUND,
    shadowColor: 'transparent',
    elevation: 0
  },
  headerTitleStyle: {
    color: Colors.MAIN,
    fontSize: 22,
  },
  headerLeft: () => (
    <TouchableOpacity
      style={{ marginLeft: 15 }}
      onPress={() => {
        navigation.getParam('step') === LOGIN_EMAIL
          ? navigation.goBack()
          : navigation.setParams({ step: LOGIN_EMAIL })
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
  inputPassword: {
    width: '85%',
    height: 50,
    backgroundColor: Colors.WHITE_200,
    borderRadius: 20,
    paddingLeft: 10,
    fontSize: 18
  },
  enterText: {
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
  },
  passwordContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'space-between',
    paddingRight: 10
  }
})

export default LoginScreen
