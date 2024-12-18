"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import styles from "/styles/navBar.module.css";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function NavBar({ session }) {
    const [navBarOver, setNavBarOver] = useState(false);
    const [nowInnerSelect, setNowInnerSelect] = useState(1);
    const [innerOpacity, setInnerOpacity] = useState(1);
    const [userPopupActive, setUserPopupActive] = useState(false);
    const [searchPlaceHolder, setSearchPlaceHolder] = useState("영화 검색");
    const divRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        setInnerOpacity(0);
        setTimeout(() => {
            setInnerOpacity(1);
        }, 50);
    }, [nowInnerSelect]);

    const handleMouseOver = () => {
        setUserPopupActive(true);
    };

    const handleMouseOut = (event) => {
        if (!divRef.current.contains(event.relatedTarget) && !buttonRef.current.contains(event.relatedTarget)) {
            setUserPopupActive(false);
        }
    };

    return (
        <div>
            <div
                className={`${styles.navBar} ${navBarOver ? styles.navBarOver : ""}`}
                onMouseLeave={() => {
                    setNavBarOver(false);
                }}
            >
                <div className={styles.navBarWrap}>
                    <div className={styles.mainIconArea}>
                        <div>
                            <a
                                className={styles.millivieIcon}
                                href="/"
                                onMouseOver={() => {
                                    setNavBarOver(false);
                                }}
                            >
                                <Image src="/millivieIcon.svg" width="20" height="20" alt=""></Image>
                                Millivie
                            </a>
                        </div>
                    </div>
                    <div className={styles.iconArea}>
                        <NavBarIcon
                            name="영화"
                            select="list"
                            setNavBarOver={setNavBarOver}
                            setNowInnerSelect={setNowInnerSelect}
                            number={1}
                        ></NavBarIcon>
                        <NavBarIcon
                            name="탐색"
                            select="rank"
                            setNavBarOver={setNavBarOver}
                            setNowInnerSelect={setNowInnerSelect}
                            number={2}
                        ></NavBarIcon>
                        <NavBarIcon
                            name="커뮤니티"
                            select="community"
                            setNavBarOver={setNavBarOver}
                            setNowInnerSelect={setNowInnerSelect}
                            number={3}
                        ></NavBarIcon>
                    </div>
                    <div className={styles.searchArea}>
                        <form className={styles.searchFormArea} action="/search" method="get">
                            <input
                                onMouseOver={() => {
                                    setNavBarOver(false);
                                }}
                                className={styles.searchTextArea}
                                name="query"
                                type="text"
                                placeholder={searchPlaceHolder}
                                onFocus={() => setSearchPlaceHolder("")}
                                onBlur={() => setSearchPlaceHolder("영화 검색")}
                            ></input>
                            <button type="submit" style={{ height: "20px" }}>
                                <Image src="/searchIcon.svg" width="20" height="20" alt=""></Image>
                            </button>
                        </form>
                    </div>
                    <div className={styles.userWrap}>
                        <Link
                            ref={buttonRef}
                            className={styles.userArea}
                            onMouseEnter={handleMouseOver}
                            onMouseOut={handleMouseOut}
                            href={!session ? "/login" : "/mypage"}
                            style={{ cursor: "pointer" }}
                        >
                            <Image src="/userIcon.svg" width="33" height="33" alt=""></Image>
                        </Link>
                    </div>
                    <div className={`${styles.innerWrap} ${navBarOver ? styles.innerWrapOver : ""}`}>
                        {nowInnerSelect === 1 && <MovieInner innerOpacity={innerOpacity} />}
                        {nowInnerSelect === 2 && <RankInner innerOpacity={innerOpacity} />}
                        {nowInnerSelect === 3 && <CommunityInner innerOpacity={innerOpacity} />}
                    </div>
                    <div
                        className={`${styles.userPopupWrap} ${userPopupActive && styles.active}`}
                        ref={divRef}
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}
                    >
                        <div style={{ height: "10px" }}></div>
                        <div className={styles.userPopupArea}>
                            {session ? (
                                <>
                                    <Link href="/mypage">마이페이지</Link>
                                    <button
                                        onClick={() => {
                                            signOut({ callbackUrl: "/login" });
                                        }}
                                    >
                                        로그아웃
                                    </button>
                                </>
                            ) : (
                                <Link href="/login">로그인</Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function NavBarIcon(props) {
    return (
        <button
            className={styles.navBarIcon}
            onMouseOver={() => {
                if (props.name != "Home") {
                    props.setNavBarOver(true);
                    props.setNowInnerSelect(props.number);
                }
            }}
        >
            {props.name}
        </button>
    );
}

function InnerIcon(props) {
    return (
        <a style={{ fontSize: props.fontSize }} className={styles.innerIcon}>
            {props.name}
        </a>
    );
}

function MovieInner(props) {
    return (
        <div
            className={styles.innerArea}
            style={{
                opacity: props.innerOpacity,
                transition: "opacity 0.3s ease",
            }}
        >
            <div className={styles.innerBox}>
                <div
                    style={{
                        fontSize: "14px",
                        marginBottom: "3px",
                        color: "rgb(180, 180, 180)",
                    }}
                >
                    영화
                </div>
                <InnerIcon name="영화 소식" fontSize="24px"></InnerIcon>
                <InnerIcon name="최신 영화" fontSize="24px"></InnerIcon>
                <InnerIcon name="최근 개봉 영화" fontSize="24px"></InnerIcon>
                <InnerIcon name="Top 100" fontSize="24px"></InnerIcon>
                <InnerIcon name="Top 240" fontSize="24px"></InnerIcon>
                <InnerIcon name="가장 유명한 영화" fontSize="24px"></InnerIcon>
            </div>
            <div className={styles.innerBox}>
                <div
                    style={{
                        fontSize: "14px",
                        marginBottom: "3px",
                        color: "rgb(180, 180, 180)",
                    }}
                >
                    랭킹
                </div>
                <InnerIcon name="최근 인기 순위"></InnerIcon>
                <InnerIcon name="연도별 인기 순위"></InnerIcon>
                <InnerIcon name="장르별 인기 순위"></InnerIcon>
                <InnerIcon name="인기 순위 (Global)"></InnerIcon>
            </div>
        </div>
    );
}

function RankInner(props) {
    return (
        <div
            className={styles.innerArea}
            style={{
                opacity: props.innerOpacity,
                transition: "opacity 0.3s ease",
            }}
        >
            <div className={styles.innerBox}>
                <div
                    style={{
                        fontSize: "14px",
                        marginBottom: "3px",
                        color: "rgb(180, 180, 180)",
                    }}
                >
                    탐색
                </div>
                <InnerIcon name="제목으로 찾기" fontSize="24px"></InnerIcon>
                <InnerIcon name="장르로 찾기" fontSize="24px"></InnerIcon>
                <InnerIcon name="개봉 날짜로 찾기" fontSize="24px"></InnerIcon>
                <InnerIcon name="준비중" fontSize="24px"></InnerIcon>
            </div>
            <div className={styles.innerBox}>
                <div
                    style={{
                        fontSize: "14px",
                        marginBottom: "3px",
                        color: "rgb(180, 180, 180)",
                    }}
                >
                    키워드
                </div>
                <InnerIcon name="국가별 순위"></InnerIcon>
                <InnerIcon name="장르별 순위"></InnerIcon>
                <InnerIcon name="날짜별 순위"></InnerIcon>
                <InnerIcon name="키워드별 순위"></InnerIcon>
            </div>
        </div>
    );
}
function CommunityInner(props) {
    return (
        <div
            className={styles.innerArea}
            style={{
                opacity: props.innerOpacity,
                transition: "opacity 0.3s ease",
            }}
        >
            <div className={styles.innerBox}>
                <div
                    style={{
                        fontSize: "14px",
                        marginBottom: "3px",
                        color: "rgb(180, 180, 180)",
                    }}
                >
                    커뮤니티
                </div>
                <InnerIcon name="준비중" fontSize="24px"></InnerIcon>
            </div>
        </div>
    );
}
