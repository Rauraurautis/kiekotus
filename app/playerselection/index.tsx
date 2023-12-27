import { FC, useEffect, useState } from 'react'
import { FlatList, SafeAreaView, TextComponent, View, Text, StyleSheet, TouchableOpacity, Keyboard } from 'react-native'
import NewNonregisteredFriendForm from '../../components/user/NewNonregisteredFriendForm'
import { useAppStateStore } from '../../store/appStateStore'
import { useRoundStore } from '../../store/roundStore'
import { Friend, RoundPlayer } from '../../lib/types'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'expo-router'

interface PlayerSelectionProps {

}

const mockPlayers = ["Kalle", "Ande", "Pekka", "Jorma", "Kallfsee", "Anfsede", "Pekfseka", "Joserma"]

const PlayerSelection: FC<PlayerSelectionProps> = ({ }) => {
    const { friends, getAllFriends } = useAppStateStore()
    const { roundInfo, setRoundInfo } = useRoundStore()
    const [selectedFriends, setSelectedFriends] = useState<Friend[]>([])
    const [addingFriend, setAddingFriend] = useState(false)
    const router = useRouter()

    useEffect(() => {
        getAllFriends()
    }, [])

    const setPlayers = (clickedFriend: Friend) => {
        if (selectedFriends.some(selectedFriend => selectedFriend.id === clickedFriend.id)) {
            setSelectedFriends(selectedFriends.filter(selectedFriend => selectedFriend.id !== clickedFriend.id))
        } else {
            setSelectedFriends(prev => ([...prev, clickedFriend]))
        }
    }

    const startRoundHandler = () => {
        const roundPlayers: RoundPlayer[] = selectedFriends.map(friend => ({ player: friend, scores: [] as Number[] }))
        setRoundInfo({ course: roundInfo!.course, players: roundPlayers })
        router.push({ pathname: "/round" })
    }

    return (
        <View style={styles.container}>
            {addingFriend && <NewNonregisteredFriendForm setAddingFriend={setAddingFriend} />}
            <FlatList
                data={friends}
                renderItem={({ item }) =>
                    <TouchableOpacity style={selectedFriends.some(selectedFriend => selectedFriend.id === item.id) ? styles.playerCardSelected : styles.playerCard} onPress={() => setPlayers(item)}>
                        <Text style={styles.text}>{item.name}</Text>
                    </TouchableOpacity>}
                keyExtractor={item => item.id + ""}
                style={styles.playerList}
            />
            <View style={styles.buttonContainer}>

                <>
                    <TouchableOpacity style={styles.button} onPress={() => setAddingFriend(prev => !prev)}>
                        <Text style={styles.text}>Lisää uusi pelaaja</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={selectedFriends.length > 0 ? styles.button : styles.notReadyButton} onPress={() => startRoundHandler()}>
                        <Text style={styles.text}>Aloita kierros</Text>
                    </TouchableOpacity>
                </>

            </View>

        </View>
    )
}

export default PlayerSelection

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        width: "100%",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        gap: 5,

    },
    playerList: {
        width: "90%",
        marginTop: 50,
        flex: 1
    },
    playerCard: {
        height: 80,
        backgroundColor: "#E8E8E8",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 5
    },
    playerCardSelected: {
        height: 80,
        backgroundColor: "#C0C0C0",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 5
    },
    text: {
        fontSize: 20,
        fontWeight: "600"
    },
    buttonContainer: {
        flex: 0.5,
        width: "90%",
        justifyContent: "space-around",
        alignItems: "center",

    },
    button: {
        backgroundColor: "#7198FC",
        paddingVertical: 20,
        width: "80%",
        alignItems: "center",
        borderRadius: 20
    },
    notReadyButton: {
        backgroundColor: "#C0C0C0",
        paddingVertical: 20,
        width: "80%",
        alignItems: "center",
        borderRadius: 20
    }
})