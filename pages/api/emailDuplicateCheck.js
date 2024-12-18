import { connectDB } from "../../util/database";

export default async function handler(req, res) {
    if (req.method == "POST") {
        try {
            let db = (await connectDB).db("millivie");
            const emailList = await db.collection("user_cred").findOne({ email: req.body.email });
            if (emailList) {
                res.status(409).json({
                    message: "이미 사용중인 이메일입니다.",
                });
            } else {
                res.status(200).json({
                    message: "사용가능한 이메일 입니다.",
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json("서버에러");
        }
    } else {
        res.status(405).end();
    }
}
