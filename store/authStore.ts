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
    userToken: string
    refreshToken: string
    loggedIn: boolean
    csrfToken: string
    login: (token: string) => void
    logout: () => void
    validateToken: (token: string) => boolean
    setNewToken: (token: string) => void
    setCsrfToken: (token: string) => void
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
    (set, get) => ({
        user: {email: "kakka@gmail.com", user: "Rarara", id: "223"},
        userToken: "",
        refreshToken: "",
        loggedIn: true,
        csrfToken: "",

        login(token: string) {
            const decodedToken: TokenPayload = jwtDecode(token)
            console.log(decodedToken)
            set(state => ({
                ...state, user: { user: decodedToken.user.name, email: decodedToken.user.email, id: decodedToken.user._id }, loggedIn: true
            }))
        },
        logout() {
            set(state => ({
                ...state, user: null, userToken: "", refreshToken: "", loggedIn: false
            }))
        },
        validateToken(token: string | null) {
            if (token) {
                const decodedToken: TokenPayload = jwtDecode(token)
                const secondsNow = new Date().getTime() / 1000
                return decodedToken.exp > secondsNow
            }
            return false
        },
        async setNewToken(token: string) {
            await SecureStore.setItemAsync("accessToken", token)
            set(state => ({
                ...state, userToken: token
            }))
        },
        setCsrfToken(token: string) {
            set(state => ({
                ...state, csrfToken: token
            }))
        }

    }))

export { useAuthStore }

