import { StatusBar } from 'expo-status-bar';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { images } from '../constants';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../store/authStore';
import { useAppStateStore } from '../store/appStateStore';
import Toast from 'react-native-toast-message';
import { styles } from './index.styles';

export default function IndexPage() {
  const router = useRouter()
  const {  loggedIn, logout, relogin } = useAuthStore(state =>
    ({ loggedIn: state.loggedIn, logout: state.logout, relogin: state.relogin }))
  const { creatingRound, setCreatingRound } = useAppStateStore()
  useEffect(() => {
    setCreatingRound(false)
    relogin()
  }, [])

  const createRoundHandler = () => {
    if (!loggedIn) {
      Toast.show({
        type: "error",
        text1: "Kirjaudu sisään aloittaaksesi kierroksen!",
      })
      return
    }
    router.push({ pathname: "/map" })
    setCreatingRound(true)
  }

  const logOut = () => {
    logout()
  }

  return (
    <View style={styles.container}>
      <StatusBar style='light' backgroundColor='black' />
      <View style={styles.upperButtonContainer}>
        <TouchableOpacity style={styles.circleButton} onPress={() => createRoundHandler()}>
          <Image source={images.basket} resizeMode='contain' style={styles.iconStyle} />
          <Text style={styles.textStyle}>Uusi kierros</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.circleButton} onPress={() => router.push({ pathname: "/map" })}>
          <Image source={images.mapicon} resizeMode='contain' style={styles.iconStyle} />
          <Text style={styles.textStyle}>Radat kartalla</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.lowerButtonContainer} >
        {loggedIn ?
          <>
            <TouchableOpacity style={styles.rectangleButton}
              onPress={() => router.push({ pathname: "/profile" })}>
              <Text style={styles.textStyle}>Profiili</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rectangleButton} onPress={logOut}>
              <Text style={styles.textStyle}>Kirjaudu ulos</Text>
            </TouchableOpacity>
          </>
          : <>
            <TouchableOpacity style={styles.rectangleButton}
              onPress={() => router.push({ pathname: "/login" })}>
              <Text style={styles.textStyle}>Kirjaudu sisään</Text>
            </TouchableOpacity>
          </>}
      </View>
    </View>
  );
}

