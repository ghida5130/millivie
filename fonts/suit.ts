// app/fonts/suit.ts
import localFont from "next/font/local";

export const suit = localFont({
    src: [
        {
            path: "./SUIT-Regular.woff2",
            weight: "400",
            style: "normal",
        },
        {
            path: "./SUIT-Medium.woff2",
            weight: "500",
            style: "normal",
        },
        {
            path: "./SUIT-Semibold.woff2",
            weight: "600",
            style: "normal",
        },
        {
            path: "./SUIT-Bold.woff2",
            weight: "700",
            style: "normal",
        },
    ],
    display: "swap",
    variable: "--font-suit",
});
