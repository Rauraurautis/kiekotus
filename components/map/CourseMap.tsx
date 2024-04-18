import { FC, ReactNode, useEffect, useState } from 'react'
import { View, StyleSheet, Text, Dimensions } from 'react-native'
import MapView from 'react-native-maps'
import { Coordinates, Course } from '../../lib/types'
import { Marker } from 'react-native-maps'
import { images } from '../../constants'
import CourseInfo from './CourseInfo'
import { AntDesign } from '@expo/vector-icons';
import { getAllCourses } from '../../services/courseService'

interface CourseMapProps {
    children: ReactNode
    coordinates: Coordinates | null
    userCoordinates: Coordinates | null
    setVisibleCourseId: React.Dispatch<React.SetStateAction<number | null>>
}



const CourseMap: FC<CourseMapProps> = ({ children, coordinates, userCoordinates, setVisibleCourseId }) => {
    const [courses, setCourses] = useState<Course[]>([])
     
    useEffect(() => {
        getAllCourses().then(courses => setCourses(courses))
    }, [])
    
    return (
        <View style={styles.container}>
            <MapView style={styles.map} region={{ latitude: coordinates ? coordinates.latitude : 0, longitude: coordinates ? coordinates.longitude : 0, latitudeDelta: 2, longitudeDelta: 2 }} onPress={() => setVisibleCourseId(null)}>
                {courses.map((course, i) => (
                    <Marker coordinate={{ latitude: parseFloat(course.latitude), longitude: parseFloat(course.longitude) }} title={course.title} description={course.description} key={i} image={images.basket} onPress={() => setVisibleCourseId(course.id)} />
                ))}
                {userCoordinates && <Marker coordinate={userCoordinates}><AntDesign name="user" size={36} color="green" /></Marker>}
            </MapView>
            {children}
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
    }
})