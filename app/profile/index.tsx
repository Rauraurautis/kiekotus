import { FC, useEffect, useState } from 'react'
import { FlatList, SafeAreaView, TextComponent, View, Text, StyleSheet, TouchableOpacity, Keyboard, Button } from 'react-native'
import { useAuthStore } from '../../store/authStore'
import { StatusBar } from 'expo-status-bar'
import db from '../../lib/sqLite/SQliteSetup'
import { executeInsertQuery, executeSelectQuery } from '../../lib/sqLite/friends'


interface ProfileProps {

}


const Profile: FC<ProfileProps> = ({ }) => {
    const user = useAuthStore(state => state.user)
    const [friends, setFriends] = useState<{ id: number, name: string }[]>([])

    useEffect(() => {

        executeSelectQuery("SELECT * FROM Friend UNION SELECT * FROM Nonregistered_friend").then(data => setFriends(data))


    }, [])


    return (
        <View style={styles.container}>
            <StatusBar style='light' backgroundColor='black' />
            <View style={styles.userInfoContainer}>
                <Text>{user?.user}</Text>
                <Text>{user?.email}</Text>
                <TouchableOpacity onPress={() => executeInsertQuery("Rauli")}><Text>add</Text></TouchableOpacity>
            </View>
            {/* friends */}
            <View style={styles.userFriendsContainer}>
                <FlatList
                    data={friends}
                    renderItem={({ item }) => (
                        <View>
                            <Text>{item.name}</Text>
                        </View>
                    )} />

            </View>
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