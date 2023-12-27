import { FC } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import RegisterForm from '../../components/user/RegisterForm'

interface RegistrationProps {

}

const Registration: FC<RegistrationProps> = ({ }) => {
    return (
        <View style={styles.container}>
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