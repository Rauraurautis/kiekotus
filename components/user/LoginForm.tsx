
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



const loginMutationFunc = async (credentials: UserCredentials) => {
    try {
        const token = await loginToServer({ password: credentials.password, email: credentials.email, csrfToken: credentials.csrfToken })
        return token
    } catch (error) {
        console.error(error)
    }
}

const LoginForm = ({ }) => {
    const router = useRouter()
    const { csrfToken, setNewToken, login } = useAuthStore()
    const { register, handleSubmit, setValue, formState: { isSubmitting, errors } } = useForm<LoginSchemaType>({ resolver: zodResolver(loginSchema) });
    const loginMutation = useMutation({
        mutationFn: loginMutationFunc,
        onSuccess: (token) => {
            if (token) {
                setNewToken(token)
                login(token)
                router.push({ pathname: "/" })
            }
        }
    })

    const onSubmit = useCallback(async (formData: FieldValues) => {
        loginMutation.mutate({ password: formData.password, email: formData.email, csrfToken })
    }, []);

    const onChangeField = useCallback((name: any) => (text: any) => {
        setValue(name, text);
    }, []);

    useEffect(() => {
        register('email');
        register('password');
    }, [register]);

    return (
        <>
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Sähköposti"
                    onChangeText={onChangeField('email')}
                />
                {errors.email && <Text style={styles.errorText}>Syötä sähköposti muodossa XXX@XXX.XXX</Text>}
                <TextInput
                    style={styles.input}
                    secureTextEntry
                    placeholder="Salasana"
                    onChangeText={onChangeField('password')}
                />
                {errors.password && <Text style={styles.errorText}>Syötä salasana</Text>}
                {loginMutation.isError && <Text style={styles.errorText}>Virhe kirjautuessa sisään. Väärä tunnus ja/tai salasana!</Text>}
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