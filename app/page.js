"use client";

import Image from "next/image";
import styles from "/styles/home.module.css";
import { useEffect, useState } from "react";
import TopRated from "./TopRated.js";

const newAndNotableBox = {
    display: "flex",
    flexDirection: "column",
    background: `linear-gradient(
        rgba(0, 0, 0, 0.2) 0%,
        rgba(0, 0, 0, 0) 60%,
        rgba(0, 0, 0, 0.9) 100%,black),
        url('/exhuma.webp')`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    height: "100%",
    width: "15%",
    padding: "20px",
    justifyContent: "end",
};

export default function Home() {
    let nowMovieRank = 1;
    const [topMovieData, settopMovieData] = useState();
    const [topMovieNowNum, setTopMovieNowNum] = useState(0);
    const [fadeTest, setFadeTest] = useState();
    const [posterSize, setPosterSize] = useState("110%");

    useEffect(() => {
        fetch(
            "https://api.themoviedb.org/3/movie/popular?api_key=5f03a67b305fd473b7d178b0612c734e&language=ko-KR",
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
                settopMovieData(result);
            })
            .catch((error) => {
                console.log("Network/ajax Error");
            });
    }, []);

    const posterImage = {
        display: "flex",
        flexDirection: "column",
        background: `linear-gradient(
            rgba(0, 0, 0, 0.3) 0%,
            rgba(0, 0, 0, 0) 50%,
            rgba(0, 0, 0, 0.9) 100%,black),
            url("https://image.tmdb.org/t/p/w1280${
                topMovieData
                    ? topMovieData.results[topMovieNowNum].backdrop_path
                    : ""
            }")
            center center/auto ${posterSize}`,
        height: "100%",
        width: "100%",
        padding: "20px",
        justifyContent: "space-between",
        transition: "all 0.5s ease",
    };
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
        height: "49%",
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
        height: "49%",
        width: "100%",
        padding: "20px",
        justifyContent: "end",
    };

    return (
        <div className={styles.wrap}>
            <div className={styles.header}>
                <button
                    onClick={() => {
                        setFadeTest(styles.fadeTextActive);
                        setTimeout(() => {
                            if (topMovieNowNum == 0) {
                                setTopMovieNowNum(4);
                            } else {
                                var changeNum = topMovieNowNum - 1;
                                setTopMovieNowNum(changeNum);
                            }
                            setFadeTest();
                        }, 400);
                    }}
                >
                    <Image
                        src="/arrow.svg"
                        width="70"
                        height="70"
                        alt=""
                        style={{ transform: "scaleX(-1)" }}
                    ></Image>
                </button>
                <div className={styles.topMovieRankWrap}>
                    <div
                        className={styles.moviePosterWrap}
                        onClick={() => {
                            console.log("btn test");
                        }}
                    >
                        <div
                            onMouseOver={() => {
                                setPosterSize("120%");
                            }}
                            onMouseOut={() => {
                                setPosterSize("110%");
                            }}
                            style={posterImage}
                            className={`${styles.fadeText} ${fadeTest}`}
                        >
                            <div style={{ textAlign: "end" }}>
                                <Image
                                    src="/medal1.svg"
                                    width="80"
                                    height="60"
                                    alt=""
                                ></Image>
                                <h4>전체 랭킹 1위</h4>
                            </div>

                            <div>
                                <div style={{ fontSize: "50px" }}>
                                    {topMovieData
                                        ? topMovieData.results[topMovieNowNum]
                                              .title
                                        : ""}
                                </div>

                                <div style={{ fontSize: "18px" }}>
                                    {topMovieData
                                        ? topMovieData.results[topMovieNowNum]
                                              .original_title
                                        : ""}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.movieInfoWrap}>
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
                                <h3 style={{ marginLeft: "10px" }}>8.23</h3>
                            </div>
                            <div className={styles.reviewBoxArea}>
                                <UserReviewBox
                                    reviewText={
                                        "사무라이 형님 등장하시기 전까진 재밌었음.."
                                    }
                                    reviewRating={"7"}
                                    reviewID={"kang****"}
                                />
                                <UserReviewBox
                                    reviewText={
                                        "죽어서도 끊나지 않은 영혼의 한일전"
                                    }
                                    reviewRating={"8"}
                                    reviewID={"pon0****"}
                                />
                                <UserReviewBox
                                    reviewText={
                                        "영화룰 반으로 잘라서 평가하면 전반부는 정말 잘 만들었는데 후반부는 실망스럽다 다만 그래서 후반을 어떻게 해야 하냐고 물어본다면 흠 더 나은 방법이 있을까 싶다"
                                    }
                                    reviewRating={"7"}
                                    reviewID={"ndw8****"}
                                />
                                <UserReviewBox
                                    reviewText={
                                        "배우들 연기가 진짜 미쳤음!! 특히 김고은 연기... 와 선배 배우들이 왜 칭찬했는지 알거 같음"
                                    }
                                    reviewRating={"10"}
                                    reviewID={"kche****"}
                                />
                            </div>
                        </div>
                        <div className={styles.movieInfoArea3}>
                            <div style={firstMovieVideo}>1차 예고편</div>
                            <div style={secondMovieVideo}>2차 예고편</div>
                        </div>
                    </div>
                </div>
                <button
                    onClick={() => {
                        setFadeTest(styles.fadeTextActive);
                        setTimeout(() => {
                            if (topMovieNowNum == 4) {
                                setTopMovieNowNum(0);
                            } else {
                                var changeNum = topMovieNowNum + 1;
                                setTopMovieNowNum(changeNum);
                            }
                            setFadeTest();
                        }, 400);
                    }}
                >
                    <Image
                        src="/arrow.svg"
                        width="70"
                        height="70"
                        alt=""
                    ></Image>
                </button>
            </div>
            <div className={styles.container}>
                <TopRated />
                <div className={styles.newAndNotableWrap}>
                    <h1 style={{ fontWeight: "700" }}>트렌드</h1>
                    <div className={styles.newAndNotableBoxArea}>
                        <NewAndNotableBox movieName={"영화명1"} />
                        <NewAndNotableBox movieName={"영화명1"} />
                        <NewAndNotableBox movieName={"영화명1"} />
                        <NewAndNotableBox movieName={"영화명1"} />
                        <NewAndNotableBox movieName={"영화명1"} />
                        <NewAndNotableBox movieName={"영화명1"} />
                    </div>
                </div>
                <div className={styles.newAndNotableWrap}>
                    <h1 style={{ fontWeight: "700" }}>내 시청 리스트</h1>
                    <div className={styles.newAndNotableBoxArea}>
                        <NewAndNotableBox movieName={"영화명1"} />
                        <NewAndNotableBox />
                        <NewAndNotableBox />
                        <NewAndNotableBox />
                        <NewAndNotableBox />
                        <NewAndNotableBox />
                    </div>
                </div>
            </div>
            <div className={styles.footer}></div>
        </div>
    );
}

function NewAndNotableBox(props) {
    return <div style={newAndNotableBox}>{props.movieName}</div>;
}

function UserReviewBox(props) {
    return (
        <div className={styles.reviewBox}>
            <div className={styles.reviewTextBox}>
                <h5>{props.reviewText}</h5>
            </div>
            <div className={styles.reviewRatingBox}>
                <Image
                    src="/ratingStar.svg"
                    width="15"
                    height="15"
                    alt=""
                ></Image>
                <h4 style={{ marginLeft: "5px" }}>{props.reviewRating}</h4>
                <h5 style={{ marginLeft: "auto" }}>{props.reviewID}</h5>
            </div>
        </div>
    );
}
