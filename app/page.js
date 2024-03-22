"use client";

import Image from "next/image";
import styles from "/styles/home.module.css";
import { useEffect, useState } from "react";

const posterImage = {
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
    width: "100%",
    padding: "20px",
    justifyContent: "space-between",
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
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        fetch(
            "https://api.themoviedb.org/3/movie/838209?api_key=5f03a67b305fd473b7d178b0612c734e&language=ko-KR",
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
                setUserData(result);
            })
            .catch((error) => {
                console.log("Network/ajax Error");
            });
    }, []);

    return (
        <div className={styles.wrap}>
            <div className={styles.header}>
                <button
                    onClick={() => {
                        console.log("A");
                    }}
                >
                    <img
                        src="/arrow.svg"
                        style={{ transform: "scaleX(-1)" }}
                    ></img>
                </button>
                <div className={styles.topMovieRankWrap}>
                    <div
                        className={styles.moviePosterWrap}
                        onClick={() => {
                            console.log("btn test");
                        }}
                    >
                        <div style={posterImage}>
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
                                    {userData ? userData.original_title : ""}
                                </div>

                                <div style={{ fontSize: "18px" }}>Exhuma</div>
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
                        console.log(userData.adult);
                    }}
                >
                    <img src="/arrow.svg"></img>
                </button>
            </div>
            <div className={styles.container}>
                <div className={styles.newAndNotableWrap}>
                    <h1 style={{ fontWeight: "800" }}>New and Notable</h1>
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
                    <h1 style={{ fontWeight: "800" }}>Featured Today</h1>
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
