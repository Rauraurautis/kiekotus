import { FC } from 'react'
import { View, Text, StyleSheet } from 'react-native'

interface HoleInfoProps {
    holeNumber: number
    par: number
    distance: number
}

const HoleInfo: FC<HoleInfoProps> = ({ holeNumber, par, distance }) => {
    return (
        <View style={styles.holeInfo}>
            <Text style={styles.text}>Väylä {holeNumber + 1}</Text>
            <Text style={styles.text}>Par {par}</Text>
            <Text style={styles.text}>{distance > 0 && `${distance}m`}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        width: "100%",
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        gap: 5,
    },
    holeInfo: {
        alignItems: "center",
        gap: 5
    },
    text: {
        fontSize: 30
    },
    scoreContainer: {
        flexDirection: "row",
        width: "90%",
        justifyContent: "space-around"
    },
    backButton: {

        left: 5,
        top: "50%",
        transform: [{ translateY: -35 }]
    }
})

export default HoleInfo