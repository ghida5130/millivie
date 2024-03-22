"use client";

import { useState } from "react";

import styles from "/styles/navBar.module.css";

export default function NavBar() {
    let [navBarOver, setNavBarOver] = useState(false);

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
                <NavBarIcon
                    link="/"
                    name="Home"
                    select="home"
                    setNavBarOver={setNavBarOver}
                ></NavBarIcon>
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
            </div>
            {/* <div className="navBarBackground navBarDisplayBlock">test</div> */}
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
