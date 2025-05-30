import MovieInfo from "./movieInfo.js";
import { connectDB } from "../../../util/database";
import { auth } from "@/auth";
import styles from "/styles/detail.module.css";

// components
import DetailPageRecommendArea from "../../components/detailPageRecommendArea.js";
import { safeFetch } from "../../../util/safeFetch.js";

export default async function Detail(props) {
    let session = await auth();

    // movie_id를 기준으로 영화 상세 정보 fetch
    let detailData = await safeFetch(
        "movie detail data",
        `https://api.themoviedb.org/3/movie/${props.params.detailNum}?api_key=${process.env.TMDB_API_KEY}&language=ko-KR`,
        {
            method: "GET",
            headers: { accept: "application/json" },
        }
    );

    // movie_id를 기준으로 영화 관련영상 정보 fetch
    let relatedVideoData = await safeFetch(
        "related video data",
        `https://api.themoviedb.org/3/movie/${props.params.detailNum}/videos?api_key=${process.env.TMDB_API_KEY}&language=ko-KR`,
        {
            method: "GET",
            headers: { accept: "application/json" },
        }
    );

    // movie_id를 기준으로 추천영화 fetch
    let recommendData = await safeFetch(
        "recommend data",
        `https://api.themoviedb.org/3/movie/${props.params.detailNum}/recommendations?api_key=${process.env.TMDB_API_KEY}&language=ko-KR`,
        {
            method: "GET",
            headers: { accept: "application/json" },
        }
    );

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
                detailNum={props.params.detailNum}
                reviewData={reviewData}
                session={session}
                isFavorite={isFavorite}
                avgRatingData={avgRatingData}
                detailData={detailData}
                relatedVideoData={relatedVideoData}
            ></MovieInfo>
            <div className={styles.container}>
                <DetailPageRecommendArea name="이 영화를 본 사용자들의 추천" data={recommendData} />
            </div>
        </div>
    );
}
