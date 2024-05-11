import { FC, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { Hole, RoundPlayer } from '../../lib/types'
interface PlayerInfoProps {
    player: string
    players: RoundPlayer[]
    playerScore: number
    displayedPlayer: number
    holeNumber: number
    lastScore: boolean
    setDisplayedPlayer: React.Dispatch<React.SetStateAction<number>>
    setHoleNumber: React.Dispatch<React.SetStateAction<number>>
    setDisplayScoreboard: React.Dispatch<React.SetStateAction<boolean>>

}

const PlayerInfo: FC<PlayerInfoProps> = ({ player, players, playerScore, displayedPlayer,
    holeNumber, setDisplayedPlayer, setHoleNumber, lastScore }) => {

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
                <Text style={styles.text}>{playerScore && (playerScore > 0 ? `+${playerScore}` : playerScore) + ""}</Text>
                <View style={styles.navigateButtons}>
                    {(holeNumber > 0 || displayedPlayer > 0) ?
                        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
                            <Text><AntDesign name="leftcircleo" size={30} color="green" /></Text>
                        </TouchableOpacity>
                        : <TouchableOpacity disabled style={styles.backButton} onPress={handleBackPress}>
                            <Text><AntDesign name="leftcircleo" size={30} color="grey" /></Text>
                        </TouchableOpacity>}
                    {lastScore ? <TouchableOpacity style={styles.backButton} disabled>
                        <Text><AntDesign name="rightcircleo" size={30} color="grey" /></Text>
                    </TouchableOpacity> :
                        <TouchableOpacity style={styles.backButton} onPress={handleNextPress}>
                            <Text><AntDesign name="rightcircleo" size={30} color="green" /></Text>
                        </TouchableOpacity>}
                </View>
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
        fontSize: 30,
        textAlign: "center"
    },
    navigateButtons: {
        display: "flex",
        flexDirection: "row",
        width: "50%",
        justifyContent: "space-between"
    },
    scoreContainer: {
        flexDirection: "row",
        width: "90%",
        justifyContent: "space-around"
    },
    backButton: {


    }
})

export default PlayerInfo