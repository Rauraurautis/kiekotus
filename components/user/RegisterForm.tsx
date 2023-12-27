
import { FC, useCallback, useEffect, useState } from "react"
import { Button, StyleSheet, Text, TextInput, View } from "react-native"
import { useForm, Controller, FieldValues } from 'react-hook-form';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";

const RegisterForm = ({ }) => {
    const router = useRouter()
    const { register, handleSubmit, setValue } = useForm();
    const onSubmit = useCallback((formData: FieldValues) => {
        console.log(formData);
    }, []);

    const onChangeField = useCallback((name: any) => (text: any) => {
        setValue(name, text);
    }, []);

    useEffect(() => {
        register('username');
        register('email');
        register('password');
        register('confirmPassword');
    }, [register]);

    return (
        <>
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Käyttäjätunnus"
                    onChangeText={onChangeField('username')}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Sähköposti"
                    onChangeText={onChangeField('email')}
                />
                <TextInput
                    style={styles.input}
                    secureTextEntry
                    placeholder="Salasana"
                    onChangeText={onChangeField('password')}
                />
                <TextInput
                    style={styles.input}
                    secureTextEntry
                    placeholder="Toista salasana"
                    onChangeText={onChangeField('confirmPassword')}
                />
                <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.button}>
                    <Text style={styles.buttonText}>
                        Rekisteröidy
                    </Text>
                </TouchableOpacity>
            </View>
        </>




    );
};

const styles = StyleSheet.create({
    formContainer: {
        
    },
    input: {
        width: 150,
        height: 50,
        fontSize: 20
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
    registerLink: {
        position: "absolute",
        bottom: 10,
        color: "blue"
    }

});


export default RegisterForm