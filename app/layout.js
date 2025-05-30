import "./globals.css";
import NavBar from "./navBar";
import Footer from "./components/footer";
import { auth } from "@/auth";

export const metadata = {
    title: "밀리비",
    description: "안심하고 보는 영화",
};

export default async function RootLayout({ children }) {
    let session = await auth();
    return (
        <html lang="en">
            <body>
                <NavBar session={session} />
                <div className="htmlTopMargin"></div>
                {children}
                <Footer />
            </body>
        </html>
    );
}
