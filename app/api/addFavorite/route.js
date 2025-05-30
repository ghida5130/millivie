import { connectDB } from "@/util/database";
import { auth } from "@/auth";

export async function POST(request) {
    try {
        const session = await auth();
        if (!session) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const db = (await connectDB).db("millivie");

        const userFavorites = await db.collection("favorites").findOne({ user_email: session.user.email });

        if (userFavorites) {
            await db.collection("favorites").updateOne(
                { user_email: body.user_email },
                {
                    $push: {
                        favorites: {
                            movie_id: body.movie_id,
                            addedAt: new Date(),
                        },
                    },
                }
            );

            const isFavorite = await db.collection("favorites").findOne({
                user_email: session.user.email,
                "favorites.movie_id": body.movie_id,
            });

            return Response.json(!!isFavorite, { status: 200 });
        } else {
            await db.collection("favorites").insertOne({
                user_email: body.user_email,
                favorites: [
                    {
                        movie_id: body.movie_id,
                        addedAt: new Date(),
                    },
                ],
            });

            const isFavorite = await db.collection("favorites").findOne({
                user_email: session.user.email,
                "favorites.movie_id": body.movie_id,
            });

            return Response.json(!!isFavorite, { status: 200 });
        }
    } catch (error) {
        console.error(error);
        return Response.json({ error: "서버에러" }, { status: 500 });
    }
}
