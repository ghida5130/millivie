import Image from "next/image";
import styles from "/styles/mypage.module.css";
import { auth } from "@/auth";
import UserFavoriteArea from "../components/userFavoriteArea";
import MainPageRecentlyViewedArea from "../components/mainPageRecentlyViewedArea";
import { connectDB } from "../../util/database";
import { safeFetch } from "@/util/safeFetch";
import Footer from "../components/footer";

export default async function myPage() {
    let session = await auth();
    const db = (await connectDB).db("millivie");

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
            <div className={styles.mypageWrap}>
                <div className={styles.mypageArea}>
                    <div className={styles.myProfileArea}>
                        <Image src="/profileIcon.svg" width="150" height="150" alt=""></Image>
                        <p>{session.user.name}</p>
                        <p>{session.user.email ? session.user.email : <button>이메일 추가하기</button>}</p>
                    </div>
                </div>
            </div>
            <div className={styles.contentWrap}>
                <UserFavoriteArea name="👤 즐겨찾기 추가 한 영화" data={favoriteDetail} />
                <MainPageRecentlyViewedArea name="👤 최근 조회한 영화" />
            </div>
            <Footer />
        </div>
    );
}
