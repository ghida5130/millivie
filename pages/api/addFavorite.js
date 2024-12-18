"use server";

import { connectDB } from "../../util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
    let session = await getServerSession(req, res, authOptions);

    if (req.method == "POST") {
        try {
            const db = (await connectDB).db("millivie");
            const userFavorites = await db.collection("favorites").findOne({ user_email: session.user.email });
            if (userFavorites) {
                await db.collection("favorites").updateOne(
                    {
                        user_email: req.body.user_email,
                    },
                    {
                        $push: {
                            favorites: {
                                movie_id: req.body.movie_id,
                                addedAt: new Date(),
                            },
                        },
                    }
                );
                let isFavorite = await db
                    .collection("favorites")
                    .findOne({ user_email: session.user.email, "favorites.movie_id": req.body.movie_id });
                isFavorite = !!isFavorite;
                res.status(200).json(isFavorite);
            } else {
                let result = await db.collection("favorites").insertOne({
                    user_email: req.body.user_email,
                    favorites: [
                        {
                            movie_id: req.body.movie_id,
                            addedAt: new Date(),
                        },
                    ],
                });
                let isFavorite = await db
                    .collection("favorites")
                    .findOne({ user_email: session.user.email, "favorites.movie_id": req.body.movie_id });
                isFavorite = !!isFavorite;
                res.status(200).json(isFavorite);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json("서버에러");
        }
    } else {
        res.status(405).end();
    }
}
