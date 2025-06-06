"use client";

import Image from "next/image";
import styles from "/styles/home.module.css";
import { useEffect, useState } from "react";
import Link from "next/link.js";

export default function MainPageRecentMovies({ movieData, reviewData, avgRatingData }) {
    const [topMovieNowNum, setTopMovieNowNum] = useState(0);
    const [posterSize, setPosterSize] = useState("110%");
    const [fade, setFade] = useState();
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    useEffect(() => {
        setIsImageLoaded(false);
    }, [topMovieNowNum]);

    reviewData = JSON.parse(reviewData);
    avgRatingData = JSON.parse(avgRatingData);
    let currentReviewData = reviewData.filter((review) => review.movie_id == movieData.results[topMovieNowNum].id);
    let currentAvgRatingData = avgRatingData.filter(
        (rating) => rating.movie_id == movieData.results[topMovieNowNum].id
    );
    if (currentReviewData.length > 4) currentReviewData = currentReviewData.slice(0, 4);

    return (
        <div>
            <div className={styles.header}>
                <button
                    onClick={() => {
                        setFade(styles.fadeTextActive);
                        setTimeout(() => {
                            if (topMovieNowNum == 0) {
                                setTopMovieNowNum(4);
                            } else {
                                var changeNum = topMovieNowNum - 1;
                                setTopMovieNowNum(changeNum);
                            }
                            setFade();
                        }, 400);
                    }}
                >
                    <Image
                        src="/arrow.svg"
                        width="70"
                        height="70"
                        alt=""
                        style={{ transform: "scaleX(-1)" }}
                        priority
                    />
                </button>
                <div className={styles.topMovieRankWrap}>
                    <Link href={`/detail/${movieData.results[topMovieNowNum].id}`} className={styles.moviePosterLink}>
                        <div
                            onMouseOver={() => {
                                setPosterSize("120%");
                            }}
                            onMouseOut={() => {
                                setPosterSize("110%");
                            }}
                            className={`${styles.fadeText} ${fade}`}
                            style={{
                                position: "relative",
                                overflow: "hidden",
                                height: "100%",
                                width: "100%",
                                transition: "all 0.5s ease",
                            }}
                        >
                            <Image
                                src={`https://image.tmdb.org/t/p/w1280${movieData.results[topMovieNowNum].backdrop_path}`}
                                alt="영화 배경"
                                fill
                                onLoadingComplete={() => setIsImageLoaded(true)}
                                style={{
                                    objectFit: "cover",
                                    transform: `scale(${posterSize})`,
                                    zIndex: -1,
                                    opacity: isImageLoaded ? 1 : 0,
                                    transition: "opacity 0.3s ease, transform 0.5s ease",
                                }}
                                priority
                            />
                            <div
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    background: `linear-gradient(
                                                    rgba(0, 0, 0, 0.3) 0%,
                                                    rgba(0, 0, 0, 0) 50%,
                                                    rgba(0, 0, 0, 0.9) 100%, black
                                                )`,
                                    zIndex: 0,
                                }}
                            />
                            <div
                                style={{
                                    position: "relative",
                                    zIndex: 1,
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    padding: "20px",
                                }}
                            >
                                <div style={{ textAlign: "end" }}>
                                    {/* <Image src="/medal1.svg" width="80" height="60" alt="" /> */}
                                </div>
                                <div>
                                    <div style={{ fontSize: "50px" }}>{movieData.results[topMovieNowNum].title}</div>
                                    <div style={{ fontSize: "18px" }}>
                                        {movieData.results[topMovieNowNum].original_title}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
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
                                    priority
                                />
                                <h3 style={{ marginLeft: "10px" }}>
                                    {currentAvgRatingData.length > 0 ? (
                                        <p>{Math.floor(currentAvgRatingData[0].avgRating * 100) / 100}</p>
                                    ) : (
                                        <p>-</p>
                                    )}
                                </h3>
                            </div>
                            {currentReviewData.length > 0 ? (
                                <div className={styles.reviewBoxArea}>
                                    {currentReviewData.map((a, i) => {
                                        return (
                                            <UserReviewBox
                                                key={i}
                                                reviewText={a.content}
                                                reviewRating={a.rating}
                                                reviewID={
                                                    a.user_name.length > 4
                                                        ? a.user_name.slice(0, 4) + "****"
                                                        : a.user_name.slice(0, 1) + "****"
                                                }
                                            />
                                        );
                                    })}
                                </div>
                            ) : (
                                <p className={styles.EmptyReviewArea}>작성된 평가가 없습니다.</p>
                            )}
                        </div>
                        <div className={styles.movieInfoArea3}>
                            <ReferenceBox
                                imagePath="/movieDetail.svg"
                                name="상세 정보"
                                movieData={movieData}
                                topMovieNowNum={topMovieNowNum}
                            />
                            <ReferenceBox
                                imagePath="/videoAndImage.svg"
                                name="관련 영상/이미지"
                                movieData={movieData}
                                topMovieNowNum={topMovieNowNum}
                            />
                            <ReferenceBox
                                imagePath="/review.svg"
                                name="평론가 평점/리뷰"
                                movieData={movieData}
                                topMovieNowNum={topMovieNowNum}
                            />
                        </div>
                    </div>
                </div>
                <button
                    onClick={() => {
                        setFade(styles.fadeTextActive);
                        setTimeout(() => {
                            if (topMovieNowNum == 4) {
                                setTopMovieNowNum(0);
                            } else {
                                var changeNum = topMovieNowNum + 1;
                                setTopMovieNowNum(changeNum);
                            }
                            setFade();
                        }, 400);
                    }}
                >
                    <Image src="/arrow.svg" width="70" height="70" alt="" priority />
                </button>
            </div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}>
                {Array.from({ length: 5 }, (_, i) => (
                    <div
                        key={i}
                        onClick={() => {
                            setFade(styles.fadeTextActive);
                            setTimeout(() => {
                                setTopMovieNowNum(i);
                                setFade();
                            }, 400);
                        }}
                        style={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            backgroundColor: topMovieNowNum === i ? "#e2e2e2" : "#505050",
                            cursor: "pointer",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: "15px",
                            marginBottom: "-15px",
                        }}
                    ></div>
                ))}
            </div>
        </div>
    );
}

function UserReviewBox(props) {
    return (
        <div className={styles.reviewBox}>
            <div className={styles.reviewTextBox}>
                <h5>{props.reviewText}</h5>
            </div>
            <div className={styles.reviewRatingBox}>
                <Image src="/ratingStar.svg" width="15" height="15" alt="" priority />
                <h4 style={{ marginLeft: "5px" }}>{props.reviewRating}</h4>
                <h5 style={{ marginLeft: "auto" }}>{props.reviewID}</h5>
            </div>
        </div>
    );
}

function ReferenceBox({ name, imagePath, movieData, topMovieNowNum }) {
    return (
        <Link href={`/detail/${movieData.results[topMovieNowNum].id}`} className={styles.movieReferenceButton}>
            <Image src={imagePath} width="50" height="50" alt="" priority />
            <p style={{ marginTop: "10px" }}>{name}</p>
        </Link>
    );
}
