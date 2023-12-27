import { z } from "zod"

export const loginSchema = z.object({
    email: z.string({ required_error: "Email required" }).email(),
    password: z.string({ required_error: "Password required" }).min(1)
})

export type LoginSchemaType = z.infer<typeof loginSchema>

export const nonRegisteredFriendSchema = z.object({
    name: z.string({ required_error: "Name required!" }).min(2, {message: "Minimum length two characters!"}),
})

export type nonRegisteredFriendSchemaType = z.infer<typeof nonRegisteredFriendSchema>
