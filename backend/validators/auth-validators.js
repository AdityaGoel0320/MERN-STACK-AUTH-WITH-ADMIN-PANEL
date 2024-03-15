let { z } = require("zod")

const registerSchema = z.object({
    username: z
        .string({ required_error: "Name is required" })
        .trim()
        .min(3, { message: "name should be of min 3 characters " })
        .max(255, { message: "name should be of max 255 characters " }),


    email: z
        .string({ required_error: "email is required" })
        .trim()
        .email({ message: "email is not in proper format" })
        .min(10, { message: "email should be of min 10 characters " })
        .max(255, { message: "email should be of max 255 characters " }),

    phone: z
        .string({ required_error: "phone is required" })
        .trim()
        .min(10, { message: "phone should be of min 10 characters " })
        .max(255, { message: "phone should be of max 255 characters " }),

    password: z
        .string({ required_error: "password is required" })
        .trim()
        .min(7, { message: "password should be of min 7 characters " })
        .max(255, { message: "password should be of max 255 characters " }),
})



const loginSchema = z.object({
    
    email: z
        .string({ required_error: "email is required" })
        .trim()
        .email({ message: "email is not in proper format" })
        .min(10, { message: "email should be of min 10 characters " })
        .max(255, { message: "email should be of max 255 characters " }),

 
    password: z
        .string({ required_error: "password is required" })
        .trim()
        .min(7, { message: "password should be of min 7 characters " })
        .max(255, { message: "password should be of max 255 characters " }),
})

module.exports =  {registerSchema  , loginSchema} ; 