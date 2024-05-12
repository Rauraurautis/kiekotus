import { FC, useEffect, useState } from 'react'
import { ImportedCourseData, User } from '../../../lib/types'
import BackButton from '../../ui/BackButton'
import { StatusBar } from 'expo-status-bar'
import { View, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native'
import { getUserRounds } from '../../../services/userService'
import Toast from 'react-native-toast-message'
import RoundData from './RoundData'

interface PlayedRoundsProps {
    user: User | null
    setShowRounds: React.Dispatch<React.SetStateAction<boolean>>
}

const PlayedRounds: FC<PlayedRoundsProps> = ({ user, setShowRounds }) => {
    const [playedRounds, setPlayedRounds] = useState<ImportedCourseData[]>([])
    const [displayedRound, setDisplayedRound] = useState<ImportedCourseData | null>()

    useEffect(() => {
        if (user?.id) {
            getUserRounds(user.id).then(data => setPlayedRounds(data))
                .catch(err => {
                    Toast.show({ type: "error", text1: "Virhe näytettäessä kierroksia!" })
                })
        }
    }, [])

    if (displayedRound) {
        <RoundData setDisplayedRound={setDisplayedRound} displayedRound={displayedRound}/>
    }

    return (
        <View style={styles.playedRoundsContainer}>
            <StatusBar style='light' backgroundColor='black' />
            <BackButton onPress={() => setShowRounds(false)} />
            <View style={styles.header}>
                <Text style={styles.title}>Pelatut kierrokset</Text>
                <View style={styles.line}></View>
            </View>
            <View style={styles.roundListContainer}>
                <FlatList data={playedRounds} renderItem={({ item }) => (
                    <TouchableOpacity style={styles.roundButton}>
                        <Text style={styles.text}>{item.createdAt}</Text>
                        <Text style={styles.text}>{item.course ? item.course.name : "Custom rata"}</Text>
                    </TouchableOpacity>
                )} style={styles.list} />
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
        fontSize: 25
    },

})

export default PlayedRounds