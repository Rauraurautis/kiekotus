import { FC } from 'react'
import { RoundPlayer } from '../../lib/types'
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import { useRoundStore } from '../../store/roundStore'
import { ScoreButton } from '../../components/round/ScoreButton'
import Scoreboard from '../../components/round/Scoreboard'
import FairwayInfo from './HoleInfo'
import PlayerInfo from '../../components/round/PlayerInfo'
import ScoreButtons from '../../components/round/ScoreButtons'
import BackButton from '../ui/BackButton'


interface SinglePlayerScoresProps {
    selectedPlayer: RoundPlayer | null
    setSelectedPlayer: React.Dispatch<React.SetStateAction<RoundPlayer | null>>
}

const SinglePlayerScores: FC<SinglePlayerScoresProps> = ({ selectedPlayer, setSelectedPlayer }) => {

    const result = selectedPlayer?.scores.reduce((a, b) => a + b, 0)

    return (
        <View style={styles.scoreboardContainer}>
            <BackButton onPress={() => setSelectedPlayer(null)} />
            <Text style={styles.title}>Pelaajan {selectedPlayer?.player.name} kortti</Text>
            <View style={styles.resultContainer}>
                <FlatList
                    data={selectedPlayer?.scores}
                    renderItem={({ item, index }) =>
                        <View style={styles.scoreCard}>
                            <Text style={styles.text}>Väylä {index + 1}</Text>
                            <Text style={styles.text}>{item > 0 && "+"}{item}</Text>
                        </View>}
                    keyExtractor={item => (item + Math.floor(Math.random() * 1000)) + ""}
                    style={styles.playerList}
                />
            </View>
            <Text style={styles.text}>Kokonaistulos {result! > 0 ? `+${result}` : result}</Text>
        </View>
    )
}

export default SinglePlayerScores

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
        padding: 20
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
    scoreCard: {
        padding: 5,
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

