import { FC, useEffect, useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native'
import { Course } from '../../lib/types'
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useRoundStore } from '../../store/roundStore';
import { getCourseData } from '../../services/courseService';
import BackButton from '../ui/BackButton';


interface CustomCourseFormProps {
    setCreatingCustom: React.Dispatch<React.SetStateAction<boolean>>
}

const CustomCourseForm: FC<CustomCourseFormProps> = ({ setCreatingCustom }) => {
    const { setRoundInfo, creatingRound } = useRoundStore(state =>
        ({ setRoundInfo: state.setRoundInfo, creatingRound: state.creatingRound }))
    const [course, setCourse] = useState<Course | null>(null)
    const router = useRouter()

    return (
        <View style={styles.container}>
            <BackButton onPress={() => setCreatingCustom(false)} />

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
export default CustomCourseForm