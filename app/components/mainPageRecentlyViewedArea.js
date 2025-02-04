"use client";

import Image from "next/image";
import styles from "/styles/home.module.css";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function MainPageRecentlyViewedArea({ name }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    let viewedItems;

    useEffect(() => {
        // 세션스토리지에서 최근 본 영화 목록 불러오기
        viewedItems = JSON.parse(sessionStorage.getItem("recentlyViewed")) || [];

        // 최근 본 영화 목록이 있을경우 목록에 있는 영화 정보 가져오기
        if (viewedItems) {
            const fetchDataFor = (number) => {
                return fetch(
                    `https://api.themoviedb.org/3/movie/${number}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=ko-KR`,
                    { method: "GET" }
                ).then((r) => {
                    if (r.status == 200) {
                        return r.json();
                    } else {
                        console.log("Server Error");
                    }
                });
            };

            const dataPromises = viewedItems.map(fetchDataFor);

            Promise.all(dataPromises)
                .then((allData) => {
                    setData(allData);
                    setLoading(false);
                })
                .catch((error) => {
                    setError(error.message);
                    setLoading(false);
                });
        }
    }, []);

    if (error) {
        return <>{error}</>;
    }
    if (loading) {
        return <>loading</>;
    }
    return (
        <div className={styles.newAndNotableWrap}>
            <h1 style={{ fontWeight: "700" }}>{name}</h1>
            <div className={`${data.length > 0 ? styles.newAndNotableBoxArea : styles.EmptyArea}`}>
                {data.length > 0 ? (
                    data.map((a, i) => {
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
                    })
                ) : (
                    <p>최근 조회한 영화가 없습니다.</p>
                )}
            </div>
        </div>
    );
}
