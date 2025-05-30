import { connectDB } from "@/util/database";
import { auth } from "@/auth";

export async function POST(request) {
    try {
        const session = await auth();
        console.log(session?.user);

        const body = await request.json();

        if (session) {
            body.user_name = session.user.name;
        }

        const db = (await connectDB).db("millivie");

        await db.collection("review").insertOne(body);

        const reviewData = await db
            .collection("review")
            .find({ movie_id: body.movie_id })
            .sort({ _id: -1 })
            .limit(4)
            .toArray();

        const findReview = await db.collection("average_rating").findOne({ movie_id: body.movie_id });
        console.log(findReview);

        if (findReview) {
            const nowRating = findReview.avgRating;
            const nowCount = findReview.count;
            const newRating = (nowRating * nowCount + Number(body.rating)) / (nowCount + 1);

            await db
                .collection("average_rating")
                .updateOne({ movie_id: body.movie_id }, { $set: { avgRating: newRating, count: nowCount + 1 } });
        } else {
            await db.collection("average_rating").insertOne({
                movie_id: body.movie_id,
                avgRating: Number(body.rating),
                count: 1,
            });
        }

        return Response.json(reviewData, { status: 200 });
    } catch (error) {
        console.error(error);
        return Response.json({ error: "서버에러" }, { status: 500 });
    }
}
