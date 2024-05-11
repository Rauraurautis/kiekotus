import { FC, useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { Course, CustomCourse, RoundInfo, RoundPlayer } from '../../lib/types'
import SinglePlayerScores from './SinglePlayerScores'
import BackButton from '../ui/BackButton'
import SaveRoundDialog from './SaveRoundDialog'

interface ScoreboardProps {
    roundInfo: RoundInfo
    course: Course | CustomCourse
    holeNumber: number
    lastScore: boolean
    setDisplayScoreboard: React.Dispatch<React.SetStateAction<boolean>>
}

const countScore = (scores: number[]) => {
    const score = scores.reduce((a, b) => a + b, 0)
    return score > 0 ? `+${score}` : score
}

const Scoreboard: FC<ScoreboardProps> = ({ roundInfo, course, setDisplayScoreboard, lastScore }) => {
    const [selectedPlayer, setSelectedPlayer] = useState<RoundPlayer | null>(null)
    const [displaySaveRoundDialog, setDisplaySaveRoundDialog] = useState(false)

    if (selectedPlayer) {
        return <SinglePlayerScores selectedPlayer={selectedPlayer} setSelectedPlayer={setSelectedPlayer} />
    }

    if (displaySaveRoundDialog) {
        return <SaveRoundDialog roundInfo={roundInfo} />
    }

    return (
        <View style={styles.scoreboardContainer}>
            <BackButton onPress={() => setDisplayScoreboard(false)} />
            <Text style={styles.title}>{course.name}</Text>
            <View style={styles.resultContainer}>
                {lastScore && <Text style={styles.text}>Lopputulokset</Text>}
                <FlatList
                    data={roundInfo.players}
                    renderItem={({ item, index }) =>
                        <TouchableOpacity style={styles.playerCard} onPress={() => setSelectedPlayer(item)}>
                            <Text style={styles.text}>{item.player.name}</Text><Text style={styles.text}>{countScore(roundInfo.players[index].scores)}</Text>
                        </TouchableOpacity>}
                    keyExtractor={item => item.player.id + ""}
                    style={styles.playerList}
                />
            </View>
            {lastScore && <TouchableOpacity style={styles.finishButton} onPress={() => setDisplaySaveRoundDialog(true)}>
                <Text>Lopeta kierros</Text>
            </TouchableOpacity>}
        </View>
    )
}

export default Scoreboard

export const styles = StyleSheet.create({
    scoreboardContainer: {
        width: "90%",
        flex: 1,
        backgroundColor: "#e6f2fe",
        position: "absolute",
        top: 100,
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
    },
    resultContainer: {
        width: "90%",
        padding: 30,
        alignItems: "center"
    },
    playerList: {
        width: "100%",
        marginTop: 50,
        flex: 1,
        maxHeight: 250
    },
    text: {
        fontSize: 20,
    },
    title: {
        fontSize: 25,
        padding: 10
    },
    playerCard: {
        height: 60,
        backgroundColor: "#b7dafc",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginVertical: 5,
    },
    finishButton: {
        backgroundColor: "#61BCFA",
        borderRadius: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        width: 200,
        margin: 20

    }

})