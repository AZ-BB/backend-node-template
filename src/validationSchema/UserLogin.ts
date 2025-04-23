import { z } from 'zod'
export const UserLoginSchema = z.object({
    email: z.string({
        required_error: "Email is required"
    }).email(),
    password: z.string({
        required_error: "Password is required"
    }).min(8),
})


export type UserLoginType = z.infer<typeof UserLoginSchema>