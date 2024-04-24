import { NonregisteredFriend, UserCredentials } from "../lib/types";
import { nonRegisteredFriendSchemaType } from "../lib/zod/schema";
import instance from "./axiosInstance";

export const getCsrfToken = async () => {
    try {
        const token = await instance.get("/csrf-token")
        return token.data.csrfToken
    } catch (error) {
        console.error(error)
    }
}

export const loginToServer = async (credentials: UserCredentials) => {
    try {
        const response = await instance.post("/api/login", credentials)
        return response.data.accessToken
    } catch (error) {
        console.error(error)
    }
}

export const addNonregisteredFriend = async (friend: NonregisteredFriend) => {
    try {
        const csrfToken = await getCsrfToken()
        instance.defaults.headers.post['CSRF-Token'] = csrfToken
        console.log(csrfToken)
        const nonregisteredFriend = await instance.post("/api/nonregistered-friends", friend)
        console.log(nonregisteredFriend)
        return nonregisteredFriend
    } catch (error) {
        console.error(error)
    }
}

export const getUserFriends = async () => {
    try {
        const resFriends = await instance.get("/api/friendships")
        const resNonregFriends = await instance.get("/api/nonregistered-friends")
        const friends = await resFriends.data
        const nonregFriends = await resNonregFriends.data
        return { friends, nonregFriends }
    } catch (error) {
        console.error(error)
    }
}