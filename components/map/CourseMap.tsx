import { FC, ReactNode, useState } from 'react'
import { View, StyleSheet, Text, Dimensions } from 'react-native'
import MapView from 'react-native-maps'
import { Coordinates, Course } from '../../lib/types'
import { Marker } from 'react-native-maps'
import { images } from '../../constants'
import CourseInfo from './CourseInfo'

interface CourseMapProps {
    children: ReactNode
    coordinates: Coordinates | null
    setCourseInfo: React.Dispatch<React.SetStateAction<Course | null>>
}

const markers: Course[] = [
    {
        latlng: { latitude: 60.386132, longitude: 24.9754728 },
        title: "Testirata", description: "Testidescription", difficulty: "AA2", address: "Kissakuja 5", holes: [{distance: 100, par: 3}, {distance: 100, par: 3},{distance: 100, par: 3},{distance: 100, par: 3},{distance: 100, par: 3},{distance: 100, par: 3},
            {distance: 100, par: 3},{distance: 100, par: 3},{distance: 100, par: 3},{distance: 100, par: 3},{distance: 100, par: 3},{distance: 100, par: 3},{distance: 100, par: 3},{distance: 100, par: 3},{distance: 100, par: 3},{distance: 100, par: 3},
            {distance: 100, par: 3},{distance: 100, par: 3}], mapAddress: "www.test.com"
    }
]


const CourseMap: FC<CourseMapProps> = ({ children, coordinates, setCourseInfo }) => {
  

    return (
        <View style={styles.container}>
            <MapView style={styles.map} initialRegion={{ latitude: coordinates ? coordinates.latitude : 0, longitude: coordinates ? coordinates.longitude : 0, latitudeDelta: 0.5, longitudeDelta: 0.5 }} onPress={() => setCourseInfo(null)}>
                {markers.map((marker, i) => (
                    <Marker coordinate={marker.latlng} title={marker.title} description={marker.description} key={i} image={images.basket} onPress={() => setCourseInfo(marker)} />
                ))}
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