import { FC, useEffect, useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native'
import { Course } from '../../lib/types'
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useRoundStore } from '../../store/roundStore';
import { getCourseData } from '../../services/courseService';
import BackButton from '../ui/BackButton';

interface CourseInfoProps {
    visibleCourseId: null | number
    setVisibleCourseId: React.Dispatch<React.SetStateAction<number | null>>
}

const CourseInfo: FC<CourseInfoProps> = ({ visibleCourseId, setVisibleCourseId }) => {
    const { setRoundInfo, creatingRound } = useRoundStore(state =>
        ({ setRoundInfo: state.setRoundInfo, creatingRound: state.creatingRound }))
    const [course, setCourse] = useState<Course | null>(null)
    const router = useRouter()

    useEffect(() => {
        if (visibleCourseId) {
            getCourseData(visibleCourseId).then(course => setCourse(course))
        }
    }, [visibleCourseId])

    if (!visibleCourseId || !course) {
        return null
    }

    const handlePlayerSelectionPress = () => {
        setRoundInfo({ course, players: [] })
        router.push({ pathname: "/playerselection" })
    }

    return (
        <View style={styles.container}>
            <BackButton onPress={() => setVisibleCourseId(null)} />
            <View style={styles.courseInfoContainer}>
                <Text style={styles.courseTitle}>{course.name} {course.difficulty}</Text>
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
                    <TouchableOpacity style={styles.playerChooseButton}
                        onPress={() => handlePlayerSelectionPress()} >
                        <Text>Pelaajavalinta</Text>
                    </TouchableOpacity>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0.4,
        minHeight: 250,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 30,
        backgroundColor: "white",
        width: 280,
        position: "relative",
        zIndex: 20
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