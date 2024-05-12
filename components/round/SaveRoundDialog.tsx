import { FC } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Round, RoundInfo } from '../../lib/types'
import { useRouter } from 'expo-router'
import { addPlayedRound, addUserRound } from '../../services/userService'
import { useAuthStore } from '../../store/authStore'
import Toast from 'react-native-toast-message'



interface SaveRoundDialogProps {
    roundInfo: RoundInfo
}

const SaveRoundDialog: FC<SaveRoundDialogProps> = ({ roundInfo }) => {
    const user = useAuthStore(state => state.user)
    const router = useRouter()

    const submitData = async () => {
        try {
            if (user) {
                if (roundInfo.course.id !== 0) {
                    await addPlayedRound(user?.id, roundInfo.course.id)
                }
                router.push("/")
            }
        } catch (error) {
            Toast.show({ text1: "Error sending data to server!", type: "error" })
        }
    }

    const submitPlayedRound = async () => {
        if (user) {
            try {
                const roundPlayers = roundInfo.players.map(p =>
                    ({ name: p.player.name, scores: p.scores }))
                const roundData: Round = { courseId: roundInfo.course.id ?? 0, courseName: roundInfo.course.name, roundPlayers }
                await addUserRound(user?.id, roundData)
                await submitData()
            } catch (error) {
                Toast.show({ text1: "Error sending data to server!", type: "error" })
            }
        }
    }

    return (
        <View style={styles.scoreboardContainer}>
            <Text style={styles.title}>Tallennetaanko kierros?</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonStyle} onPress={async () => submitPlayedRound()}>
                    <Text>Kyllä</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonStyle} onPress={async () => submitData()}>
                    <Text>Ei</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SaveRoundDialog

export const styles = StyleSheet.create({
    scoreboardContainer: {
        width: "90%",
        flex: 1,
        backgroundColor: "#e6f2fe",
        position: "absolute",
        top: 200,
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        padding: 20
    },
    buttonContainer: {
        width: "90%",
        padding: 30,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    title: {
        fontSize: 25,
        padding: 10
    },
    buttonStyle: {
        backgroundColor: "#61BCFA",
        borderRadius: 20,
        width: 75,
        height: 50,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        margin: 5
    }

})