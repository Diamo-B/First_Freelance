import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default NextAuth({
    pages:{
        signIn: "/Admin/login"
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            async authorize(credentials, req) {           
                if (credentials.username === "bachar" && credentials.password === "1234")
                    return{
                        user:{
                            name: "Bachar",
                        }
                    }
                
                return null;
            }
        })
    ],
})    