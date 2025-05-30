"use client";

import styles from "/styles/home.module.css";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function MainPageRecentlyViewedArea({ name }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const sessionItems = sessionStorage.getItem("recentlyViewed") || [];
        fetch("/api/itemsDetailData", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data: sessionItems }),
        })
            .then((res) => res.json())
            .then((result) => {
                setData(result);
                setLoading(false);
            })
            .catch((err) => {
                setError(true);
                console.error(err);
            });
    }, []);

    if (loading) return <div>Loading</div>;
    if (error) return <div>error</div>;
    return (
        <div className={styles.newAndNotableWrap}>
            <h1 style={{ fontWeight: "700" }}>{name}</h1>
            <div className={`${data.length > 0 ? styles.newAndNotableBoxArea : styles.EmptyArea}`}>
                {data.map((a, i) => {
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
                })}
            </div>
        </div>
    );
}
