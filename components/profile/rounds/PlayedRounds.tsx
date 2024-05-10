import { FC, useEffect, useState } from 'react'
import { User } from '../../../lib/types'
import BackButton from '../../ui/BackButton'
import { StatusBar } from 'expo-status-bar'
import { View, StyleSheet } from 'react-native'
import { getUserRounds } from '../../../services/userService'
import Toast from 'react-native-toast-message'

interface PlayedRoundsProps {
    user: User | null
    setShowRounds: React.Dispatch<React.SetStateAction<boolean>>
}

const PlayedRounds: FC<PlayedRoundsProps> = ({ user, setShowRounds }) => {
    const [playedRounds, setPlayedRounds] = useState([])

    useEffect(() => {
        if (user?.id) {
            getUserRounds(user.id).then(data => setPlayedRounds(data))
                .catch(err => {
                    Toast.show({ type: "error", text1: "Virhe näytettäessä kierroksia!" })
                })
        }
    }, [])

    return (
        <View style={styles.container}>
            <StatusBar style='light' backgroundColor='black' />
            <BackButton onPress={() => setShowRounds(false)} />
            <View style={styles.friendInfoContainer}>

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
})

export default PlayedRounds