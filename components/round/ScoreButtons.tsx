import { FC, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useRoundStore } from '../../store/roundStore'
import { ScoreButton } from '../../components/round/ScoreButton'
import Scoreboard from '../../components/round/Scoreboard'
import FairwayInfo from './HoleInfo'
import PlayerInfo from '../../components/round/PlayerInfo'
import { Hole, RoundInfo, RoundPlayer } from '../../lib/types'

interface ScoreButtonsProps {
    displayedPlayer: number
    roundInfo: RoundInfo | null
    holeNumber: number
    players: RoundPlayer[]
    holes: Hole[]
    par: number
    lastScore: boolean
    setRoundInfo: (roundInfo: RoundInfo) => void
    setDisplayScoreboard: React.Dispatch<React.SetStateAction<boolean>>
    setHoleNumber: React.Dispatch<React.SetStateAction<number>>
    setDisplayedPlayer: React.Dispatch<React.SetStateAction<number>>
}

const ScoreButtons: FC<ScoreButtonsProps> = ({ displayedPlayer, roundInfo, holeNumber, players, holes,
    setRoundInfo, setDisplayedPlayer, setHoleNumber }) => {

    if (!roundInfo) {
        return null
    }

    const handleScorePress = (playerIndex: number, score?: number) => {
        if (score === undefined) {
            console.log(score)
            return
        }
        setRoundInfo({
            ...roundInfo, players: roundInfo.players.map((player, i) => {
                if (i !== playerIndex) return { ...player }
                player.scores.splice(holeNumber, 1, score)
                return ({ ...player })
            })
        })
        if (displayedPlayer + 1 === players.length) {
            if (holeNumber + 1 === holes.length) {
                return
            }
            setHoleNumber(prev => prev + 1)
            setDisplayedPlayer(0)
        } else {
            setDisplayedPlayer(prev => prev + 1)
        }
    }

    return (
        <View style={styles.scoreContainer}>
            <ScoreButton handleScorePress={handleScorePress} playerIndex={displayedPlayer} text='-...' customScoreStyle='minus' />
            <ScoreButton handleScorePress={handleScorePress} score={-1} playerIndex={displayedPlayer} text='-1' />
            <ScoreButton handleScorePress={handleScorePress} score={0} playerIndex={displayedPlayer} text='0' />
            <ScoreButton handleScorePress={handleScorePress} score={1} playerIndex={displayedPlayer} text='+1' />
            <ScoreButton handleScorePress={handleScorePress} playerIndex={displayedPlayer} text='+...' customScoreStyle='plus' />
        </View>
    )
}

export default ScoreButtons

const styles = StyleSheet.create({
    scoreContainer: {
        flexDirection: "row",
        width: "90%",
        justifyContent: "space-around",
        marginBottom: 40,
        gap: 20
    },
    finishButton: {
        backgroundColor: "#61BCFA",
        borderRadius: 20,
        position: "absolute",
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        width: 200,
        margin: 5
    },
    text: {
        fontSize: 20
    },
    scoreButtonContainer: {
        flexDirection: "row",

    }
})