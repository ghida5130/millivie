"use client";

import Image from "next/image";
import styles from "/styles/home.module.css";
import { useState, useEffect } from "react";

export default function TopRated() {
    let [topRatedMovies, setTopRatedMovies] = useState();
    const arrTest = [10, 20, 30, 40, 50, 60];

    useEffect(() => {
        fetch(
            "https://api.themoviedb.org/3/movie/top_rated?api_key=5f03a67b305fd473b7d178b0612c734e&language=ko-KR",
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
                setTopRatedMovies(result.results);
            })
            .catch((error) => {
                console.log("Network/ajax Error");
            });
    }, []);

    return (
        <div className={styles.newAndNotableWrap}>
            <h1 style={{ fontWeight: "700" }}>최고 평점</h1>
            <div className={styles.newAndNotableBoxArea}>
                {topRatedMovies ? (
                    topRatedMovies.map((a, i) => {
                        if (i < 6) {
                            return (
                                <div
                                    style={{
                                        background: `linear-gradient(
                                            rgba(0, 0, 0, 0.2) 0%,
                                            rgba(0, 0, 0, 0) 50%,
                                            rgba(0, 0, 0, 0.9) 100%,black),
                                            url("https://image.tmdb.org/t/p/w342${a.poster_path}")
                                            center top/cover`,
                                        display: "flex",
                                        flexDirection: "column",
                                        height: "100%",
                                        width: "15%",
                                        padding: "10px",
                                        justifyContent: "end",
                                    }}
                                >
                                    {a.title}
                                </div>
                            );
                        }
                    })
                ) : (
                    <div>Loading...</div>
                )}
            </div>
        </div>
    );
}

function NewAndNotableBox(props) {
    return;
}
