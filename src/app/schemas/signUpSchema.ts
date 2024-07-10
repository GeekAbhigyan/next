import {z} from 'zod'

export const userNameValidation = z

.string()
.min(2,"Username ust be atleast two characters")
.max(20,"username must be atmost 20 characters ")
.regex(/^[a-zA-Z0-9_]+$/,"username must not contain special characters")

export const signUpSchema = z.object({
   userName : userNameValidation,
   email: z.string().email({message:'invalid email address'}),
   passoword: z.string().min(6,{message:'password must be atleast six characters'}),
})