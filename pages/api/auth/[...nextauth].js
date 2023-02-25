import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from '../../../prisma/dbInstance.ts';

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