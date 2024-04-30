import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
        paddingTop: 80,
        paddingBottom: 50,
    },
    upperButtonContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        flex: 0.7
    },
    lowerButtonContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        flex: 0.3,
        marginTop: 50
    },

    circleButton: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#2E4153",
        paddingBottom: 20,
        paddingHorizontal: 20,
        borderRadius: 200,
        width: 200,
        height: 200,
        margin: 10
    },
    rectangleButton: {
        alignItems: "center",
        backgroundColor: "#2E4153",
        width: 300,
        paddingVertical: 15,
        margin: 10

    },
    iconStyle: {
        height: 80
    },
    textStyle: {
        color: "white",
        fontSize: 28,
        textAlign: "center"
    }
});
