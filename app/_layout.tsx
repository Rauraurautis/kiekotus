import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Slot } from 'expo-router'
import Toast from 'react-native-toast-message';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { images } from '../constants'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

const queryClient = new QueryClient()

const _layout = () => {
    return (
        <SafeAreaView style={styles.safeAreaView}>
            <QueryClientProvider client={queryClient}>
                <ImageBackground source={images.background} style={styles.background}>
                    <Toast />
                    <Slot />
                </ImageBackground>
            </QueryClientProvider>
        </SafeAreaView>
    )
}

export default _layout

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: "grey"
    },
    background: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    header: {
        backgroundColor: "grey"
    },

})