import { FC, useEffect, useState } from 'react'
import { ImportedCourseData, RoundPlayer, User } from '../../../lib/types'
import BackButton from '../../ui/BackButton'
import { StatusBar } from 'expo-status-bar'
import { View, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native'
import SinglePlayerScores from '../../round/SinglePlayerScores'


interface RoundDataProps {
    displayedRound: ImportedCourseData,
    setDisplayedRound: React.Dispatch<React.SetStateAction<ImportedCourseData | null | undefined>>
}

const RoundData: FC<RoundDataProps> = ({ displayedRound, setDisplayedRound }) => {
    const [selectedPlayer, setSelectedPlayer] = useState<RoundPlayer | null>(null)
    const parsedPlayers: RoundPlayer[] = JSON.parse(displayedRound.roundPlayers)

    if (selectedPlayer) {
        return <SinglePlayerScores selectedPlayer={selectedPlayer} setSelectedPlayer={setSelectedPlayer} />
    }

    return (
        <View style={styles.playedRoundsContainer}>
            <StatusBar style='light' backgroundColor='black' />
            <BackButton onPress={() => setDisplayedRound(null)} />
            <View style={styles.header}>
                <Text style={styles.title}>{displayedRound.course ? displayedRound.course.name : "Custom rata"}</Text>
                <Text style={styles.text}>{displayedRound.createdAt}</Text>
            </View>
            <View style={styles.roundListContainer}>
                <Text style={styles.text}>Lopputulokset</Text>
                <FlatList data={parsedPlayers} renderItem={({ item }) => {
                    const finalScore = item.scores.reduce((a, b) => a + b, 0)
                    return (
                        <TouchableOpacity style={styles.roundButton}>
                            <Text style={styles.text}>{item.player.name}</Text>
                            <Text style={styles.text}>{finalScore > 0 && "+"}{finalScore}</Text>
                        </TouchableOpacity>
                    )
                }} style={styles.list} />
            </View>
        </View>



    )
}

export const styles = StyleSheet.create({
    playedRoundsContainer: {
        width: "80%",
        flex: 0.8,
        backgroundColor: "white",
        paddingTop: 25,
        gap: 10
    },
    roundButton: {
        width: "100%",
        backgroundColor: "#f3fcfd",
        margin: 5,
        padding: 10,
    },
    roundListContainer: {
        height: "90%",
        alignItems: "center",
        width: "100%"
    },
    list: {
        width: "90%"
    },
    header: {

        width: "100%",
        alignItems: "center"
    },
    subheader: {
        alignItems: "center"
    },
    line: {
        height: 1,
        backgroundColor: "black",
        width: "90%"
    },
    friend: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        width: "100%",
        backgroundColor: "green"
    },
    text: {
        fontSize: 18
    },
    title: {
        fontSize: 25,
        fontWeight: "bold"
    },

})

export default RoundData