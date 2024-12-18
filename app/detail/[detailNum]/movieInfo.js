"use client";

import Image from "next/image";
import styles from "/styles/detail.module.css";
import { useEffect, useState } from "react";
import AddReview from "./addReview";
import CustomAlert from "../../components/customAlert";
import * as clm from "country-locale-map";

export default function MovieInfo({ props, reviewData, session, isFavorite, avgRatingData }) {
    reviewData = JSON.parse(reviewData);
    avgRatingData = JSON.parse(avgRatingData);
    session = JSON.parse(session);
    const detailNum = props.params.detailNum;
    const [pageLoading, setPageLoading] = useState(false);
    const [movieDetailData, setMovieDetailData] = useState();
    const [movieVideoInfo, setMovieVideoInfo] = useState();
    const [reviewModal, setReviewModal] = useState(false);
    const [customAlert, setCustomAlert] = useState(false);
    const [customAlertMessage, setCustomAlertMessage] = useState("");
    const [nowReviewData, setNowReviewData] = useState(reviewData);
    const [nowIsFavorite, setNowIsFavorite] = useState(isFavorite);

    // 현재 페이지의 영화정보를 세션 스토리지 최근 본 영화 목록에 저장
    useEffect(() => {
        let viewedItems = JSON.parse(sessionStorage.getItem("recentlyViewed")) || [];
        viewedItems = viewedItems.filter((viewedItem) => viewedItem !== detailNum);
        viewedItems.unshift(detailNum);

        if (viewedItems.length > 6) {
            viewedItems.pop();
        }

        sessionStorage.setItem("recentlyViewed", JSON.stringify(viewedItems));
    }, []);

    const firstMovieVideo = {
        display: "flex",
        flexDirection: "column",
        background: `linear-gradient(
            rgba(0, 0, 0, 0.3) 0%,
            rgba(0, 0, 0, 0) 50%,
            rgba(0, 0, 0, 0.9) 90%,black),
            url('https://img.youtube.com/vi/${
                movieVideoInfo && movieVideoInfo.results.length != 0
                    ? movieVideoInfo.results[movieVideoInfo.results.length - 1].key
                    : ""
            }/0.jpg')
            center/125%`,
        height: "44%",
        width: "100%",
        padding: "20px",
        paddingTop: "80px",
        justifyContent: "space-between",
    };

    const secondMovieVideo = {
        display: "flex",
        flexDirection: "column",
        background: `linear-gradient(
            rgba(0, 0, 0, 0.3) 0%,
            rgba(0, 0, 0, 0) 50%,
            rgba(0, 0, 0, 0.9) 90%,black),
            url('https://img.youtube.com/vi/${
                movieVideoInfo && movieVideoInfo.results.length > 1
                    ? movieVideoInfo.results[movieVideoInfo.results.length - 2].key
                    : ""
            }/0.jpg')
            center/125%`,
        height: "44%",
        width: "100%",
        padding: "20px",
        paddingTop: "80px",
        justifyContent: "space-between",
    };

    const headerBackground = {
        position: "fixed",
        top: "0",
        backgroundImage: `url("https://image.tmdb.org/t/p/w1280${movieDetailData ? movieDetailData.poster_path : ""}")`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        opacity: "0.4",
        width: "100vw",
        height: "100vh",
        filter: "blur(35px)",
        zIndex: "-1",
    };

    const posterImageBackground = {
        background: `linear-gradient(
            rgba(0, 0, 0, 0.3) 0%,
            rgba(0, 0, 0, 0) 50%,
            rgba(0, 0, 0, 0.9) 100%,black),
            url("https://image.tmdb.org/t/p/w1280${movieDetailData ? movieDetailData.poster_path : ""}")
            center center/cover`,
    };

    useEffect(() => {
        fetch(
            `https://api.themoviedb.org/3/movie/${detailNum}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=ko-KR`,
            {
                method: "GET",
            }
        )
            .then((r) => {
                if (r.status == 200) {
                    return r.json();
                } else {
                    console.log("Server Error");
                }
            })
            .then((result) => {
                console.log("Success");
                setMovieDetailData(result);
            })
            .catch((error) => {
                console.log("Network/ajax Error");
            });

        fetch(
            `https://api.themoviedb.org/3/movie/${detailNum}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=ko-KR`,
            {
                method: "GET",
            }
        )
            .then((r) => {
                if (r.status == 200) {
                    return r.json();
                } else {
                    console.log("Server Error");
                }
            })
            .then((result) => {
                console.log("Success");
                setMovieVideoInfo(result);
            })
            .catch((error) => {
                console.log("Network/ajax Error");
            })
            .finally(() => {
                setTimeout(() => {
                    setPageLoading(true);
                }, 200);
            });
    }, []);

    const addFavorite = async () => {
        const response = await fetch("/api/addFavorite", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_email: session.user.email, movie_id: detailNum }),
        });

        const data = await response.json();

        if (response.status === 200) {
            console.log("추가 성공");
            setNowIsFavorite(data);
        } else {
            console.log("추가 실패");
        }
    };
    const removeFavorite = async () => {
        const response = await fetch("/api/removeFavorite", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_email: session.user.email, movie_id: detailNum }),
        });

        const data = await response.json();

        if (response.status === 200) {
            console.log("삭제 성공");
            setNowIsFavorite(data);
        } else {
            console.log("삭제 실패");
        }
    };

    if (!movieDetailData) {
        return <div></div>;
    } else {
        return (
            <div>
                <div style={headerBackground}></div>
                <div className={`${styles.wrapBefore} ${pageLoading && styles.wrapAfter}`}>
                    <div className={styles.header}>
                        <div className={styles.topMovieRankWrap}>
                            <div className={styles.moviePosterWrap}>
                                <div className={styles.posterImage} style={posterImageBackground}>
                                    {session ? (
                                        nowIsFavorite ? (
                                            <button
                                                className={styles.likeBtn}
                                                onClick={() => {
                                                    removeFavorite();
                                                    setCustomAlertMessage("🖤 즐겨찾기 제거 완료");
                                                    setCustomAlert(true);
                                                }}
                                            >
                                                <Image src="/fullHeart.svg" width="30" height="30" alt="like"></Image>
                                            </button>
                                        ) : (
                                            <button
                                                className={styles.likeBtn}
                                                onClick={() => {
                                                    addFavorite();
                                                    setCustomAlertMessage("❤️ 즐겨찾기 추가 완료");
                                                    setCustomAlert(true);
                                                }}
                                            >
                                                <Image src="/emptyHeart.svg" width="30" height="30" alt="like"></Image>
                                            </button>
                                        )
                                    ) : (
                                        <button
                                            className={styles.likeBtn}
                                            onClick={() => {
                                                setCustomAlertMessage("⚠️ 로그인이 필요합니다");
                                                setCustomAlert(true);
                                            }}
                                        >
                                            <Image src="/emptyHeart.svg" width="30" height="30" alt="like"></Image>
                                        </button>
                                    )}

                                    <div style={{ fontSize: "50px" }}>{movieDetailData.title}</div>
                                    <div style={{ fontSize: "18px" }}>{movieDetailData.original_title}</div>
                                </div>
                            </div>
                            <div className={styles.movieInfoWrap}>
                                <div className={styles.movieInfoArea1}>
                                    <div className={styles.rankInfoArea} style={{ textAlign: "center" }}>
                                        <Image
                                            src="/emptyMedal.svg"
                                            width="40"
                                            height="40"
                                            alt=""
                                            style={{ margin: "auto" }}
                                        ></Image>
                                        <h5
                                            style={{
                                                margin: "10px 0px",
                                            }}
                                        >
                                            전체 -위
                                        </h5>
                                    </div>
                                    <div className={styles.movieDetailArea}>
                                        <div className={styles.safeIndexArea}>
                                            <h3>안심 관람 지수</h3>
                                            <img
                                                src="/stopSign.svg"
                                                style={{
                                                    height: "40px",
                                                    marginBottom: "10px",
                                                }}
                                            ></img>
                                        </div>
                                        <h4>
                                            {movieDetailData.genres[0].name} |{" "}
                                            {clm.getCountryNameByAlpha2(movieDetailData.origin_country[0])} |{" "}
                                            {movieDetailData.runtime}분
                                        </h4>
                                        <h4>{movieDetailData.release_date}</h4>

                                        <h5 className={styles.movieDetailExplain}>{movieDetailData.overview}</h5>
                                        <button className={styles.movieDetailExplainExtensionButton}>▾</button>
                                    </div>
                                    <button
                                        className={styles.reservationButton}
                                        onClick={() => {
                                            setCustomAlertMessage("🛠️ 준비중입니다");
                                            setCustomAlert(true);
                                        }}
                                    >
                                        <Image src="/ticket.svg" width="20" height="20" alt=""></Image>
                                        예매 하기
                                    </button>
                                </div>
                                <div className={styles.movieInfoArea2}>
                                    <div className={styles.ratingArea}>
                                        <h4>관람객 평점</h4>
                                        <Image
                                            src="/ratingStar.svg"
                                            width="20"
                                            height="20"
                                            style={{ marginLeft: "10px" }}
                                            alt=""
                                        ></Image>
                                        <h3 style={{ marginLeft: "10px" }}>
                                            {avgRatingData ? Math.floor(avgRatingData.avgRating * 100) / 100 : <p>-</p>}
                                        </h3>
                                    </div>
                                    <div className={styles.reviewBoxArea}>
                                        {nowReviewData.length > 0 ? (
                                            nowReviewData.map((a, i) => {
                                                return (
                                                    <div className={styles.reviewBox} key={i}>
                                                        <div className={styles.reviewTextBox}>
                                                            <h5>{a.content}</h5>
                                                        </div>
                                                        <div className={styles.reviewRatingBox}>
                                                            <Image
                                                                src="/ratingStar.svg"
                                                                width="15"
                                                                height="15"
                                                                alt=""
                                                            ></Image>
                                                            <h4
                                                                style={{
                                                                    marginLeft: "5px",
                                                                }}
                                                            >
                                                                {a.rating}
                                                            </h4>
                                                            <h5
                                                                style={{
                                                                    marginLeft: "auto",
                                                                    color: "rgb(150, 150, 150)",
                                                                }}
                                                            >
                                                                {a.user_name.length > 4
                                                                    ? a.user_name.slice(0, 4) + "****"
                                                                    : a.user_name.slice(0, 1) + "****"}
                                                            </h5>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        ) : (
                                            <div className={styles.emptyReviewBox}>
                                                <p>작성된 평가가 없습니다.</p>
                                                <p>지금 평가를 작성해보세요!</p>
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        className={styles.reviewButton}
                                        onClick={() => {
                                            setCustomAlertMessage("⚠️ 로그인이 필요합니다");
                                            session ? setReviewModal(true) : setCustomAlert(true);
                                        }}
                                    >
                                        <Image src="/pencil.svg" width="20" height="20" alt=""></Image>평가 남기기
                                    </button>
                                    {reviewModal && (
                                        <AddReview
                                            setReviewModal={setReviewModal}
                                            detailNum={detailNum}
                                            setCustomAlertMessage={setCustomAlertMessage}
                                            setCustomAlert={setCustomAlert}
                                            setNowReviewData={setNowReviewData}
                                        ></AddReview>
                                    )}
                                    {customAlert && (
                                        <CustomAlert
                                            message={customAlertMessage}
                                            duration={2000}
                                            onClose={() => {
                                                setCustomAlert(false);
                                            }}
                                        />
                                    )}
                                </div>
                                <div className={styles.movieInfoArea3}>
                                    {movieVideoInfo && movieVideoInfo.results.length != 0 ? (
                                        <a
                                            target="_blank"
                                            style={firstMovieVideo}
                                            href={`https://youtu.be/${
                                                movieVideoInfo.results[movieVideoInfo.results.length - 1].key
                                            }e-fHSc63W-U`}
                                        >
                                            <Image
                                                src="/youtube.svg"
                                                width="60"
                                                height="60"
                                                alt="like"
                                                style={{ alignSelf: "center", opacity: "0.9" }}
                                            ></Image>
                                            {movieVideoInfo.results[movieVideoInfo.results.length - 1].name}
                                        </a>
                                    ) : (
                                        <p className={styles.EmptyRelatedVideo}>관련 영상이 없습니다.</p>
                                    )}
                                    {movieVideoInfo && movieVideoInfo.results.length > 1 ? (
                                        <a
                                            target="_blank"
                                            style={secondMovieVideo}
                                            href={`https://youtu.be/${
                                                movieVideoInfo.results[movieVideoInfo.results.length - 2].key
                                            }e-fHSc63W-U`}
                                        >
                                            <Image
                                                src="/youtube.svg"
                                                width="60"
                                                height="60"
                                                alt="like"
                                                style={{ alignSelf: "center", opacity: "0.9" }}
                                            ></Image>
                                            {movieVideoInfo.results[movieVideoInfo.results.length - 2].name}
                                        </a>
                                    ) : (
                                        <p className={styles.EmptyRelatedVideo}>관련 영상이 없습니다.</p>
                                    )}
                                    <button
                                        onClick={() => {
                                            setCustomAlertMessage("🛠️ 준비중입니다");
                                            setCustomAlert(true);
                                        }}
                                        className={styles.movieVideoMore}
                                    >
                                        더보기
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
