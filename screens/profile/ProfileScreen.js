import React, { useState } from 'react'
import { StyleSheet, TextInput, TouchableOpacity, View, Image, Text, Platform, KeyboardAvoidingView } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { useSelector, useDispatch } from 'react-redux'
import $t from '../../i18n'
import Colors from '../../constants/Colors'
import { LOGIN_EMAIL } from '../../constants/Auth'
import IconBack from '../../assets/arrow-back-outline.svg'
import IconImage from '../../assets/image-outline.svg'
import defaultAvatar from '../../assets/defaultAvatar.png'

const ProfileScreen = () => {
  const dispatch = useDispatch()

  const activeUser = useSelector(state => state.auth.user)

  const [firstName, setFirstName] = useState(activeUser && activeUser.firstName)
  const [lastName, setLastName] = useState(activeUser && activeUser.lastName)
  const [image, setImage] = useState(null)

  const openImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.4
    })
    if (!result.cancelled) setImage(result)
  }

  const isProfileEdited = () => {
    if (!activeUser) return false
    return (
      firstName !== activeUser.firstName ||
      lastName !== activeUser.lastName ||
      image !== null
    )
  }

  console.log(isProfileEdited())

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={styles.container}
      keyboardVerticalOffset={90}
    >
      <View style={styles.topContent}>
        {image ? (
          <Image
            style={styles.image}
            source={image}
          />
        ) : (
          <Image style={styles.image} source={defaultAvatar} />
        )}
        <TouchableOpacity
          onPress={openImagePicker}
          style={styles.selectPhoto}
        >
          <IconImage height={28} width={28} />
        </TouchableOpacity>
      </View>
      <View style={styles.bottomContent}>
        <TextInput
          value={firstName}
          style={styles.input}
          onChangeText={text => setFirstName(text)}
          placeholder={$t('Profile.firstName')}
          placeholderTextColor={Colors.GRAY}
          color={Colors.MAIN}
          autoCapitalize={'none'}
        />
        <TextInput
          value={lastName}
          style={styles.input}
          onChangeText={text => setLastName(text)}
          placeholder={$t('Profile.lastName')}
          placeholderTextColor={Colors.GRAY}
          color={Colors.MAIN}
          autoCapitalize={'none'}
        />
        {isProfileEdited() && (
          <TouchableOpacity
            onPress={() => {}}
            style={styles.saveChangesButton}
          >
            <Text style={styles.saveChangesText}>{$t('Profile.saveChanges')}</Text>
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
  )
}

ProfileScreen.navigationOptions = ({ navigation }) => ({
  title: $t('Profile.title'),
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
      onPress={() => navigation.navigate('HomeScreen')}
    >
      <IconBack height={28} width={28} />
    </TouchableOpacity>
  )
})

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.WHITE_200,
    borderRadius: 20,
    paddingLeft: 10,
    marginTop: 20,
    fontSize: 18,
    color: Colors.MAIN,
    fontWeight: '500'
  },
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE
  },
  topContent: {
    flex: 2,
    backgroundColor: Colors.MAIN,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottomContent: {
    flex: 3,
    paddingHorizontal: 30,
    paddingTop: 30,
    zIndex: 2
  },
  image: {
    backgroundColor: '#f2f2f2',
    borderColor: '#f2f2f2',
    borderRadius: 100,
    borderWidth: 1,
    height: 170,
    width: 170
  },
  selectPhoto: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 45,
    height: 45,
    borderRadius: 100,
    backgroundColor: Colors.WHITE,
    marginTop: -20,
    zIndex: 1,
  },
  saveChangesButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 55,
    backgroundColor: Colors.ACCENT,
    borderRadius: 20,
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center'
  },
  saveChangesText: {
    fontSize: 18,
    color: Colors.WHITE,
    fontWeight: '500'
  }
})

export default ProfileScreen
