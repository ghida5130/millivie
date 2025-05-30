import styles from "/styles/home.module.css";
import Link from "next/link";

export default function UserFavoriteArea({ name, data }) {
    return (
        <div className={styles.newAndNotableWrap}>
            <h1 style={{ fontWeight: "700" }}>{name}</h1>
            <div className={`${data.length > 0 ? styles.newAndNotableBoxArea : styles.EmptyArea}`}>
                {data.map((a, i) => {
                    return (
                        <Link
                            href={`/detail/${a.id}`}
                            style={{
                                background: `linear-gradient(
                                            rgba(0, 0, 0, 0.2) 0%,
                                            rgba(0, 0, 0, 0) 50%,
                                            rgba(0, 0, 0, 0.9) 100%,black),
                                            url("https://image.tmdb.org/t/p/w342${a.poster_path}")
                                            center top/cover`,
                                display: "flex",
                                flexDirection: "column",
                                height: "100%",
                                width: "100%",
                                padding: "10px",
                                justifyContent: "end",
                            }}
                            key={i}
                        >
                            {a.title}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
