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
    const { setRoundInfo } = useRoundStore(state =>
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
            <Toast />
            <BackButton onPress={() => setCreatingCustom(false)} />
            <View style={styles.newCourseContainer}>
                <FlatList data={fairways} renderItem={({ item, index }) =>
                    <View><Text style={styles.fairwayText}>Väylä {index + 1}: Par {item}</Text></View>} />
                <View style={styles.inputContainer}>
                    <Text style={styles.inputText}>Väylä {fairways.length + 1}: Par </Text>
                    <TextInput value={input} style={styles.inputText} onChangeText={(txt) => setInput(txt)}
                        keyboardType='numeric' autoFocus />
                </View>
                <TouchableOpacity onPress={addFairway} style={styles.addFairwayButton}>
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
        flex: 0.5,
        minHeight: 230,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 30,
        backgroundColor: "white",
        width: 280,
        position: "relative",
        zIndex: 0
    },
    newCourseContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 5
    },
    fairwayText: {
        fontSize: 15,
        fontWeight: "bold"
    },
    inputContainer: {
        display: "flex",
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center"
    },
    inputText: {
        fontSize: 20
    },
    playerChooseButton: {
        backgroundColor: "#7198FC",
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 50
    },
    addFairwayButton: {
        backgroundColor: "#4db8ff",
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 50
    }

})
export default CustomCourseForm