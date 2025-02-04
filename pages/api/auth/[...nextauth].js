import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import Kakao from "next-auth/providers/kakao";
import { connectDB } from "../../../util/database";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
    //providers 자리에 구현하고자 하는 oAuth를 집어넣으면 된다.
    providers: [
        Github({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        Kakao({
            clientId: process.env.KAKAO_ID,
            clientSecret: process.env.KAKAO_SECRET,
        }),
        CredentialsProvider({
            //1. 로그인페이지 폼 자동생성해주는 코드
            name: "credentials",
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "password", type: "password" },
            },

            //2. 로그인요청시 실행되는코드
            //직접 DB에서 아이디,비번 비교하고
            //아이디,비번 맞으면 return 결과, 틀리면 return null 해야함
            async authorize(credentials) {
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
    callbacks: {
        //4. jwt 만들 때 실행되는 코드
        //user변수는 DB의 유저정보담겨있고 token.user에 뭐 저장하면 jwt에 들어갑니다.
        jwt: async ({ token, user }) => {
            if (user) {
                token.user = {};
                token.user.name = user.name;
                token.user.email = user.email;
            }
            return token;
        },
        //5. 유저 세션이 조회될 때 마다 실행되는 코드
        session: async ({ session, token }) => {
            session.user = token.user;
            return session;
        },
    },
    adapter: MongoDBAdapter(connectDB),
    secret: process.env.AUTH_SECRET, //jwt 생성시 쓰는 암호
};
export default NextAuth(authOptions);
