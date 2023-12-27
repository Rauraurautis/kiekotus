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
    return ""
}

export const setAccessToken = async (token: string) => {
    localStorage.setItem("access-token", token)
}

const isTokenExpired = async () => {
    const token = await getToken()
    if (token) {
        try {
            const decoded: tokenPayload = jwtDecode(token)
            return decoded.exp < new Date().getTime() / 1000
        } catch (err) {
            console.error(err)
        }


    }
}

const getRefreshedToken = async () => {
    try {
        const result = await axios.get("http://localhost:1337/refresh", { withCredentials: true })
        return result.data
    } catch (error: any) {
        console.error(error.message)
    }

}

const newAccessToken = async () => {
    const data = await getRefreshedToken()
    if (typeof data.token === "string") {
        setAccessToken(data.token)
        return data.token
    }

}


instance.interceptors.request.use(async (req) => {
    const expired = await isTokenExpired()
    if (expired) {
        const token = await newAccessToken()
        req.headers["Authorization"] = `Bearer ${token}`
        return req
    }
    const accessToken = await getToken()
    req.headers["Authorization"] = `Bearer ${accessToken}`
    return req
})

export default instance