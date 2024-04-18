import { FC, useEffect, useState } from 'react'
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native'
import CourseMap from '../../components/map/CourseMap'
import { images } from '../../constants'
import * as Location from "expo-location"
import { Coordinates, Course } from '../../lib/types'
import CourseInfo from '../../components/map/CourseInfo'
import { useRouter } from 'expo-router'
import { AntDesign } from '@expo/vector-icons';


const Map = ({ }) => {
  const [userLocation, setUserLocation] = useState<Coordinates | null>({ latitude: 60.2963679, longitude: 25.0382604 });
  const [location, setLocation] = useState<Coordinates | null>({ latitude: 60.2963679, longitude: 25.0382604 });
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [visibleCourseId, setVisibleCourseId] = useState<null | number>(null)
  const router = useRouter()



  const getUserLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords
    return { latitude, longitude }
  }

  useEffect(() => {
    getUserLocation().then(coordinates => {
      if (coordinates) {
        setUserLocation({ ...coordinates })
      }
    })
  }, [])




  return (
    <View style={styles.container}>
      {userLocation &&
        <CourseMap coordinates={location} userCoordinates={userLocation} setVisibleCourseId={setVisibleCourseId}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.push("/")}>
            <AntDesign name="back" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.locateIcon} onPress={async () => {
            setLocation(userLocation)
          }}>
            <Image source={images.locateUser} style={styles.locateIconImage} />
          </TouchableOpacity>

          <CourseInfo visibleCourseId={visibleCourseId} setVisibleCourseId={setVisibleCourseId} />

        </CourseMap>}



    </View>
  )
}

export default Map

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",

  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 0,
    padding: 10,
    zIndex: 5
  },

  locateIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    padding: 15


  },
  locateIconImage: {
    width: 70,
    height: 70,
    objectFit: "contain"
  }
})