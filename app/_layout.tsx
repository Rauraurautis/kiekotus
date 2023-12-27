import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Slot } from 'expo-router'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { images } from '../constants'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const queryClient = new QueryClient()

const _layout = () => {
    return (
        <SafeAreaProvider>
            <QueryClientProvider client={queryClient}>
                <ImageBackground source={images.background} style={styles.background}>
                    <View style={styles.header}></View>
                    <Slot />
                </ImageBackground>
            </QueryClientProvider>
        </SafeAreaProvider>
    )
}

export default _layout

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    header: {

        backgroundColor: "grey"
    },

})