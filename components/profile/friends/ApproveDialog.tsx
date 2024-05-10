import { FC, useEffect, useState } from 'react'
import { Friend, User } from '../../../lib/types'
import BackButton from '../../ui/BackButton'
import { StatusBar } from 'expo-status-bar'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'


interface ApproveDialogProps {
    friend: Friend | null
}

const ApproveDialog: FC<ApproveDialogProps> = ({ friend }) => {

    if (!friend) return null

    return (
        <View>
            <Text>Kaveripyyntö henkilöltä {friend.name}.</Text>
            <View>
                <TouchableOpacity>Hyväksy</TouchableOpacity>
                <TouchableOpacity>Hylkää</TouchableOpacity>
            </View>
        </View>
    )
}

export default ApproveDialog

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