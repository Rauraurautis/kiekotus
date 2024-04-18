import { FC } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import RegisterForm from '../../components/user/RegisterForm'
import { useRouter } from 'expo-router'
import { AntDesign } from '@expo/vector-icons';

interface RegistrationProps {

}

const Registration: FC<RegistrationProps> = ({ }) => {
    const router = useRouter()

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.push("/login")}>
                <AntDesign name="back" size={24} color="black" />
            </TouchableOpacity>
            <View style={styles.header} >
                <Text style={styles.mainText}>Rekisteröidy</Text>
                <View style={styles.line} />
            </View>
            <RegisterForm />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0.2,
        minHeight: 300,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: "white",
        width: 280,
        borderRadius: 10
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
        paddingBottom: 5


    },
    line: {
        width: 260,
        height: 1,
        backgroundColor: "grey"
    }


});

export default Registration