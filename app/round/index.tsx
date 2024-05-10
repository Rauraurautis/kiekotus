import { FC, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useRoundStore } from '../../store/roundStore'
import { ScoreButton } from '../../components/round/ScoreButton'
import Scoreboard from '../../components/round/Scoreboard'
import FairwayInfo from '../../components/round/FairwayInfo'
import PlayerInfo from '../../components/round/PlayerInfo'
import ScoreButtons from '../../components/round/ScoreButtons'

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

    return (
        <View style={styles.container}>
            {displayScoreboard && <Scoreboard roundInfo={roundInfo} course={course} />}
            <FairwayInfo distance={holes[holeNumber].distance} holeNumber={holeNumber} par={par} />
            <PlayerInfo player={players[displayedPlayer].player.name} playerScore={playerScore} par={par}
                displayedPlayer={displayedPlayer} holeNumber={holeNumber} holes={holes} players={players}
                setDisplayedPlayer={setDisplayedPlayer} setHoleNumber={setHoleNumber} />
            <ScoreButtons displayedPlayer={displayedPlayer} holeNumber={holeNumber} holes={holes} par={par}
                players={players} roundInfo={roundInfo} setDisplayScoreboard={setDisplayScoreboard}
                 setDisplayedPlayer={setDisplayedPlayer} setHoleNumber={setHoleNumber} setRoundInfo={setRoundInfo} />
            <TouchableOpacity onPress={() => setDisplayScoreboard(prev => !prev)}>
                <Text>Tulokset</Text>
            </TouchableOpacity>
        </View>
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
    backButton: {

        left: 5,
        top: "50%",
        transform: [{ translateY: -35 }]
    }
})