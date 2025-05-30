import styles from "/styles/home.module.css";
import MainPageContentArea from "./components/mainPageContentArea";
import UserFavoriteArea from "./components/userFavoriteArea";
import MainPageRecentMovies from "./components/mainPageRecentMovies";
import MainPageRecentlyViewedArea from "./components/mainPageRecentlyViewedArea";
import { connectDB } from "../util/database";
import { auth } from "@/auth";

export default async function Home() {
    let session = await auth();
    let movieData;
    let topMovieIds = [];
    const maxRank = 5;
    const db = (await connectDB).db("millivie");

    // 영화 Top5 TMDB API 요청
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=ko-KR`;
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
        },
    };
    try {
        const res = await fetch(url, options);
        if (!res.ok) {
            throw new Error("Network response was not ok");
        }
        movieData = await res.json();
    } catch (error) {
        console.error("Fetch error:", error);
        movieData = { error: "failed to fetch data" };
    }
    // Top5 영화 id 배열에 저장
    for (let i = 0; i < maxRank; i++) {
        topMovieIds[i] = String(movieData.results[i].id);
    }
    // MongoDB에서 Top5 영화 id를 통해 평균 평점 가져오기
    let avgRatingData = await db
        .collection("average_rating")
        .find({ movie_id: { $in: topMovieIds } })
        .toArray();
    avgRatingData = JSON.stringify(avgRatingData);

    // MongoDB에서 Top5 영화 id를 통해 리뷰데이터 가져오기
    let reviewData = await db
        .collection("review")
        .find({ movie_id: { $in: topMovieIds } })
        .toArray();
    reviewData = JSON.stringify(reviewData);

    // 즐겨찾기한 영화 리스트 불러오기
    let favoriteData;
    if (session) {
        const user = await db.collection("favorites").findOne({ user_email: session.user.email });
        if (user && user.favorites) {
            favoriteData = user.favorites.map((favorites) => favorites.movie_id);
        } else favoriteData = [];
    } else favoriteData = null;

    return (
        <div className={styles.wrap}>
            <MainPageRecentMovies movieData={movieData} reviewData={reviewData} avgRatingData={avgRatingData} />
            <div className={styles.container}>
                <MainPageContentArea name="최고평점" pathName="top_rated" />
                <MainPageContentArea name="트렌드" pathName="popular" />
                <UserFavoriteArea name="👤 즐겨찾기 추가 한 영화" favoriteData={favoriteData} />
                <MainPageRecentlyViewedArea name="👤 최근 조회한 영화" />
                <MainPageContentArea name="개봉 예정" pathName="upcoming" />
            </div>
        </div>
    );
}
