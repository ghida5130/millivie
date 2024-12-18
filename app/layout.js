import "./globals.css";
import NavBar from "./navBar";
import { getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import Footer from "./components/footer";
// import ReduxProvider from "../redux/provider";
// import { Provider } from "react-redux";
// import store from "../app/store.js";

export const metadata = {
    title: "밀리비",
    description: "안심하고 보는 영화",
};

export default async function RootLayout({ children }) {
    let session = await getServerSession(authOptions);
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
