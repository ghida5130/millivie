import { connectDB } from "../../../util/database";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
    if (req.method == "POST") {
        let hash = await bcrypt.hash(req.body.password, 10);
        req.body.password = hash;
        let db = (await connectDB).db("millivie");
        await db.collection("user_cred").insertOne(req.body);
        res.status(200).json({
            message: "회원가입에 성공했습니다. 잠시후 로그인페이지로 이동합니다.",
            redirectUrl: "/register/complete",
        });
    }
}
