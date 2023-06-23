import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connection from "@/utils/db";
import User from "@/models/user";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

const handler = NextAuth({
    providers:[
        CredentialsProvider({
            id:"credentials",
            name:"credentials",
            async authorize(credentials){
                const {email,password} = credentials;
                connection();
                try {
                    const userVerified = await User.findOne({email});
                    if(userVerified){
                        const passwordVerified = await bcrypt.compare(password,userVerified.password);
                        if(passwordVerified){
                            console.log(userVerified);
                            // const {password,...others} = userVerified
                            // const user = userVerified
                            return userVerified;
                        }else{
                            console.log("wrong pass")
                            throw new Error("Wrong Credentials")
                        }
                    }else{
                        console.log("wrong user")
                        throw new Error("Wrong Credentials")
                    }
                } catch (error) {
                    console.log(error);
                    console.log("server error")
                    throw new Error("Server Error")
                }
            }
        })
    ],callbacks: {
        jwt: async ({ token, user }) => {
            user && (token.user = user)
            return token
        },
        session: async ({ session, token }) => {
            session.user = token.user
            return session
        }
    },
    pages:{
        error:"/auth/login"
    }
});

export { handler as GET , handler as POST };