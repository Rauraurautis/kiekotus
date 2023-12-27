import { View, StyleSheet, TouchableOpacity, Text } from "react-native"
import { TextInput } from "react-native-gesture-handler"

export const CustomScoreForm = () => {
    return (
        <View style={styles.container}>
            <View>
                <TextInput keyboardType="numeric" placeholder="Tulos"/>
                <TouchableOpacity>
                    <Text>Syötä tulos</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
       
        minHeight: 230,
        padding: 30,
        backgroundColor: "blue",
        width: 280,
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
       
        zIndex: 20,
        
    }
})