import { StatusBar } from 'expo-status-bar';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { images } from '../constants';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../store/authStore';
import { useAppStateStore } from '../store/appStateStore';
import Toast from 'react-native-toast-message';

export default function App() {
  const router = useRouter()
  const { setCsrfToken, loggedIn, logout } = useAuthStore()
  const { creatingRound, setCreatingRound } = useAppStateStore()
  const [loginVisible, setLoginVisible] = useState(false)


  const createRoundHandler = () => {
    if (!loggedIn) {
      Toast.show({
        type: "error",
        text1: "You need to be logged in to start a round!",
      })
      console.log("Log in to start a round!")
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
            <TouchableOpacity style={styles.rectangleButton} onPress={() => router.push({ pathname: "/profile" })}>
              <Text style={styles.textStyle}>Profiili</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rectangleButton} onPress={logOut}>
              <Text style={styles.textStyle}>Kirjaudu ulos</Text>
            </TouchableOpacity>
          </>
          : <>
            <TouchableOpacity style={styles.rectangleButton} onPress={() => router.push({ pathname: "/login" })}>
              <Text style={styles.textStyle}>Kirjaudu sisään</Text>
            </TouchableOpacity>
          </>}

      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "center",
    paddingTop: 80,
    paddingBottom: 50,
  },
  upperButtonContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 0.7
  },
  lowerButtonContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    flex: 0.3,
    marginTop: 50
  },

  circleButton: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2E4153",
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderRadius: 200,
    width: 200,
    height: 200,
    margin: 10
  },
  rectangleButton: {
    alignItems: "center",
    backgroundColor: "#2E4153",
    width: 300,
    paddingVertical: 15,
    margin: 10

  },
  iconStyle: {
    height: 80
  },
  textStyle: {
    color: "white",
    fontSize: 28,
    textAlign: "center"
  }
});
