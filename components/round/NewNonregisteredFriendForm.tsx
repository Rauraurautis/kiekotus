import { FC, useCallback, useEffect } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Keyboard } from 'react-native'

import { AntDesign } from '@expo/vector-icons';

import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { nonRegisteredFriendSchema, nonRegisteredFriendSchemaType } from '../../lib/zod/schema';

import * as SecureStore from "expo-secure-store"
import BackButton from '../ui/BackButton';


interface NewNonregisteredFriendFormProps {
    setAddingFriend: React.Dispatch<React.SetStateAction<boolean>>
}


const NewNonregisteredFriendForm: FC<NewNonregisteredFriendFormProps> = ({ setAddingFriend }) => {
    const { register, handleSubmit, setValue, formState: { isSubmitting, errors } } = useForm<nonRegisteredFriendSchemaType>({ resolver: zodResolver(nonRegisteredFriendSchema) });

    const addLocalFriend = async (name: string) => {
        let friends = await SecureStore.getItemAsync("friends")
        if (!friends) {
            friends = "[]"
        }
        const parsedFriends = JSON.parse(friends)
        if (parsedFriends instanceof Array) {
            parsedFriends.push(name)
            SecureStore.setItemAsync("friends", JSON.stringify(parsedFriends))
        }
    }


    useEffect(() => {
        register('name');
    }, [register]);

    const onSubmit = useCallback(async (formData: FieldValues) => {
        addLocalFriend(formData.name)
    }, []);

    const onChangeField = useCallback((name: any) => (text: any) => {
        setValue(name, text);
    }, []);


    return (
        <View style={styles.container}>
            <BackButton onPress={() => setAddingFriend(prev => !prev)} />
            <View style={styles.newPlayerFormContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Kaverin nimi"
                    onChangeText={onChangeField('name')}
                />
                {errors.name && <Text style={styles.errorText}>Kaverin nimi liian lyhyt tai pitkä!</Text>}
                <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.button}>
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