import styles from "/styles/home.module.css";
import MainPageContentArea from "./components/mainPageContentArea";
import UserFavoriteArea from "./components/userFavoriteArea";
import MainPageRecentMovies from "./components/mainPageRecentMovies";
import MainPageRecentlyViewedArea from "./components/mainPageRecentlyViewedArea";
import MainPageTopRatedArea from "./components/mainPageTopRatedArea";
import { connectDB } from "../util/database";
import { auth } from "@/auth";
import { safeFetch } from "@/util/safeFetch";
import Footer from "./components/footer";

export const revalidate = 3600;

export default async function Home() {
    let session = await auth();
    let topMovieIds = [];
    const maxRank = 5;
    const db = (await connectDB).db("millivie");

    // 최고 평점 영화 데이터 fetch
    const topRatedData = await safeFetch(
        "top rated data",
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.TMDB_API_KEY}&language=ko-KR`,
        {
            method: "GET",
            headers: { accept: "application/json" },
        }
    );

    // 트렌드 영화 데이터 fetch
    const trendData = await safeFetch(
        "trend data",
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=ko-KR`,
        {
            method: "GET",
            headers: { accept: "application/json" },
        }
    );

    // 개봉예정 영화 데이터 fetch
    const upcomingData = await safeFetch(
        "upcoming data",
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_API_KEY}&language=ko-KR`,
        {
            method: "GET",
            headers: { accept: "application/json" },
        }
    );

    // Top5 영화 id 배열에 저장
    for (let i = 0; i < maxRank; i++) {
        topMovieIds[i] = String(trendData.data.results[i].id);
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

    // 사용자가 즐겨찾기한 영화 데이터 fetch
    let favoriteDetail = [];
    if (favoriteData) {
        const userFavoriteDataFor = async (number) => {
            const data = await safeFetch(
                "user favorite data",
                `https://api.themoviedb.org/3/movie/${number}?api_key=${process.env.TMDB_API_KEY}&language=ko-KR`,
                {
                    method: "GET",
                    headers: { accept: "application/json" },
                }
            );
            return data.data;
        };
        const favoriteDataSlice = favoriteData.slice(0, 6);
        const favoriteDataPromises = favoriteDataSlice.map(userFavoriteDataFor);
        favoriteDetail = await Promise.all(favoriteDataPromises);
    }

    return (
        <div className={styles.wrap}>
            <MainPageRecentMovies movieData={trendData.data} reviewData={reviewData} avgRatingData={avgRatingData} />
            <div className={styles.container}>
                <MainPageTopRatedArea name="최고평점" data={topRatedData.data.results} />
                <MainPageContentArea name="트렌드" data={trendData.data.results} />
                <UserFavoriteArea name="👤 즐겨찾기 추가 한 영화" data={favoriteDetail} />
                <MainPageRecentlyViewedArea name="👤 최근 조회한 영화" />
                <MainPageContentArea name="개봉 예정" data={upcomingData.data.results} />
            </div>
            <Footer />
        </div>
    );
}
