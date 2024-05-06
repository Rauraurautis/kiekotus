import { FC, useCallback, useEffect, useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Keyboard } from 'react-native'

import { AntDesign } from '@expo/vector-icons';

import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { nonRegisteredFriendSchema, nonRegisteredFriendSchemaType } from '../../lib/zod/schema';

import * as SecureStore from "expo-secure-store"
import BackButton from '../ui/BackButton';
import Toast from 'react-native-toast-message';


interface NewNonregisteredFriendFormProps {
    setAddingFriend: React.Dispatch<React.SetStateAction<boolean>>
}


const NewNonregisteredFriendForm: FC<NewNonregisteredFriendFormProps> = ({ setAddingFriend }) => {
    const [input, setInput] = useState("")

    const addLocalFriend = async () => {
        if (input.length < 2 && input.length > 10) {
            Toast.show({type: "error", text1: "Nimen minimipituus 2 merkkiä, maksimipituus 10 merkkiä!"})
        }
        let friends = await SecureStore.getItemAsync("friends")
        if (!friends) {
            friends = "[]"
        }
        const parsedFriends = JSON.parse(friends)
        if (parsedFriends instanceof Array) {
            parsedFriends.push(input)
            SecureStore.setItemAsync("friends", JSON.stringify(parsedFriends))
        }
    }

    return (
        <View style={styles.container}>
            <BackButton onPress={() => setAddingFriend(prev => !prev)} />
            <View style={styles.newPlayerFormContainer}>
                <TextInput style={styles.input} placeholder="Kaverin nimi" value={input} onChangeText={txt => setInput(txt)} maxLength={20} />
                <TouchableOpacity onPress={addLocalFriend} style={styles.button}>
                    <Text style={styles.buttonText}>
                        Lisää pelaaja
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0.3,
        minHeight: 230,
        padding: 30,
        backgroundColor: "white",
        width: 280,
        position: "absolute",
        zIndex: 20
    },
    backButton: {
        position: "absolute",
        top: 0,
        left: 0,
        padding: 10
    },
    newPlayerFormContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: 5,
        flex: 1
    },
    input: {
        width: "90%",
        padding: 5,
        height: 50,
        fontSize: 20,
        backgroundColor: "#E6E6E6",

    },
    errorText: {
        color: "red"
    },
    button: {
        backgroundColor: "#2E4153",
        padding: 10,
        marginTop: 15
    },
    buttonText: {
        color: "white",
        textAlign: "center",
        fontSize: 20
    },

})


export default NewNonregisteredFriendForm