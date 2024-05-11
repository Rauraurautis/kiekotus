import { FC, useState } from "react"
import { TouchableOpacity, Text, StyleSheet, View, TextInput } from "react-native"

interface ScoreButtonProps {
    text: string
    score?: number
    customScoreStyle?: "plus" | "minus"
    playerIndex: number
    handleScorePress: (playerIndex: number, score?: number) => void
}

export const ScoreButton: FC<ScoreButtonProps> = ({ text, score, playerIndex, handleScorePress, customScoreStyle }) => {
    const [scoreContent, setScoreContent] = useState(customScoreStyle === "plus" ? "+..." : "-...")

    const handleEndEditting = (playerIndex: number, isPlus: boolean) => {
        const score = scoreContent.replace(/[.,\-_]/g, "")
        const adjustedScore = isPlus ? Number(score) : -Math.abs(Number(score))
        handleScorePress(playerIndex, adjustedScore)
        setScoreContent(customScoreStyle === "plus" ? "+..." : "-...")
    }

    if (score === undefined && customScoreStyle) {
        return (
            <TouchableOpacity style={styles.buttonStyle}>
                {customScoreStyle === "plus" ?
                    <TextInput keyboardType="numeric" onEndEditing={() => handleEndEditting(playerIndex, true)}
                        style={styles.text} placeholder={text} onChangeText={(e) => setScoreContent(e)}
                        onPressIn={() => setScoreContent("+")} >{scoreContent}</TextInput> :
                    <TextInput keyboardType="numeric" onEndEditing={() => handleEndEditting(playerIndex, false)}
                        style={styles.text} placeholder={text} onChangeText={(e) => setScoreContent(e)}
                        onPressIn={() => setScoreContent("-")}>{scoreContent}</TextInput>}
            </TouchableOpacity>
        )
    }

    return (
        <TouchableOpacity onPress={() => handleScorePress(playerIndex, score)} style={styles.buttonStyle}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 30
    },
    buttonStyle: {
        backgroundColor: "#61BCFA",
        borderRadius: 50,
        width: 50,
        height: 50,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        margin: 5
    }
})