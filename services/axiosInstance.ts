import axios from "axios";
import jwtDecode from "jwt-decode";
import * as SecureStore from "expo-secure-store"

type tokenPayload = {
    email: string
    name: string
    createdAt: string
    updatedAt: string
    __v: number
    session: string
    iat: number
    exp: number
}

const instance = axios.create({ baseURL: "http://192.168.1.66:1337", withCredentials: true })

export const getToken = async () => {
    const token = await SecureStore.getItemAsync("accessToken")
    if (typeof token === "string") { return token }
    return null
}

export const setAccessToken = async (token: string) => {
    await SecureStore.setItemAsync("accessToken", token)
}

instance.interceptors.request.use(async (req) => {
    const accessToken = await getToken()
    req.headers["Authorization"] = `Bearer ${accessToken}`
    return req
})

instance.interceptors.response.use(async (res) => {
    const xToken = res.headers["x-access-token"]
    const accessToken = await getToken()
    if (xToken !== accessToken) {
        setAccessToken(xToken)
    }
    return res
})


export default instance