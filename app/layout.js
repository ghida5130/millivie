import "./globals.css";
import NavBar from "./navBar";
import Footer from "./components/footer";
import { auth } from "@/auth";
import { suit } from "@/fonts/suit";

export const metadata = {
    title: "밀리비",
    description: "영화 정보 찾기",
};

export default async function RootLayout({ children }) {
    let session = await auth();
    return (
        <html lang="ko" className={suit.className}>
            <body>
                <NavBar session={session} />
                <div className="htmlTopMargin"></div>
                {children}
            </body>
        </html>
    );
}
