import Image from "next/image";
import styles from "@/styles/home.module.css";
import Link from "next/link";

export default function MainPageTopRatedArea({ name, data }) {
    return (
        <div className={styles.newAndNotableWrap}>
            <h1 style={{ fontWeight: "700" }}>{name}</h1>
            <div className={styles.newAndNotableBoxArea}>
                {data.slice(0, 6).map((a, i) => (
                    <Link href={`/detail/${a.id}`} className={styles.newAndNotableItem} key={i}>
                        <div className={styles.posterArea}>
                            <Image
                                src={`https://image.tmdb.org/t/p/w342${a.poster_path}`}
                                alt={"top rated movies : " + a.title}
                                fill
                                style={{ objectFit: "cover", zIndex: -1 }}
                                priority
                                fetchPriority="high"
                            />
                            <div className={styles.gradient} />
                            <div style={{ zIndex: 1, padding: "10px", color: "white" }}>{a.title}</div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
