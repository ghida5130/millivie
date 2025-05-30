import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Kakao from "next-auth/providers/kakao";
import Credentials from "next-auth/providers/credentials";
import { connectDB } from "./util/database";
import bcrypt from "bcrypt";
import { MongoDBAdapter } from "@auth/mongodb-adapter";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: MongoDBAdapter(connectDB),
    providers: [
        GitHub,
        Kakao,
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                let db = (await connectDB).db("millivie");
                let user = await db.collection("user_cred").findOne({ email: credentials.email });
                if (!user) {
                    console.log("해당 이메일은 없습니다.");
                    return null;
                }
                const pwcheck = await bcrypt.compare(credentials.password, user.password);
                if (!pwcheck) {
                    console.log("비밀번호가 틀렸습니다.");
                    return null;
                }
                return user;
            },
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, //30일간 유지
    },
});
