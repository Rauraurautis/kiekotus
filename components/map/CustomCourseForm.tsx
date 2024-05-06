import { FC, useEffect, useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, FlatList, TextInput, GestureResponderEvent } from 'react-native'
import BackButton from '../ui/BackButton';
import Toast from 'react-native-toast-message';
import { useRoundStore } from '../../store/roundStore';
import { useRouter } from 'expo-router';
import { CustomCourse } from '../../lib/types';



interface CustomCourseFormProps {
    setCreatingCustom: React.Dispatch<React.SetStateAction<boolean>>
}

const CustomCourseForm: FC<CustomCourseFormProps> = ({ setCreatingCustom }) => {
    const { setRoundInfo, creatingRound } = useRoundStore(state =>
        ({ setRoundInfo: state.setRoundInfo, creatingRound: state.creatingRound }))
    const [fairways, setFairways] = useState<number[]>([])
    const [input, setInput] = useState("")
    const router = useRouter()

    const addFairway = () => {
        if (Number(input)) {
            setFairways(prev => [...prev, Number(input)])
            setInput("")
        } else {
            Toast.show({ type: "error", text1: "Väärä muoto väylälle, laitathan vain numeroita." })
        }
    }

    const handlePlayerSelectionPress = () => {
        const course: CustomCourse = { name: "Custom rata", holes: fairways.map(fw => ({ distance: 0, par: fw })) }
        setRoundInfo({ course, players: [] })
        router.push({ pathname: "/playerselection" })
    }

    return (
        <View style={styles.container}>
            <BackButton onPress={() => setCreatingCustom(false)} />
            <View style={styles.newCourseContainer}>
                <FlatList data={fairways} renderItem={({ item }) => <View>{item}</View>} />
                <TextInput value={input} onChangeText={(txt) => setInput(txt)} />
                <TouchableOpacity onPress={addFairway}>
                    <Text>Lisää väylä</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.playerChooseButton}
                    onPress={() => handlePlayerSelectionPress()} >
                    <Text>Pelaajavalinta</Text>
                </TouchableOpacity>
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
    newCourseContainer: {
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