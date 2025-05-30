import { connectDB } from "@/util/database";

export async function POST(request) {
    try {
        const body = await request.json();
        const db = (await connectDB).db("millivie");

        const emailList = await db.collection("user_cred").findOne({ email: body.email });

        if (emailList) {
            return Response.json({ message: "이미 사용중인 이메일입니다." }, { status: 409 });
        } else {
            return Response.json({ message: "사용가능한 이메일 입니다." }, { status: 200 });
        }
    } catch (error) {
        console.error(error);
        return Response.json("서버에러", { status: 500 });
    }
}
