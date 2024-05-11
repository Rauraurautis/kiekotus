import React, { FC, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useRoundStore } from '../../store/roundStore'
import { ScoreButton } from '../../components/round/ScoreButton'
import Scoreboard from '../../components/round/Scoreboard'
import PlayerInfo from '../../components/round/PlayerInfo'
import ScoreButtons from '../../components/round/ScoreButtons'
import { AntDesign } from '@expo/vector-icons';
import HoleInfo from '../../components/round/HoleInfo'

const RoundPage = ({ }) => {
    const { roundInfo, setRoundInfo } = useRoundStore()
    const [holeNumber, setHoleNumber] = useState(0)
    const [displayedPlayer, setDisplayedPlayer] = useState(0)
    const [displayScoreboard, setDisplayScoreboard] = useState(false)

    if (!roundInfo) {
        return null
    }

    const { course, players } = roundInfo
    const { holes } = course

    const playerScore: number = players[displayedPlayer].scores[holeNumber]
    const par = holes[holeNumber].par

    const lastScore = holeNumber + 1 === holes.length && displayedPlayer + 1 === players.length
        && roundInfo.players[roundInfo.players.length - 1].scores[holeNumber] !== undefined
        
    return (
        <View style={styles.container}>
            {displayScoreboard && <Scoreboard holeNumber={holeNumber} roundInfo={roundInfo} course={course}
                setDisplayScoreboard={setDisplayScoreboard} lastScore={lastScore} />}
            <HoleInfo distance={holes[holeNumber].distance} holeNumber={holeNumber} par={par} />
            <PlayerInfo player={players[displayedPlayer].player.name} playerScore={playerScore}
                displayedPlayer={displayedPlayer} holeNumber={holeNumber} players={players} lastScore={lastScore}
                setDisplayedPlayer={setDisplayedPlayer} setHoleNumber={setHoleNumber} setDisplayScoreboard={setDisplayScoreboard} />
            <ScoreButtons displayedPlayer={displayedPlayer} holeNumber={holeNumber} holes={holes} par={par}
                players={players} roundInfo={roundInfo} setDisplayScoreboard={setDisplayScoreboard}
                setDisplayedPlayer={setDisplayedPlayer} setHoleNumber={setHoleNumber} setRoundInfo={setRoundInfo} lastScore={lastScore} />
            {lastScore ?
                <TouchableOpacity style={styles.finishButton}>
                    <Text style={styles.finishText} onPress={() => setDisplayScoreboard(true)}>Lopputulokset</Text>
                </TouchableOpacity> :
                <TouchableOpacity style={styles.resultButton} onPress={() => setDisplayScoreboard(true)}>
                    <View style={styles.leaderboard}><Text><AntDesign name="profile" size={50} /></Text><Text>Tulostaulu</Text></View>
                </TouchableOpacity >}

        </View >
    )
}

export default RoundPage

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
    resultButton: {
        borderRadius: 20,
        display: "flex",
        position: "absolute",
        right: 0,
        bottom: 10,
        justifyContent: "center",
        alignItems: "center",
        width: 100
    },
    leaderboard: {
        alignItems: "center"
    },
    finishButton: {
        backgroundColor: "#61BCFA",
        borderRadius: 20,
        position: "absolute",
        bottom: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        width: 200,
        margin: 5
    },
    finishText: {
        fontSize: 20
    }
})