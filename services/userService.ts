import { Friend, NonregisteredFriend, RegisterUserCredentials, Round, UserCredentials } from "../lib/types";
import { nonRegisteredFriendSchemaType } from "../lib/zod/schema";
import instance from "./axiosInstance";
import * as SecureStore from "expo-secure-store"

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

export const registerToServer = async (credentials: RegisterUserCredentials) => {
    try {
        const response = await instance.post("/api/users", credentials)
        return response.data
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

export const getUserFriends = async (userId: string) => {
    try {
        const resFriends = await instance.get(`/api/users/${userId}/friendships`)
        const friends = await resFriends.data
        return friends
    } catch (error) {
        console.error(error)
    }
}

export const getUserRounds = async (userId: string) => {
    try {
        const response = await instance.get(`/api/users/${userId}/rounds`)
        const data = await response.data
        return data
    } catch (error) {
        console.error(error)
    }
}

export const addUserRound = async (userId: string, round: Round) => {
    try {
        const response = await instance.post(`/api/users/${userId}/rounds`, round)
        const data = await response.data
        return data
    } catch (error) {
        console.error(error)
    }
}

export const addPlayedRound = async (userId: string, courseId: number) => {
    try {
        const response = await instance.post(`/api/users/${userId}/statistics/played-courses`, { courseId, date: new Date().toISOString() })
        const data = await response.data
        return data
    } catch (error) {
        console.error(error)
    }
}

export const getLocalUserFriends = async (): Promise<Friend[]> => {
    const localFriends = await SecureStore.getItemAsync("friends")
    if (localFriends) {
        const parsedFriends = JSON.parse(localFriends)
        return [...parsedFriends]
    }
    return []
}

export const getAllUserFriends = async (userId: string) => {
    try {
        const resFriends = await instance.get(`/api/users/${userId}/friendships`)
        const friends = await resFriends.data
        return friends
    } catch (error) {
        console.error(error)
    }
}