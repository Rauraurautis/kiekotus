import { View, StyleSheet } from 'react-native'
import CourseMap from '../../components/map/CourseMap'



const MapPage = ({ }) => {

  return (
    <View style={styles.container}>
      <CourseMap />
    </View>
  )
}

export default MapPage

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