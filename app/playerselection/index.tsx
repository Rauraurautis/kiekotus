import { FC, useEffect, useState } from 'react'
import { FlatList, SafeAreaView, TextComponent, View, Text, StyleSheet, TouchableOpacity, Keyboard } from 'react-native'
import NewNonregisteredFriendForm from '../../components/round/NewNonregisteredFriendForm'
import { useAppStateStore } from '../../store/appStateStore'
import { useRoundStore } from '../../store/roundStore'
import { Friend, RoundPlayer } from '../../lib/types'
import { useQuery } from '@tanstack/react-query'
import * as SecureStore from "expo-secure-store"
import { styles } from './styles'
import { useRouter } from 'expo-router'
import { useAuthStore } from '../../store/authStore'
import { getUserFriends } from '../../services/userService'




const PlayerSelection = ({ }) => {
    const { roundInfo, setRoundInfo } = useRoundStore(state => ({ roundInfo: state.roundInfo, setRoundInfo: state.setRoundInfo }))
    const [friends, setFriends] = useState<Friend[]>([])
    const { user } = useAuthStore(state => ({ user: state.user }))
    const [selectedFriends, setSelectedFriends] = useState<Friend[]>([])
    const [addingFriend, setAddingFriend] = useState(false)
    const router = useRouter()

    useEffect(() => {
        getUserFriends().then(data => setFriends(data))
    }, [])

    const setPlayers = (clickedFriend: Friend) => {
        if (selectedFriends.some(selectedFriend => selectedFriend.id === clickedFriend.id)) {
            setSelectedFriends(selectedFriends.filter(selectedFriend => selectedFriend.id !== clickedFriend.id))
        } else {
            setSelectedFriends(prev => ([...prev, clickedFriend]))
        }
    }

    const startRoundHandler = () => {
        const roundPlayers: RoundPlayer[] = selectedFriends.map(friend => ({ player: friend, scores: [] as number[] }))
        if (user) {
            setRoundInfo({ course: roundInfo!.course, players: [...roundPlayers, { player: { id: Number(user.id), name: user.user }, scores: [] }] })
        }
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
                    <TouchableOpacity style={selectedFriends.length > 0 ? styles.button : styles.notReadyButton} disabled={selectedFriends.length === 0} onPress={() => startRoundHandler()}>
                        <Text style={styles.text}>Aloita kierros</Text>
                    </TouchableOpacity>
                </>
            </View>

        </View>
    )
}

export default PlayerSelection

