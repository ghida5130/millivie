import Image from "next/image";
import styles from "/styles/loading.module.css";

const loading = {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};

export default function Loading() {
    return (
        // <div style={loading}>
        //     <Image src="/loading.webp" width="120" height="120" alt=""></Image>
        // </div>
        <div className={styles.wrap}>
            <div className={styles.dotSpinner}>
                <div className={styles.dotSpinner__dot} />
                <div className={styles.dotSpinner__dot} />
                <div className={styles.dotSpinner__dot} />
                <div className={styles.dotSpinner__dot} />
                <div className={styles.dotSpinner__dot} />
                <div className={styles.dotSpinner__dot} />
                <div className={styles.dotSpinner__dot} />
                <div className={styles.dotSpinner__dot} />
            </div>
        </div>
    );
}
