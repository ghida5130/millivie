"use client";

import Image from "next/image";
import styles from "/styles/detail.module.css";

const headerBackground = {
    position: "fixed",
    backgroundImage: "url('/exhuma.webp')",
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
        rgba(0, 0, 0, 0.2) 0%,
        rgba(0, 0, 0, 0) 60%,
        rgba(0, 0, 0, 0.9) 100%,black),
        url('/exhuma.webp')`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    height: "100%",
    width: "100%",
    padding: "20px",
    justifyContent: "end",
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
    return (
        <div>
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
                            <div style={{ fontSize: "50px" }}>파묘</div>
                            <div style={{ fontSize: "18px" }}>Exhuma</div>
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
                                <h4>미스터리 | 대한민국 | 134분</h4>
                                <h4>2024.02.22</h4>

                                <h5 className={styles.movieDetailExplain}>
                                    미국 LA, 거액의 의뢰를 받은 무당
                                    ‘화림’(김고은)과 ‘봉길’(이도현)은 기이한
                                    병이 대물림되는 집안의 장손을 만난다. 조상의
                                    묫자리가 화근임을 알아챈 ‘화림’은 이장을
                                    권하고, 돈 냄새를 맡은 최고의 풍수사
                                    ‘상덕’(최민식)과 장의사 ‘영근’(유해진)이
                                    합류한다. “전부 잘 알 거야… 묘 하나 잘못
                                    건들면 어떻게 되는지” 절대 사람이 묻힐 수
                                    없는 악지에 자리한 기이한 묘. ‘상덕’은
                                    불길한 기운을 느끼고 제안을 거절하지만,
                                    ‘화림’의 설득으로 결국 파묘가 시작되고…
                                    나와서는 안될 것이 나왔다.
                                </h5>
                                <button
                                    className={
                                        styles.movieDetailExplainExtensionButton
                                    }
                                >
                                    +
                                </button>
                                <button className={styles.reservationButton}>
                                    예매 하기
                                </button>
                            </div>
                        </div>
                        <div className={styles.movieInfoArea2}>
                            <h4>관람객 / 네티즌 평점</h4>리뷰
                        </div>
                        <div className={styles.movieInfoArea3}>
                            <div style={firstMovieVideo}>1차 예고편</div>
                            <div style={secondMovieVideo}>2차 예고편</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
