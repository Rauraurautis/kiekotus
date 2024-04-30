import jwtDecode from "jwt-decode"
import { create } from "zustand"
import * as SecureStore from "expo-secure-store"

type User = {
    email: string
    user: string
    id: string
}



type AuthStore = {
    user: User | null
    loggedIn: boolean
    login: (token: string) => void
    logout: () => void
    relogin: () => void
}

type TokenPayload = {
    session: string
    iat: number
    exp: number
    user: UserPayload
}

type UserPayload = {
    _id: string
    email: string
    name: string
    createdAt: string
    updatedAt: string
    __v: number
}


const useAuthStore = create<AuthStore>(
    (set) => ({
        user: null,
        loggedIn: false,
        async login(token: string) {
            const decodedToken: TokenPayload = jwtDecode(token)
            set(state => ({
                ...state, user: { user: decodedToken.user.name, email: decodedToken.user.email, id: decodedToken.user._id }, loggedIn: true
            }))
            await SecureStore.setItemAsync("accessToken", token)
        },
        async relogin() {
            const token = await SecureStore.getItemAsync("accessToken")
            if (!token) return
            const decodedToken: TokenPayload = jwtDecode(token)
            set(state => ({
                ...state, user: { user: decodedToken.user.name, email: decodedToken.user.email, id: decodedToken.user._id }, loggedIn: true
            }))
        },
        async logout() {
            await SecureStore.deleteItemAsync("accessToken")
            console.log("sd")
            set(state => ({
                ...state, user: null, loggedIn: false
            }))
        }
    }))

export { useAuthStore }

