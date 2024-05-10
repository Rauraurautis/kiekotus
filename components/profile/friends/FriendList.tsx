import { FC, useEffect, useState } from 'react'
import { Friend, User } from '../../../lib/types'
import BackButton from '../../ui/BackButton'
import { StatusBar } from 'expo-status-bar'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { getUserFriends } from '../../../services/userService'
import Toast from 'react-native-toast-message'
import DeleteDialog from './deleteDialog'
import ApproveDialog from './approveDialog'

interface FriendListProps {
    user: User | null
    setShowFriends: React.Dispatch<React.SetStateAction<boolean>>
}

const FriendList: FC<FriendListProps> = ({ user, setShowFriends }) => {
    const [friends, setFriends] = useState<Friend[]>([])
    const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null)
    const [showDelete, setShowDelete] = useState(false)
    const [showApprove, setShowApprove] = useState(false)


    useEffect(() => {
        if (user?.id) {
            getUserFriends(user.id).then(data => setFriends(data)).catch(error => {
                Toast.show({ type: "error", text1: "Virhe näytettäessä kavereita!" })
            })
        }
    }, [])

    return (
        <View style={styles.container}>
            <StatusBar style='light' backgroundColor='black' />
            <BackButton onPress={() => setShowFriends(false)} />
            <View style={styles.friendInfoContainer}>
                {showDelete && <DeleteDialog friend={selectedFriend} />}
                {showApprove && <ApproveDialog friend={selectedFriend} />}
                <View>
                    <Text>Kaverilista</Text>
                    <View style={styles.line}></View>
                </View>
                <View>
                    <View>
                        <Text>Kaveripyynnöt</Text>
                        <View style={styles.line}></View>
                    </View>
                    <View>
                        <FlatList />
                    </View>
                </View>
                <View>
                    <View>
                        <Text>Kaverilista</Text>
                        <View style={styles.line}></View>
                    </View>
                    <View>
                        <FlatList data={friends} renderItem={({ item }) =>
                            <TouchableOpacity style={styles.friend} onPress={() => setSelectedFriend(item)}>
                                {item.name}
                            </TouchableOpacity>}
                            keyExtractor={(item) => item.id + ""} />
                    </View>
                </View>
            </View>


        </View>
    )
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        alignItems: 'center',
        paddingTop: 80,
        paddingBottom: 50,

    },
    friendInfoContainer: {
        width: "90%",
        flex: 0.2,
        backgroundColor: "white"
    },
    line: {
        width: "100%",
        height: 2,
        backgroundColor: "black"
    },
    friend: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        width: "100%",
        backgroundColor: "green"
    }
})


export default FriendList