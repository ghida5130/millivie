"use client";

import styles from "/styles/home.module.css";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function MainPageContentArea({ name, movieId, pathName }) {
    let [topRatedMovies, setTopRatedMovies] = useState();

    useEffect(() => {
        fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/${pathName}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=ko-KR`,
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
                setTopRatedMovies(result.results);
            })
            .catch((error) => {
                console.log("Network/ajax Error", error);
            });
    }, []);

    return (
        <div className={styles.newAndNotableWrap}>
            <h1 style={{ fontWeight: "700" }}>{name}</h1>
            <div className={styles.newAndNotableBoxArea}>
                {topRatedMovies ? (
                    topRatedMovies.map((a, i) => {
                        if (i < 6) {
                            return (
                                <Link
                                    href={`/detail/${a.id}`}
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
                                        width: "100%",
                                        padding: "10px",
                                        justifyContent: "end",
                                    }}
                                    key={i}
                                >
                                    {a.title}
                                </Link>
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
