import { FC } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { Course, RoundInfo } from '../../lib/types'

interface ScoreboardProps {
    roundInfo: RoundInfo
    course: Course
}

const Scoreboard: FC<ScoreboardProps> = ({ roundInfo, course }) => {
    return (
        <View>
            <FlatList
                data={roundInfo.players}
                renderItem={({ item }) =>
                    <TouchableOpacity>
                        <Text style={styles.text}>{item.player.name}</Text>
                    </TouchableOpacity>}
                keyExtractor={item => item.player.id + ""}
                style={styles.playerList}
            />
        </View>
    )
}

export default Scoreboard

export const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        width: "100%",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        gap: 5,

    },
    playerList: {
        width: "90%",
        marginTop: 50,
        flex: 1
    },
    playerCard: {
        height: 80,
        backgroundColor: "#E8E8E8",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 5
    },
    playerCardSelected: {
        height: 80,
        backgroundColor: "#C0C0C0",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 5
    },
    text: {
        fontSize: 20,
        fontWeight: "600"
    },
    buttonContainer: {
        flex: 0.5,
        width: "90%",
        justifyContent: "space-around",
        alignItems: "center",

    },
    button: {
        backgroundColor: "#7198FC",
        paddingVertical: 20,
        width: "80%",
        alignItems: "center",
        borderRadius: 20
    },
    notReadyButton: {
        backgroundColor: "#C0C0C0",
        paddingVertical: 20,
        width: "80%",
        alignItems: "center",
        borderRadius: 20
    }
})