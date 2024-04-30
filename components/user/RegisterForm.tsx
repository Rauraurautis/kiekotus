
import { FC, useCallback, useEffect, useState } from "react"
import { Button, StyleSheet, Text, TextInput, View } from "react-native"
import { useForm, Controller, FieldValues } from 'react-hook-form';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { registerToServer } from "../../services/userService";
import Toast from "react-native-toast-message";

const RegisterForm = ({ }) => {
    const router = useRouter()
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    const onSubmit = async (formData: FieldValues) => {
        try {
            if (formData.password !== formData.confirmPassword) {
                Toast.show({ type: "error", text1: "Salasanat eivät vastaa toisiaan!" })
            }
            const registered = await registerToServer({ password: formData.password, confirmPassword: formData.confirmPassword,
                 email: formData.email, username: formData.username })
            if (registered) {
                Toast.show({ type: "success", text1: "Käyttäjä luotu onnistuneesti, voit nyt kirjautua sisään." })
                router.push({ pathname: "/login" })
            }
        } catch (error) {
            Toast.show({ type: "error", text1: "Virhe luodessa käyttäjää: käyttäjätunnus tai sähköposti on jo olemassa." })
        }
    };

    const onChangeField = useCallback((name: any) => (text: any) => {
        setValue(name, text);
    }, []);

    return (
        <>
            <View style={styles.formContainer}>
                <TextInput style={styles.input} placeholder="Käyttäjätunnus" onChangeText={onChangeField('username')} {...register("username",
                    { minLength: { value: 2, message: "Käyttäjätunnuksen minimipituus 2 merkkiä" }
                    , maxLength: { value: 15, message: "Käyttäjätunnuksen maksimipituus 15 merkkiä" } })} />
                {errors.username && <Text style={styles.errorText}>{errors.username.message as string}</Text>}
                <TextInput style={styles.input} placeholder="Sähköposti" onChangeText={onChangeField('email')}  {...register("email", {
                    required: "Syötä sähköposti!",
                    pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Sähköpostin tulee olla muotoa XXX@XXX.XXX', }
                })} />
                {errors.email && <Text style={styles.errorText}>{errors.email.message as string}</Text>}
                <TextInput style={styles.input} secureTextEntry placeholder="Salasana" onChangeText={onChangeField('password')}  
                {...register("password", { required: "Syötä salasana!" })} />
                {errors.password && <Text style={styles.errorText}>{errors.password.message as string}</Text>}
                <TextInput style={styles.input} secureTextEntry placeholder="Toista salasana" onChangeText={onChangeField('confirmPassword')} 
                {...register("confirmPassword", { required: "Syötä salasanan vahvistus!" })} />
                {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword.message as string}</Text>}
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
    },
    errorText: {
        color: "red"
    }

});


export default RegisterForm