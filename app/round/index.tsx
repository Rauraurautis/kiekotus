import { FC, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useRoundStore } from '../../store/roundStore'
import { ScoreButton } from '../../components/round/ScoreButton'
import { CustomScoreForm } from '../../components/round/CustomScoreForm'

interface RoundProps {

}

const Round: FC<RoundProps> = ({ }) => {
    const { roundInfo, setRoundInfo } = useRoundStore()
    const [holeNumber, setHoleNumber] = useState(0)
    const [displayedPlayer, setDisplayedPlayer] = useState(0)
    const [customFormDisplay, setCustomFormDisplay] = useState(false)

    if (!roundInfo) {
        return null
    }

    const { course, players } = roundInfo
    const { holes, title } = course

    const handleScorePress = (playerIndex: number, score?: number) => {

        if (score === undefined) {
           
            return
        }

        setRoundInfo({ ...roundInfo, players: roundInfo.players.map((player, i) => ({ ...player, scores: i === playerIndex ? [...player.scores, score + holes[holeNumber].par] : [...player.scores] })) })
        if (displayedPlayer + 1 === players.length) {
            if (holeNumber + 1 === holes.length) {
                // Display scoreboard
                return
            }
            setHoleNumber(prev => prev + 1)
            setDisplayedPlayer(0)
        } else {
            setDisplayedPlayer(prev => prev + 1)
        }

    }

    return (
        <View style={styles.container}>
            {customFormDisplay && <CustomScoreForm />}
            <View style={styles.fairwayInfo}>
                <Text style={styles.text}>Väylä {holeNumber + 1}</Text>
                <Text style={styles.text}>Par {holes[holeNumber].par}</Text>
                <Text style={styles.text}>{holes[holeNumber].distance}m</Text>
            </View>
            <View>
                <Text style={styles.text}>{players[displayedPlayer].player.name}</Text>
            </View>
            <View style={styles.scoreContainer}>
                <ScoreButton handleScorePress={handleScorePress} playerIndex={displayedPlayer} text='-...' customScoreStyle='minus' />
                <ScoreButton handleScorePress={handleScorePress} score={-2} playerIndex={displayedPlayer} text='-2' />
                <ScoreButton handleScorePress={handleScorePress} score={-1} playerIndex={displayedPlayer} text='-1' />
                <ScoreButton handleScorePress={handleScorePress} score={0} playerIndex={displayedPlayer} text='0' />
                <ScoreButton handleScorePress={handleScorePress} score={1} playerIndex={displayedPlayer} text='+1' />
                <ScoreButton handleScorePress={handleScorePress} score={2} playerIndex={displayedPlayer} text='+2' />
                <ScoreButton handleScorePress={handleScorePress} playerIndex={displayedPlayer} text='+...' customScoreStyle='plus' />
            </View>
            <TouchableOpacity>
                <Text>Tulokset</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Round

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        width: "100%",
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        gap: 5,
    },
    fairwayInfo: {
        alignItems: "center",
        gap: 5
    },
    text: {
        fontSize: 30
    },
    scoreContainer: {
        flexDirection: "row",
        width: "90%",
        justifyContent: "space-around"
    }
})