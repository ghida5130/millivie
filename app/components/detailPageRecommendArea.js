"use client";

import { useEffect, useState } from "react";
import styles from "/styles/home.module.css";
import Link from "next/link";

export default function MainPageContentArea({ name, data }) {
    const [isVisible, setIsVisible] = useState(false);

    // 컴포넌트 마운트 시 opacity transition
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 100);

        return () => clearTimeout(timer);
    });
    if (data.errorCode) {
        return <div>{data.errorCode} Error</div>;
    }
    return (
        <div className={`${styles.wrapBefore} ${isVisible && styles.wrapAfter}`}>
            <h1 style={{ fontWeight: "700" }}>{name}</h1>
            <div className={styles.newAndNotableBoxArea}>
                {data.data.results.map((val, i) => {
                    if (i < 6) {
                        return (
                            <Link
                                href={`/detail/${val.id}`}
                                rel="nofollow"
                                style={{
                                    background: `linear-gradient(
                                            rgba(0, 0, 0, 0.2) 0%,
                                            rgba(0, 0, 0, 0) 50%,
                                            rgba(0, 0, 0, 0.9) 100%,black),
                                            url("https://image.tmdb.org/t/p/w342${val.poster_path}")
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
                                {val.title}
                            </Link>
                        );
                    }
                })}
            </div>
        </div>
    );
}
