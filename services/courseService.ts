import { instance } from "./axiosInstance";

const getAllCourses = async () => {
    try {
        const res = await instance.get("/api/courses")
        const courses = await res.data
        return courses
    } catch (error) {
        console.error(error)
    }
}