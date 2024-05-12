import { FC, useEffect, useState } from 'react'
import { FlatList, SafeAreaView, TextComponent, View, Text, StyleSheet, TouchableOpacity, Keyboard, Button } from 'react-native'
import { useAuthStore } from '../../store/authStore'
import { StatusBar } from 'expo-status-bar'
import db from '../../lib/sqLite/SQliteSetup'
import { executeInsertQuery, executeSelectQuery } from '../../lib/sqLite/friends'
import { useRouter } from 'expo-router'
import BackButton from '../../components/ui/BackButton'
import FriendList from '../../components/profile/friends/FriendList'
import PlayedRounds from '../../components/profile/rounds/PlayedRounds'


interface ProfileProps {

}


const Profile: FC<ProfileProps> = ({ }) => {
    const user = useAuthStore(state => state.user)
    const router = useRouter()
    const [showFriends, setShowFriends] = useState(false)
    const [showRounds, setShowRounds] = useState(false)

    useEffect(() => {

    }, [])

    if (showFriends) {
        return <FriendList user={user} setShowFriends={setShowFriends} />
    }

    if (showRounds) {
        return <PlayedRounds user={user} setShowRounds={setShowRounds} />
    }

    return (
        <View style={styles.container}>
            <StatusBar style='light' backgroundColor='black' />
            <BackButton onPress={() => router.push("/")} />
            <View style={styles.header}>
                <Text style={styles.title}>Profiili</Text>
                <View style={styles.line} />
            </View>
            <View style={styles.userInfoContainer}>
                <Text style={styles.text}>{user?.user}</Text>
                <Text style={styles.text}>{user?.email}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => setShowFriends(true)}>
                <Text style={styles.buttonText}>Kaverilista</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setShowRounds(true)}>
                <Text style={styles.buttonText}>Pelatut kierrokset</Text>
            </TouchableOpacity>

        </View>
    )
}

export default Profile


export const styles = StyleSheet.create({
    container: {
        flex: 0.4,
        width: "75%",
        alignItems: 'center',
        paddingTop: 80,
        paddingBottom: 50,
        backgroundColor: "white"

    },
    header: {
        position: "absolute",
        top: 25,
        width: "100%",
        alignItems: "center"
    },
    userInfoContainer: {
        width: "90%",
        height: 100,
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: "#eae9ff"
    },
    userFriendsContainer: {
        width: "90%",
        flex: 0.2,
        backgroundColor: "white"
    },
    line: {
        height: 1,
        backgroundColor: "black",
        width: "90%"
    },
    text: {
        fontSize: 18
    },
    title: {
        fontSize: 25
    },
    button: {
        backgroundColor: "#2E4153",
        paddingVertical: 20,
        width: "90%",
        marginTop: 15,
        alignItems: "center"
    },
    buttonText: {
        color: "white",
        fontSize: 25
    }
})