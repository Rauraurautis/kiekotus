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


    return (
        <View style={styles.container}>
            <StatusBar style='light' backgroundColor='black' />
            {showFriends && <FriendList user={user} setShowFriends={setShowFriends} />}
            {showRounds && <PlayedRounds user={user} setShowRounds={setShowRounds} />}
            <BackButton onPress={() => router.push("/")} />
            <View style={styles.userInfoContainer}>
                <Text>{user?.user}</Text>
                <Text>{user?.email}</Text>
            </View>
            <TouchableOpacity>
                <Text>Kaverilista</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text>Pelatut kierrokset</Text>
            </TouchableOpacity>

        </View>
    )
}

export default Profile


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        alignItems: 'center',
        paddingTop: 80,
        paddingBottom: 50,

    },
    userInfoContainer: {
        width: "90%",
        flex: 0.2,
        backgroundColor: "white"
    },
    userFriendsContainer: {
        width: "90%",
        flex: 0.2,
        backgroundColor: "white"
    }
})