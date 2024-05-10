import React, { FC } from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

interface BackButtonProps {
    onPress: () => void
}

const BackButton: FC<BackButtonProps> = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.backButton} onPress={onPress}>
            <AntDesign name="back" size={24} color="black" />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    backButton: {
        position: "absolute",
        top: 0,
        left: 0,
        padding: 5
    }
})

export default BackButton