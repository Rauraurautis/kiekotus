import React, { FC, useCallback, useEffect, useState } from "react"
import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native"
import { AntDesign } from '@expo/vector-icons';
import { useForm, Controller, FieldValues } from 'react-hook-form';
import { useRouter } from "expo-router";
import LoginForm from "../../components/user/LoginForm";

interface LoginFormProps {

}

const LoginPage = ({ }) => {
    const router = useRouter()

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.push("/")}>
                <AntDesign name="back" size={24} color="black" />
            </TouchableOpacity>
            <View style={styles.header}>
                <Text style={styles.mainText}>Kirjaudu sisään</Text>
                <View style={styles.line} />
            </View>
            <LoginForm />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 0.3,
        minHeight: 230,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: "white",
        width: 280,
    },
    backButton: {
        position: 'absolute',
        top: 0,
        left: 0,
        padding: 10,
        zIndex: 5
    },
    mainText: {
        fontSize: 25,
        textAlign: "center",
        paddingBottom: 10
    },
    header: {
        position: "absolute",
        top: 25
    },
    line: {
        width: 260,
        height: 1,
        backgroundColor: "black"
    }


});


export default LoginPage