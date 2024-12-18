import { connectDB } from "../../util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
    let session = await getServerSession(req, res, authOptions);
    if (session) {
        req.body.user_name = session.user.name;
    }

    if (req.method == "POST") {
        try {
            const db = (await connectDB).db("millivie");
            await db.collection("review").insertOne(req.body);
            let reviewData = await db
                .collection("review")
                .find({ movie_id: req.body.movie_id })
                .sort({ _id: -1 })
                .limit(4)
                .toArray();
            res.status(200).json(reviewData);

            let findReview = await db.collection("average_rating").findOne({ movie_id: req.body.movie_id });
            console.log(findReview);
            if (findReview) {
                let nowRating = findReview.avgRating;
                let nowCount = findReview.count;
                let newRating = (nowRating * nowCount + Number(req.body.rating)) / (nowCount + 1);
                let updateRating = await db.collection("average_rating").updateOne(
                    {
                        movie_id: req.body.movie_id,
                    },
                    {
                        $set: {
                            avgRating: newRating,
                            count: nowCount + 1,
                        },
                    }
                );
            } else {
                let addRating = await db.collection("average_rating").insertOne({
                    movie_id: req.body.movie_id,
                    avgRating: Number(req.body.rating),
                    count: 1,
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
