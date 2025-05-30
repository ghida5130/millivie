import styles from "/styles/loading.module.css";

export default function Loading() {
    return (
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
