import { FC, useEffect, useState } from 'react'
import { Friend, User } from '../../../lib/types'
import BackButton from '../../ui/BackButton'
import { StatusBar } from 'expo-status-bar'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { getUserFriends } from '../../../services/userService'
import Toast from 'react-native-toast-message'
import DeleteDialog from './DeleteDialog'
import ApproveDialog from './ApproveDialog'


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

    const handleDeleteClick = (friend: Friend) => {
        setSelectedFriend(friend)
        setShowDelete(true)
    }

    return (
        <View style={styles.friendInfoContainer}>
            <StatusBar style='light' backgroundColor='black' />
            <BackButton onPress={() => setShowFriends(false)} />
            {showDelete && <DeleteDialog friend={selectedFriend} />}
            {showApprove && <ApproveDialog friend={selectedFriend} />}
            <View style={styles.header}>
                <Text style={styles.title}>Kaverilista</Text>
                <View style={styles.line}></View>
            </View>
            <View>
                <View style={styles.subheader}>
                    <Text style={styles.subtitle}>Kaveripyynnöt</Text>
                    <View style={styles.line}></View>
                </View>
                <View>

                </View>
            </View>
            <View>
                <View style={styles.subheader}>
                    <Text style={styles.subtitle}>Kaverilista</Text>
                    <View style={styles.line}></View>
                </View>
                <View>
                    <FlatList data={friends} renderItem={({ item }) =>
                        <TouchableOpacity style={styles.friend} onPress={() => handleDeleteClick(item)}>
                            {item.name}
                        </TouchableOpacity>}
                        keyExtractor={(item) => item.id + ""} />
                </View>
            </View>
        </View>



    )
}

export const styles = StyleSheet.create({
    container: {
        flex: 0.8,
        width: "100%",
        alignItems: 'center',
        paddingTop: 80,
        paddingBottom: 50,

    },
    friendInfoContainer: {
        width: "80%",
        flex: 0.8,
        backgroundColor: "white",
        justifyContent: "space-around"
    },
    header: {
        position: "absolute",
        top: 25,
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
    subtitle: {
        fontSize: 23
    }
})


export default FriendList