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

    const handleEndEditting = (playerIndex: number, score: number) => {
        handleScorePress(playerIndex, parseInt(scoreContent))
        setScoreContent(customScoreStyle === "plus" ? "+..." : "-...")
    }

    if (score === undefined && customScoreStyle) {
        return (
            <TouchableOpacity onPress={() => handleScorePress(playerIndex)}>
                {customScoreStyle === "plus" ?
                    <TextInput keyboardType="numeric" onEndEditing={() => handleEndEditting(playerIndex, parseInt(scoreContent))} style={styles.text} placeholder={text} onChangeText={(e) => setScoreContent(e)} onPressIn={() => setScoreContent("+")} >{scoreContent}</TextInput> :
                    <TextInput keyboardType="numeric" onEndEditing={() => handleEndEditting(playerIndex, parseInt(scoreContent))} style={styles.text} placeholder={text} onPressIn={() => setScoreContent("-")}>{scoreContent}</TextInput>}
            </TouchableOpacity>
        )
    }

    return (
        <TouchableOpacity onPress={() => handleScorePress(playerIndex, score)}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 30
    }
})