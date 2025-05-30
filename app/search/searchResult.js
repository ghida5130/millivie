"use client";

import Link from "next/link";
import styles from "/styles/search.module.css";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Loading from "../loading";

export default function SearchResult() {
    const searchParams = useSearchParams();
    const getItem = searchParams.get("query");
    const [movies, setMovies] = useState([]);
    const [searchPage, setSearchPage] = useState(1);
    const loader = useRef(null);
    const [nowPage, setNowPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [maxPage, setMaxPage] = useState(1);

    useEffect(() => {
        console.log(searchPage, nowPage, maxPage, "api req");
        if (getItem && searchPage <= maxPage) {
            fetch(`api/searchResult?query=${encodeURIComponent(getItem)}&page=${searchPage}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            })
                .then((res) => res.json())
                .then((result) => {
                    if (movies.length > 0) {
                        setMovies((prevData) => [...prevData, ...result.results]);
                        setNowPage((prev) => prev + 1);
                    } else {
                        setMovies(result.results);
                        setNowPage(1);
                    }
                    setLoading(false);
                    setMaxPage(result.total_pages);
                })
                .catch((err) => {
                    setError(true);
                    console.error(err);
                });
        }
    }, [searchPage]);

    useEffect(() => {
        if (searchPage <= maxPage) {
            const observer = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting && nowPage != 0) {
                        setSearchPage(searchPage + 1);
                    }
                },
                { threshold: 1 }
            );
            if (loader.current) observer.observe(loader.current);

            return () => observer.disconnect();
        }
    }, [nowPage]);

    if (loading) {
        return <Loading />;
    }
    return (
        <>
            <div className={styles.wrap}>
                <div className={styles.header}>
                    <div className={styles.titleWrap}>
                        <h1>"{getItem}" 검색 결과</h1>
                    </div>
                </div>
                <div className={styles.container}>
                    <div className={styles.searchResultsWrap}>
                        <div className={styles.searchResultsArea} style={{ width: "72vw" }}>
                            {movies.length > 0 ? (
                                movies.map((a, i) => (
                                    <Link
                                        key={a.title + i}
                                        style={{
                                            background: `linear-gradient(
                                        rgba(0, 0, 0, 0.2) 0%,
                                        rgba(0, 0, 0, 0) 50%,
                                        rgba(0, 0, 0, 0.9) 100%,black),
                                        url("https://image.tmdb.org/t/p/w342${a.poster_path}")
                                        center top/cover`,
                                            display: "flex",
                                            flexDirection: "column",
                                            width: "200px",
                                            height: "300px",
                                            padding: "10px",
                                            justifyContent: "end",
                                            margin: "15px 11px",
                                        }}
                                        href={`/detail/${a.id}`}
                                    >
                                        {a.title}
                                    </Link>
                                ))
                            ) : (
                                <div>검색결과가 없습니다.</div>
                            )}
                        </div>
                    </div>
                </div>
                <div ref={loader}></div>
            </div>
        </>
    );
}
