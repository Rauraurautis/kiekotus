import { FC, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useRoundStore } from '../../store/roundStore'
import { ScoreButton } from '../../components/round/ScoreButton'
import Scoreboard from '../../components/round/Scoreboard'
import FairwayInfo from '../../components/round/FairwayInfo'
import { Hole, RoundPlayer } from '../../lib/types'
interface PlayerInfoProps {
    player: string
    players: RoundPlayer[]
    holes: Hole[]
    playerScore: number
    par: number
    displayedPlayer: number
    holeNumber: number
    setDisplayedPlayer: React.Dispatch<React.SetStateAction<number>>
    setHoleNumber: React.Dispatch<React.SetStateAction<number>>

}

const PlayerInfo: FC<PlayerInfoProps> = ({ player, players, holes, playerScore, par, displayedPlayer,
    holeNumber, setDisplayedPlayer, setHoleNumber }) => {

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
        <>
            <View>
                <Text style={styles.text}>{player}</Text>
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
        </>
    )
}

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

export default PlayerInfo