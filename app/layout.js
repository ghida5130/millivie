"use client";
import "./globals.css";
import NavBar from "./navBar";
import { Provider } from "react-redux";
import store from "../app/store.js";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <div className="wrapper">
                    {/* <div className="blurText"></div> */}
                    <div className="blurText"></div>
                    <NavBar></NavBar>
                </div>
                <div className="htmlTopMargin"></div>
                <Provider store={store}>{children}</Provider>
            </body>
        </html>
    );
}

function NavBarIcon({ link, func }) {
    return (
        <a className="navBarIcon" href={link}>
            {func}
        </a>
    );
}
