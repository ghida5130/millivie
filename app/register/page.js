"use client";

import Image from "next/image";
import styles from "/styles/register.module.css";
import { useState } from "react";
import CustomAlert from "../components/customAlert";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailCheck, setEmailCheck] = useState(false); // 이메일 중복 확인 여부
    const [emailDuplicate, setEmailDuplicate] = useState(true); // 이메일 중복 여부 (중복일경우 true)
    const [emailDuplicateMessage, setEmailDuplicateMessage] = useState(""); // 서버에서 받은 중복확인 결과 메시지

    //customAlert
    const [customAlert, setCustomAlert] = useState(false);
    const [customAlertMessage, setCustomAlertMessage] = useState("");

    // 이메일 중복 여부 확인 후 가입 절차
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (emailCheck) {
            if (emailDuplicate) {
                setCustomAlertMessage("이메일을 확인해주세요");
                setCustomAlert(true);
            } else {
                const response = await fetch("/api/auth/signup", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name, email, password }),
                });

                const data = await response.json();

                if (response.status === 200) {
                    window.location.href = data.redirectUrl;
                } else {
                    setMessage("가입에 실패했습니다.");
                }
            }
        } else {
            setCustomAlertMessage("이메일 중복을 확인해주세요");
            setCustomAlert(true);
        }
    };

    // 이메일 중복 여부 확인
    const emailCheckFunction = async (e) => {
        const response = await fetch("/api/emailDuplicateCheck", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();

        setEmailCheck(true);
        if (response.status === 200) {
            setEmailDuplicateMessage(data.message);
            setEmailDuplicate(false);
        } else if (response.status === 409) {
            setEmailDuplicateMessage(data.message);
            setEmailDuplicate(true);
        } else {
            setEmailDuplicateMessage("서버 에러");
        }
    };

    return (
        <div>
            <div className={styles.loginWrap}>
                <div className={styles.loginArea}>
                    <div className={styles.iconArea}>
                        <Image src="/millivieIcon.svg" width="50" height="50" alt=""></Image>
                        Millivie
                    </div>
                    <div className={styles.loginText}>회원가입</div>
                    <div className={styles.normalLoginArea}>
                        <form onSubmit={handleSubmit} className={styles.formWrap}>
                            <div>
                                <label htmlFor="name">이름</label>
                                <input
                                    name="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className={styles.inputArea}
                                    placeholder="이름 입력"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email">이메일</label>
                                <input
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={styles.inputArea}
                                    placeholder="example@millivie.com"
                                    required
                                />
                            </div>
                            <div className={styles.emailCheckArea}>
                                <p style={{ color: emailDuplicate ? "rgb(218, 100, 100)" : "rgb(121, 223, 121)" }}>
                                    {emailDuplicateMessage}
                                </p>
                                <button className={styles.emailCheckBtn} type="button" onClick={emailCheckFunction}>
                                    이메일 중복 확인
                                </button>
                            </div>
                            <div>
                                <label htmlFor="password">비밀번호</label>
                                <input
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={styles.inputArea}
                                    placeholder="비밀번호 입력"
                                    required
                                />
                            </div>
                            <button type="submit" className={styles.loginBtn}>
                                회원가입
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            {customAlert && (
                <CustomAlert
                    message={customAlertMessage}
                    duration={2000}
                    onClose={() => {
                        setCustomAlert(false);
                    }}
                />
            )}
        </div>
    );
}
