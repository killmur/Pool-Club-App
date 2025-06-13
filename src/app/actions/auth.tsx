"use server"

import { signIn as nextAuthSignIn} from "next-auth/react";
import { z } from "zod";

const _SingInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password Required and Must be 8 Characters"),
})

export async function signIn({email, password} : {email: string, password: string}){
    try {
        const creds = _SingInSchema.parse({email, password});
        const result = await signIn(creds);

        if(!result || result.error){
            throw new Error(result?.error || 'Login Failed')
        }
    }
}