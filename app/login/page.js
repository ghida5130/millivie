"use client";

import Image from "next/image";
import styles from "/styles/login.module.css";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        if (result.error) {
            setError(result.error);
        } else {
            // 로그인 성공 시 리다이렉트
            window.location.href = "/";
        }
    };

    const credentialsAction = (formData) => {
        signIn("credentials", formData);
    };

    return (
        <div>
            <div className={styles.loginWrap}>
                <div className={styles.loginArea}>
                    <div className={styles.iconArea}>
                        <Image src="/millivieIcon.svg" width="50" height="50" alt=""></Image>
                        Millivie
                    </div>
                    <div className={styles.loginText}>로그인</div>
                    <div className={styles.normalLoginArea}>
                        <form onSubmit={handleSubmit} className={styles.formWrap}>
                            <div>
                                <label htmlFor="credentials-email">Email</label>
                                <input
                                    type="email"
                                    id="credentials-email"
                                    name="email"
                                    className={styles.inputArea}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="credentials-password">Password</label>
                                <input
                                    type="password"
                                    id="credentials-password"
                                    name="password"
                                    className={styles.inputArea}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className={styles.loginBtn}>
                                로그인
                            </button>
                            {error && <p style={{ color: "red" }}>{error}</p>}
                        </form>
                        <div className={styles.accountInfoWrap}>
                            <a href="/register">회원가입</a>
                            <p style={{ margin: "0 10px" }}>|</p>
                            <a>계정복구</a>
                        </div>
                    </div>
                    <div className={styles.or}>
                        <p>또는</p>
                    </div>
                    <div className={styles.oAuthLoginArea}>
                        <button
                            onClick={() => {
                                signIn("kakao", {
                                    redirect: true,
                                    callbackUrl: "/",
                                });
                            }}
                        >
                            <Image src="/kakao_login_icon.png" width="183" height="45" alt=""></Image>
                        </button>
                        <button
                            onClick={() => {
                                signIn("github", {
                                    redirect: true,
                                    callbackUrl: "/",
                                });
                            }}
                        >
                            <Image src="/github_login_icon.png" width="183" height="45" alt=""></Image>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
