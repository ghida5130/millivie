"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import styles from "/styles/navBar.module.css";

export default function NavBar() {
    const [navBarOver, setNavBarOver] = useState(false);

    return (
        <div>
            <div
                className={`${styles.navBar} ${
                    navBarOver ? styles.navBarOver : ""
                }`}
                onMouseLeave={() => {
                    setNavBarOver(false);
                }}
            >
                <div>
                    <a
                        className={styles.millivieIcon}
                        href="/"
                        onMouseOver={() => {
                            setNavBarOver(false);
                        }}
                    >
                        <Image
                            src="/millivieIcon.svg"
                            width="20"
                            height="20"
                            alt=""
                        ></Image>
                        Millivie
                    </a>
                </div>

                <NavBarIcon
                    link="/list"
                    name="영화"
                    select="list"
                    setNavBarOver={setNavBarOver}
                ></NavBarIcon>
                <NavBarIcon
                    link="/rank"
                    name="랭킹"
                    select="rank"
                    setNavBarOver={setNavBarOver}
                ></NavBarIcon>
                <NavBarIcon
                    link="/community"
                    name="커뮤니티"
                    select="community"
                    setNavBarOver={setNavBarOver}
                ></NavBarIcon>
                <NavBarIcon
                    link="/detail/1"
                    name="detail_test"
                    select="detail"
                    setNavBarOver={setNavBarOver}
                ></NavBarIcon>
                <form
                    className={styles.searchFormArea}
                    action="/search"
                    method="get"
                >
                    <input
                        onMouseOver={() => {
                            setNavBarOver(false);
                        }}
                        className={styles.searchTextArea}
                        name="query"
                        type="text"
                        placeholder="영화 검색"
                    ></input>
                    <button type="submit" style={{ height: "30px" }}>
                        <Image
                            src="/searchIcon.svg"
                            width="20"
                            height="20"
                            alt=""
                        ></Image>
                    </button>
                </form>
            </div>
        </div>
    );
}

function NavBarIcon(props) {
    return (
        <div>
            <a
                className={styles.navBarIcon}
                href={props.link}
                onMouseOver={() => {
                    if (props.name != "Home") {
                        props.setNavBarOver(true);
                    }
                }}
            >
                {props.name}
            </a>
        </div>
    );
}
