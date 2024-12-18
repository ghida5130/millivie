import cron from "node-cron";
import { connectDB } from "/util/database";
import { analyseReview } from "../lib/analyseReview";

export default async function handler(req, res) {
    if (req.method == "GET") {
        try {
            const db = (await connectDB).db("millivie");
            const reviews = await db.collection("review").find({ movie_id: "824364" }).toArray();
            console.log(reviews);

            // let result = await db.collection("review").insertOne(req.body);
            // let reviewData = await db
            //     .collection("review")
            //     .find({ movie_id: req.body.movie_id })
            //     .sort({ _id: -1 })
            //     .limit(4)
            //     .toArray();
            res.status(200).json("test");
        } catch (error) {
            console.error(error);
            res.status(500).json("서버에러");
        }
    } else {
        res.status(405).end();
    }
}
