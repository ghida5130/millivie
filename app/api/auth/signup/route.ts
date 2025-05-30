import { connectDB } from "@/util/database";
import bcrypt from "bcrypt";

export async function POST(request) {
    try {
        const body = await request.json();
        const hash = await bcrypt.hash(body.password, 10);
        body.password = hash;

        const db = (await connectDB).db("millivie");
        await db.collection("user_cred").insertOne(body);

        return Response.json(
            {
                message: "회원가입에 성공했습니다. 잠시후 로그인페이지로 이동합니다.",
                redirectUrl: "/register/complete",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return Response.json({ error: "서버에러" }, { status: 500 });
    }
}
