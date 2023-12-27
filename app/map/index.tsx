import { FC, useEffect, useState } from 'react'
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native'
import CourseMap from '../../components/map/CourseMap'
import { images } from '../../constants'
import * as Location from "expo-location"
import { Coordinates, Course } from '../../lib/types'
import CourseInfo from '../../components/map/CourseInfo'




const Map = ({ }) => {
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [courseInfo, setCourseInfo] = useState<null | Course>(null)

  useEffect(() => {

    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords

      setUserLocation(prev => ({ latitude, longitude }))
    })();
  }, []);


  return (
    <View style={styles.container}>
      {userLocation &&
        <CourseMap coordinates={userLocation} setCourseInfo={setCourseInfo}>
          <TouchableOpacity style={styles.locateIcon}>
            <Image source={images.locateUser} style={styles.locateIconImage} />
          </TouchableOpacity>
          <CourseInfo course={courseInfo} setCourseInfo={setCourseInfo} />

        </CourseMap>}

        

    </View>
  )
}

export default Map

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%"
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