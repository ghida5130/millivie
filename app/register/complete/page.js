"use client";

import Image from "next/image";
import styles from "/styles/registerComplete.module.css";
import Link from "next/link";

export default function Complete() {
    return (
        <div>
            <div className={styles.loginWrap}>
                <div className={styles.loginArea}>
                    <div className={styles.iconArea}>
                        <Image src="/millivieIcon.svg" width="50" height="50" alt=""></Image>
                        Millivie
                    </div>
                    <div className={styles.loginText}>회원가입이 완료되었습니다</div>
                    <div className={styles.btnArea}>
                        <Link href="/" className={styles.btn}>
                            메인으로
                        </Link>
                        <Link href="/login" className={styles.btn}>
                            로그인
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
