"use client";

import styles from "/styles/search.module.css";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";

function Search() {
    const searchParams = useSearchParams();
    const getItem = searchParams.get("query");
    const [movies, setMovies] = useState([]);
    const [searchPage, setSearchPage] = useState(1);
    const loader = useRef(null);
    const [moviesStateChanged, setMoviesStateChanged] = useState(false);

    const searchResultsMovies = {
        backgroundImage: `linear-gradient(to right, skyblue, rgb(0, 101, 196)),
        radial-gradient(circle, white, black)`,
        width: "15%",
        height: "300px",
        marginTop: "30px",
    };

    useEffect(() => {
        if (getItem) {
            fetch(
                `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
                    getItem
                )}&include_adult=false&language=ko-KR&page=${searchPage}&api_key=5f03a67b305fd473b7d178b0612c734e`
            )
                .then((response) => response.json())
                .then((data) => {
                    setMovies((prevData) => [...prevData, ...data.results]);
                });
        }
    }, [searchPage]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    // setSearchPage(searchPage + 1);
                    setSearchPage((prevPage) => prevPage + 1);
                }
            },
            { threshold: 1 }
        );
        if (loader.current) {
            observer.observe(loader.current);
        }

        // Cleanup observer on component unmount
        return () => observer.disconnect();
    }, [moviesStateChanged]);

    useEffect(() => {
        if (!moviesStateChanged) {
            setMoviesStateChanged(true);
        }
    }, [movies]);

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
                        <div
                            className={styles.searchResultsArea}
                            style={{ width: "72vw" }}
                        >
                            {movies.length > 0 ? (
                                movies.map((a, i) => (
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
                                            height: "300px",
                                            padding: "10px",
                                            justifyContent: "end",
                                            margin: "15px 11px",
                                        }}
                                    ></div>
                                ))
                            ) : (
                                <div>Loading</div>
                            )}
                        </div>
                    </div>
                </div>
                <div ref={loader}></div>
            </div>
        </>
    );
}

export default Search;
