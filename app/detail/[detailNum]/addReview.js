import { useEffect, useRef, useState } from "react";
import styles from "/styles/detail.module.css";
import StarRating from "./starRating.js";

export default function AddReview({
    setReviewModal,
    detailNum,
    setCustomAlert,
    setCustomAlertMessage,
    setNowReviewData,
}) {
    const [rating, setRating] = useState(5);
    const [reviewContent, setReviewContent] = useState("");
    const hiddenInputRef = useRef(null);
    const [reviewContentLength, setReviewContentLength] = useState(0);

    const RatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleInput = (e) => {
        const maxLength = 300;
        const value = e.target.innerText;
        setReviewContentLength(value.length);
        if (value.length <= maxLength) {
            setReviewContent(value);
            hiddenInputRef.current.value = value;
        } else {
            setReviewContent(value.slice(0, -2));
            e.target.innerText = value.slice(0, -2);
            setReviewContentLength(value.length - 2);
            alert("300자 초과");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("/api/addReview", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ movie_id: detailNum, rating, content: reviewContent }),
        });

        const reviewData = await response.json();

        if (response.status === 200) {
            setNowReviewData(reviewData);
            setReviewModal(false);
            setCustomAlertMessage("리뷰 작성 완료");
            setCustomAlert(true);
        } else {
            console.log("error");
        }
    };

    return (
        <div className={styles.modalBackground}>
            <div className={styles.modalWrap}>
                <button
                    className={styles.modalCloseButton}
                    onClick={() => {
                        setReviewModal(false);
                    }}
                >
                    ×
                </button>
                <form className={styles.modalArea} onSubmit={handleSubmit}>
                    <p style={{ fontSize: "25px", marginBottom: "20px" }}>리뷰 작성</p>
                    <StarRating totalStars={5} RatingChange={RatingChange}></StarRating>
                    <div
                        className={styles.reviewContentArea}
                        contentEditable
                        onInput={handleInput}
                        suppressContentEditableWarning={true}
                    ></div>
                    <input name="rating" type="hidden" value={rating}></input>
                    <input name="content" type="hidden" value={reviewContent} ref={hiddenInputRef}></input>
                    <p style={{ marginTop: "5px" }}>{reviewContentLength} / 300자</p>
                    <div className={styles.buttonArea}>
                        <button className={styles.reviewButton} type="submit">
                            작성
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
