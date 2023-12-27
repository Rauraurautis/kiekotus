import jwtDecode from "jwt-decode"
import { create } from "zustand"
import * as SecureStore from "expo-secure-store"
import { Friend } from "../lib/types"
import { getUserFriends } from "../services/userService"



type AppStateStore = {
    creatingRound: boolean
    friends: Friend[]
    setCreatingRound: (state: boolean) => void
    setFriends: () => void
    getAllFriends: () => void

}



const useAppStateStore = create<AppStateStore>(
    (set, get) => ({
        creatingRound: false,
        friends: [],
        setCreatingRound(starting: boolean) {
            set(state => ({ ...state, creatingRound: starting }))
        },
        async setFriends() {
            const friends = await getUserFriends()
            set(state => ({ ...state, nonregisteredFriends: friends?.nonregFriends, friends: friends?.friends }))
        },
        async getAllFriends() {
            const friends = await getUserFriends()
            const categorizedFriends: Friend[] = friends?.friends.map((friend: any) => ({
                ...friend, type: "friend"
            }))
            const categorizedNonregFriends: Friend[] = friends?.nonregFriends.map((friend: any) => ({
                ...friend, type: "nonregistered"
            }))
            console.log(friends)
            set(state => ({ ...state, friends: [...categorizedFriends, ...categorizedNonregFriends] }))
        }
    })
)

export { useAppStateStore }

