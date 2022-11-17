import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default NextAuth({
    pages:{
        signIn: "/Admin/login"
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            async authorize(credentials, req) {     
                let admin = await prisma.administrator.findUnique({
                    where:{
                        Username:credentials.username,
                    }
                })      
                if (admin) {
                    if (admin.Password === credentials.password)
                        return admin;    
                }
                return null;
            }
        })
    ],
})    