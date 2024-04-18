import { FC, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useRoundStore } from '../../store/roundStore'
import { ScoreButton } from '../../components/round/ScoreButton'
import Scoreboard from '../../components/round/Scoreboard'

interface RoundProps {

}

const Round: FC<RoundProps> = ({ }) => {
    const { roundInfo, setRoundInfo } = useRoundStore()
    const [holeNumber, setHoleNumber] = useState(0)
    const [displayedPlayer, setDisplayedPlayer] = useState(0)
    const [displayScoreboard, setDisplayScoreboard] = useState(false)

    if (!roundInfo) {
        return null
    }

    const { course, players } = roundInfo
    const { holes, title } = course

    const playerScore: number = players[displayedPlayer].scores[holeNumber]
    const par = holes[holeNumber].par

    const handleScorePress = (playerIndex: number, score?: number) => {
        if (score === undefined) {
            return
        }

        setRoundInfo({
            ...roundInfo, players: roundInfo.players.map((player, i) => {
                if (i !== playerIndex) return { ...player }
                player.scores.splice(holeNumber, 1, score + par)
                return ({ ...player })
            })
        })
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

    const handleBackPress = () => {
        if (displayedPlayer === 0) {
            setHoleNumber(prev => prev - 1)
            setDisplayedPlayer(players.length - 1)
            return
        }
        setDisplayedPlayer(prev => prev - 1)
    }

    const handleNextPress = () => {
        if (displayedPlayer === players.length - 1) {
            setHoleNumber(prev => prev + 1)
            setDisplayedPlayer(0)
            return
        }
        setDisplayedPlayer(prev => prev + 1)
    }

    return (
        <View style={styles.container}>
            {displayScoreboard && <Scoreboard roundInfo={roundInfo} course={course} />}
            <View style={styles.fairwayInfo}>
                <Text style={styles.text}>Väylä {holeNumber + 1}</Text>
                <Text style={styles.text}>Par {par}</Text>
                <Text style={styles.text}>{holes[holeNumber].distance}m</Text>
            </View>
            <View>
                <Text style={styles.text}>{players[displayedPlayer].player.name}</Text>
                <Text style={styles.text}>{playerScore > par && "+"}{playerScore && (playerScore - par) + ""}</Text>
                {(holeNumber > 0 || displayedPlayer > 0) &&
                    <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
                        <Text>Takaisin</Text>
                    </TouchableOpacity>}
                {(holeNumber !== holes.length && displayedPlayer !== players.length) &&
                    <TouchableOpacity style={styles.backButton} onPress={handleNextPress}>
                        <Text>Seuraava</Text>
                    </TouchableOpacity>}
            </View>
            <View style={styles.scoreContainer}>
                <ScoreButton handleScorePress={handleScorePress} playerIndex={displayedPlayer} text='-...' customScoreStyle='minus' />
                <ScoreButton handleScorePress={handleScorePress} score={-1} playerIndex={displayedPlayer} text='-1' />
                <ScoreButton handleScorePress={handleScorePress} score={0} playerIndex={displayedPlayer} text='0' />
                <ScoreButton handleScorePress={handleScorePress} score={1} playerIndex={displayedPlayer} text='+1' />
                <ScoreButton handleScorePress={handleScorePress} playerIndex={displayedPlayer} text='+...' customScoreStyle='plus' />
            </View>
            <TouchableOpacity onPress={() => setDisplayScoreboard(prev => !prev)}>
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
    },
    backButton: {

        left: 5,
        top: "50%",
        transform: [{ translateY: -35 }]
    }
})