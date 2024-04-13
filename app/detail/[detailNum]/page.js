"use client";

import Image from "next/image";
import styles from "/styles/detail.module.css";
import { Suspense, useEffect, useState } from "react";

const firstMovieVideo = {
    display: "flex",
    flexDirection: "column",
    background: `linear-gradient(
        rgba(0, 0, 0, 0.2) 0%,
        rgba(0, 0, 0, 0) 60%,
        rgba(0, 0, 0, 0.9) 100%,black),
        url('/firstMovieVideo.png')`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    height: "47%",
    width: "100%",
    padding: "20px",
    justifyContent: "end",
};
const secondMovieVideo = {
    display: "flex",
    flexDirection: "column",
    background: `linear-gradient(
        rgba(0, 0, 0, 0.2) 0%,
        rgba(0, 0, 0, 0) 60%,
        rgba(0, 0, 0, 0.9) 100%,black),
        url('/secondMovieVideo.png')`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    height: "47%",
    width: "100%",
    padding: "20px",
    justifyContent: "end",
};

export default function Detail() {
    const [wrapState, setWrapState] = useState();
    const [movieDetailData, setMovieDetailData] = useState();

    const headerBackground = {
        position: "fixed",
        backgroundImage: `url("https://image.tmdb.org/t/p/w1280${
            movieDetailData ? movieDetailData.poster_path : ""
        }")`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        opacity: "0.4",
        width: "100vw",
        height: "100vh",
        filter: "blur(35px)",
        zIndex: "-1",
    };

    const posterImage = {
        display: "flex",
        flexDirection: "column",
        background: `linear-gradient(
            rgba(0, 0, 0, 0.3) 0%,
            rgba(0, 0, 0, 0) 50%,
            rgba(0, 0, 0, 0.9) 100%,black),
            url("https://image.tmdb.org/t/p/w1280${
                movieDetailData ? movieDetailData.poster_path : ""
            }")
            center center/cover`,
        height: "100%",
        width: "100%",
        padding: "20px",
        justifyContent: "end",
    };

    useEffect(() => {
        fetch(
            "https://api.themoviedb.org/3/movie/634492?api_key=5f03a67b305fd473b7d178b0612c734e&language=ko-KR",
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
    }, []);

    useEffect(() => {
        setWrapState(styles.wrapAfter);
    }, [movieDetailData]);

    if (!movieDetailData) {
        return <div>Loading...</div>;
    } else {
        return (
            <div>
                <div className={`${styles.wrapBefore} ${wrapState}`}>
                    <div style={headerBackground}></div>
                    <div className={styles.header}>
                        <div className={styles.topMovieRankWrap}>
                            <div
                                className={styles.moviePosterWrap}
                                onClick={() => {
                                    console.log("btn test");
                                }}
                            >
                                <div style={posterImage}>
                                    <div style={{ fontSize: "50px" }}>
                                        {movieDetailData.title}
                                    </div>
                                    <div style={{ fontSize: "18px" }}>
                                        {movieDetailData.original_title}
                                    </div>
                                </div>
                            </div>
                            <div className={styles.movieInfoWrap}>
                                <div className={styles.movieInfoArea1}>
                                    <div
                                        className={styles.rankInfoArea}
                                        style={{ alignSelf: "center" }}
                                    >
                                        <img
                                            src="/medal1.svg"
                                            style={{
                                                height: "50px",
                                            }}
                                        ></img>
                                        <h5
                                            style={{
                                                textAlign: "center",
                                                marginBottom: "10px",
                                            }}
                                        >
                                            전체 1위
                                        </h5>
                                    </div>
                                    <div className={styles.movieDetailArea}>
                                        <div className={styles.safeIndexArea}>
                                            <h3>안심 관람 지수</h3>
                                            <img
                                                src="/safeIcon.svg"
                                                style={{
                                                    height: "45px",
                                                    marginBottom: "10px",
                                                }}
                                            ></img>
                                        </div>
                                        <h4>
                                            {movieDetailData.genres[0].name} |
                                            대한민국 | {movieDetailData.runtime}
                                            분
                                        </h4>
                                        <h4>{movieDetailData.release_date}</h4>

                                        <h5
                                            className={
                                                styles.movieDetailExplain
                                            }
                                        >
                                            {movieDetailData.overview}
                                        </h5>
                                        <button
                                            className={
                                                styles.movieDetailExplainExtensionButton
                                            }
                                        >
                                            +
                                        </button>
                                        <button
                                            className={styles.reservationButton}
                                        >
                                            예매 하기
                                        </button>
                                    </div>
                                </div>
                                <div className={styles.movieInfoArea2}>
                                    <h4>관람객 / 네티즌 평점</h4>리뷰
                                </div>
                                <div className={styles.movieInfoArea3}>
                                    <div style={firstMovieVideo}>
                                        1차 예고편
                                    </div>
                                    <div style={secondMovieVideo}>
                                        2차 예고편
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
