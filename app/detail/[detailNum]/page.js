import MovieInfo from "./movieInfo.js";
import { connectDB } from "../../../util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";
import styles from "/styles/detail.module.css";

// components
import DetailPageRecommendArea from "../../components/detailPageRecommendArea.js";

export default async function Detail(props) {
    let session = await getServerSession(authOptions);

    // movie_id로 현재 영화 리뷰데이터 가져오기
    const db = (await connectDB).db("millivie");
    let reviewData = await db
        .collection("review")
        .find({ movie_id: props.params.detailNum })
        .sort({ _id: -1 })
        .limit(4)
        .toArray();

    // movie_id로 현재 영화 평점 평균 가져오기
    let avgRatingData = await db.collection("average_rating").findOne({ movie_id: props.params.detailNum });

    //즐겨찾기 추가 여부 가져와 boolean으로 변환
    let isFavorite;
    if (session) {
        isFavorite = await db
            .collection("favorites")
            .findOne({ user_email: session.user.email, "favorites.movie_id": props.params.detailNum });
        isFavorite = !!isFavorite;
    } else isFavorite = false;

    reviewData = JSON.stringify(reviewData);
    session = JSON.stringify(session);
    avgRatingData = JSON.stringify(avgRatingData);

    return (
        <div>
            <MovieInfo
                props={props}
                reviewData={reviewData}
                session={session}
                isFavorite={isFavorite}
                avgRatingData={avgRatingData}
            ></MovieInfo>
            <div className={styles.container}>
                <DetailPageRecommendArea
                    name="이 영화를 본 사용자들의 추천"
                    movieId={props.params.detailNum}
                    pathName="recommendations"
                />
            </div>
        </div>
    );
}
