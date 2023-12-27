import { FC, useCallback, useEffect } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Keyboard } from 'react-native'
import { Course, NonregisteredFriend } from '../../lib/types'
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useAppStateStore } from '../../store/appStateStore';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../store/authStore';
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { nonRegisteredFriendSchema, nonRegisteredFriendSchemaType } from '../../lib/zod/schema';
import { useMutation } from '@tanstack/react-query';
import { addNonregisteredFriend } from '../../services/userService';


interface NewNonregisteredFriendFormProps {
    setAddingFriend: React.Dispatch<React.SetStateAction<boolean>>
}

const addNewNonregisteredFriendFunc = async (friend: NonregisteredFriend) => {
    const nonregisteredFriend = await addNonregisteredFriend(friend)
    return nonregisteredFriend
}

const NewNonregisteredFriendForm: FC<NewNonregisteredFriendFormProps> = ({ setAddingFriend }) => {
    const { csrfToken } = useAuthStore()
    const { setFriends } = useAppStateStore()
    const { register, handleSubmit, setValue, formState: { isSubmitting, errors } } = useForm<nonRegisteredFriendSchemaType>({ resolver: zodResolver(nonRegisteredFriendSchema) });
    const newNonregisteredFriendMutation = useMutation({
        mutationFn: addNewNonregisteredFriendFunc,
        onSuccess: async (data) => {
            setFriends()
        }
    })


    useEffect(() => {
        register('name');
    }, [register]);

    const onSubmit = useCallback(async (formData: FieldValues) => {
        newNonregisteredFriendMutation.mutate({ name: formData.name, csrfToken })
    }, []);

    const onChangeField = useCallback((name: any) => (text: any) => {
        setValue(name, text);
    }, []);


    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => setAddingFriend(prev => !prev)}>
                <AntDesign name="back" size={24} color="black" />
            </TouchableOpacity>
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