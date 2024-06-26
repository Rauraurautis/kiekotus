
import { FC, useCallback, useEffect, useState } from "react"
import { Button, StyleSheet, Text, TextInput, View } from "react-native"
import { useForm, Controller, FieldValues } from 'react-hook-form';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { useAuthStore } from "../../store/authStore";
import { loginToServer } from "../../services/userService";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import { UserCredentials } from "../../lib/types";
import { useMutation } from "@tanstack/react-query";
import { LoginSchemaType, loginSchema } from "../../lib/zod/schema";
import Toast from "react-native-toast-message";


const LoginForm = ({ }) => {
    const router = useRouter()
    const { login } = useAuthStore()
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    const onSubmit = async (formData: FieldValues) => {
        try {
            const token = await loginToServer({ password: formData.password, email: formData.email })
            if (token) {
                login(token)
                router.push({ pathname: "/" })
            }
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Virhe kirjautuessa sisään! Väärä käyttäjätunnus ja/tai salasana.",
            })
        }
    }

    const onChangeField = (name: any) => (text: any) => {
        setValue(name, text);
    };

    return (
        <>
            <View style={styles.formContainer}>
                <TextInput style={styles.input} placeholder="Sähköposti" onChangeText={onChangeField('email')}
                    {...register("email", {
                        required: "Syötä sähköposti!", pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Sähköpostin tulee olla muotoa XXX@XXX.XXX',
                        }
                    })} />
                {errors.email && <Text style={styles.errorText}>{errors.email.message as string}</Text>}
                <TextInput style={styles.input} secureTextEntry placeholder="Salasana" onChangeText={onChangeField('password')}
                    {...register("password", { required: "Syötä salasana!" })} />
                {errors.password && <Text style={styles.errorText}>{errors.password.message as string}</Text>}
                <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.button}>
                    <Text style={styles.buttonText}>
                        Kirjaudu sisään
                    </Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.registerLink} onPress={() => router.push({ pathname: "/registration" })}>Puuttuuko tunnus? Rekisteröidy tästä!</Text>
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
    },
    errorText: {
        color: "red"
    }

});


export default LoginForm