import { Course, RoundInfo } from "../lib/types";
import instance from "./axiosInstance";

export const getAllCourses = async (): Promise<Course[]> => {
    try {
        const res = await instance.get("/api/courses")
        const courses = await res.data
        return courses
    } catch (error) {
        console.error(error)
        return []
    }
}

export const getCourseData = async (courseId: number): Promise<Course | null> => {
    try {
        const res = await instance.get(`/api/courses/${courseId}`)
        const courses = await res.data
        return courses
    } catch (error) {
        console.error(error)
        return null
    }
}
