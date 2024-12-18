"use client";

import { useEffect, useState } from "react";
import styles from "/styles/customAlert.module.css";

const CustomAlert = ({ message, duration, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onClose, 300); // CSS 애니메이션 시간과 맞추기 위해 딜레이 추가
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return <div className={`${styles.messageBox} ${isVisible && styles.fadeIn}`}>{message}</div>;
};

export default CustomAlert;
