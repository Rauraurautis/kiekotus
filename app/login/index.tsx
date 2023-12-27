import { FC, useCallback, useEffect, useState } from "react"
import { Button, StyleSheet, Text, TextInput, View } from "react-native"
import { useForm, Controller, FieldValues } from 'react-hook-form';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import LoginForm from "../../components/user/LoginForm";

interface LoginFormProps {

}

const Login: FC<LoginFormProps> = ({ }) => {

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.mainText} >Kirjaudu sisään</Text>
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


export default Login