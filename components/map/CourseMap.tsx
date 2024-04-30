import { FC, ReactNode, useEffect, useState } from 'react'
import { View, StyleSheet, Text, Dimensions, TouchableOpacity, Image } from 'react-native'
import MapView from 'react-native-maps'
import { Coordinates, Course } from '../../lib/types'
import { Marker } from 'react-native-maps'
import { images } from '../../constants'
import * as Location from "expo-location"
import CourseInfo from './CourseInfo'
import { AntDesign } from '@expo/vector-icons';
import { getAllCourses } from '../../services/courseService'
import { useRouter } from 'expo-router'
import { useAppStateStore } from '../../store/appStateStore'


const CourseMap = () => {
    const [courses, setCourses] = useState<Course[]>([])
    const [userLocation, setUserLocation] = useState<Coordinates | null>({ latitude: 60.2963679, longitude: 25.0382604 });
    const [location, setLocation] = useState<Coordinates | null>({ latitude: 60.2963679, longitude: 25.0382604 });
    const [visibleCourseId, setVisibleCourseId] = useState<null | number>(null)
    const creatingRound = useAppStateStore(state => state.creatingRound)

    const getUserLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            return;
        }
        let location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords
        return { latitude, longitude }
    }

    useEffect(() => {
        getUserLocation().then(coordinates => {
            if (coordinates) {
                setLocation({ ...coordinates })
                setUserLocation({ ...coordinates })
            }
        })
        getAllCourses().then(courses => setCourses(courses))
    }, [])

    return (
        <View style={styles.container}>
            <MapView style={styles.map} showsUserLocation onRegionChangeComplete={(event) => setLocation(event)} region={{
                latitude: location ? location.latitude
                    : 0, longitude: location ? location.longitude : 0, latitudeDelta: 2, longitudeDelta: 2
            }} onPress={() => setVisibleCourseId(null)}>
                {courses.map((course, i) => (
                    <Marker coordinate={{ latitude: parseFloat(course.latitude), longitude: parseFloat(course.longitude) }} title={course.name}
                        description={course.description} key={i} image={images.basket} onPress={() => setVisibleCourseId(course.id)} />
                ))}
            </MapView>
            {userLocation &&
                <TouchableOpacity style={styles.locateIcon} onPress={async () => { setLocation(userLocation) }}>
                    <Image source={images.locateUser} style={styles.locateIconImage} />
                </TouchableOpacity>
            }
            {visibleCourseId && <CourseInfo visibleCourseId={visibleCourseId} setVisibleCourseId={setVisibleCourseId} />}
            {creatingRound && <TouchableOpacity style={styles.createOwnCourseButton}>
                <Text>Custom rata</Text>
            </TouchableOpacity>}


        </View>
    )
}

export default CourseMap





const styles = StyleSheet.create({
    map: {
        width: Dimensions.get("window").width,
        height: "100%",
        position: "absolute"
    },
    locationIcon: {
        position: "absolute",
        zIndex: 20,
        width: 200,
        top: 0
    },
    text: {
        fontSize: 30
    },
    container: {
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: 'center',
        flex: 1
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
    },
    createOwnCourseButton: {
        position: 'absolute',
        backgroundColor: "#0099ff",
        borderRadius: 200,
        height: 60,
        bottom: 15,
        left: 15,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 5
    }
})