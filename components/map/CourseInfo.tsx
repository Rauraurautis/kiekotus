import { FC } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native'
import { Course } from '../../lib/types'
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useAppStateStore } from '../../store/appStateStore';
import { useRouter } from 'expo-router';
import { useRoundStore } from '../../store/roundStore';

interface CourseInfoProps {
    course: null | Course
    setCourseInfo: React.Dispatch<React.SetStateAction<Course | null>>
}

const CourseInfo: FC<CourseInfoProps> = ({ course, setCourseInfo }) => {
    const { creatingRound } = useAppStateStore()
    const { setRoundInfo } = useRoundStore()
    const router = useRouter()

    if (!course) {
        return null
    }

    const handlePlayerSelectionPress = () => {
        setRoundInfo({ course, players: [] })
        router.push({ pathname: "/playerselection" })
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => setCourseInfo(null)}>
                <AntDesign name="back" size={24} color="black" />
            </TouchableOpacity>
            <View style={styles.courseInfoContainer}>
                <Text style={styles.courseTitle}>{course.title} {course.difficulty}</Text>
                <Text style={styles.courseInfo}>{course.address}</Text>

                {course.mapAddress ?
                    <TouchableOpacity style={styles.courseMap}>
                        <MaterialIcons name="map" size={24} color="blue" />
                        <Text>Ratakartta</Text>
                    </TouchableOpacity>
                    :
                    <Text>Ei ratakarttaa</Text>}
                <Text style={styles.fairwayHeader}>Väylät</Text>
                <ScrollView style={styles.fairwayList}>
                    {course.holes.map((hole, i) => (
                        <View style={styles.fairwayInfo} key={i}>
                            <Text style={styles.fairwayNumber}>Väylä {i + 1}</Text>
                            <View style={styles.distanceAndPar}>
                                <Text>{hole.distance} metriä</Text>
                                <Text>Par {hole.par}</Text>
                            </View>
                        </View>

                    ))}
                </ScrollView>

                {creatingRound &&
                    <TouchableOpacity style={styles.playerChooseButton} onPress={() => handlePlayerSelectionPress()}>
                        <Text>Pelaajavalinta</Text>
                    </TouchableOpacity>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0.3,
        minHeight: 230,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 30,
        backgroundColor: "white",
        width: 280,
        position: "relative",
        zIndex: 20
    },
    backButton: {
        position: "absolute",
        top: 0,
        left: 0,
        padding: 10
    },
    courseInfoContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 5
    },
    courseTitle: {
        fontSize: 25,
        top: 0
    },
    courseInfo: {

    },
    courseMap: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 3,
        fontWeight: "200",

    },
    fairwayHeader: {
        fontSize: 20,
        marginTop: 5
    },
    fairwayList: {
        width: "auto",
        gap: 5,
        paddingHorizontal: 5
    },
    fairwayInfo: {
        display: "flex",
        flexDirection: "row",
        gap: 5,
        justifyContent: "space-between",
        width: "90%"
    },
    fairwayNumber: {
        fontWeight: "600"
    },
    distanceAndPar: {
        flexDirection: "row",
        gap: 5
    },
    playerChooseButton: {
        backgroundColor: "#7198FC",
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 50
    }

})

export default CourseInfo