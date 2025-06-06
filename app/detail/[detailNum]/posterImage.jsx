import Image from "next/image";
import styles from "/styles/detail.module.css";

export default function PosterImage({ path }) {
    return (
        <div className={styles.posterImageWrap}>
            <Image
                src={`https://image.tmdb.org/t/p/w500${path}`}
                alt="영화 포스터"
                fill
                style={{
                    objectFit: "cover",
                    zIndex: -1,
                }}
                priority
                fetchPriority="high"
            />
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background: `linear-gradient(
                                    rgba(0, 0, 0, 0.3) 0%,
                                    rgba(0, 0, 0, 0) 50%,
                                    rgba(0, 0, 0, 0.9) 100%, black
                                )`,
                    zIndex: 0,
                }}
            />
        </div>
    );
}
