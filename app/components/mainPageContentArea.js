import Image from "next/image";
import styles from "/styles/home.module.css";
import Link from "next/link";

export default function MainPageContentArea({ name, data }) {
    return (
        <div className={styles.newAndNotableWrap}>
            <h1 style={{ fontWeight: "700" }}>{name}</h1>
            <div className={styles.newAndNotableBoxArea}>
                {data.slice(0, 6).map((a, i) => (
                    <Link href={`/detail/${a.id}`} className={styles.newAndNotableItem} key={i}>
                        <div
                            style={{
                                position: "relative",
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                justifyContent: "end",
                                flexDirection: "column",
                            }}
                        >
                            <Image
                                src={`https://image.tmdb.org/t/p/w342${a.poster_path}`}
                                alt={a.title}
                                fill
                                style={{ objectFit: "cover", zIndex: -1 }}
                            />
                            <div
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    background: `linear-gradient(
                                        rgba(0, 0, 0, 0.2) 0%,
                                        rgba(0, 0, 0, 0) 50%,
                                        rgba(0, 0, 0, 0.9) 100%, black
                                    )`,
                                    zIndex: 0,
                                }}
                            />
                            <div style={{ zIndex: 1, padding: "10px", color: "white" }}>{a.title}</div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
