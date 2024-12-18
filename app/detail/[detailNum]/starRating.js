import { useState } from "react";
import styles from "/styles/detail.module.css";

export default function StarRating({ totalStars, RatingChange }) {
    const [rating, setRating] = useState(5);
    const [hover, setHover] = useState(0);

    const handleClick = (ratingValue) => {
        setRating(ratingValue);
        if (RatingChange) {
            RatingChange(ratingValue);
        }
    };

    return (
        <div className={styles.starRatingArea} style={{ display: "flex", alignItems: "center" }}>
            <div>
                {[...Array(totalStars)].map((_, index) => {
                    const ratingValue = index + 1;
                    return (
                        <svg
                            key={index}
                            height="28"
                            width="30"
                            viewBox="0 0 25 23"
                            style={{
                                fill: ratingValue <= (hover || rating) ? "gold" : "gray",
                                cursor: "pointer",
                                transition: "fill 0.25s",
                            }}
                            onClick={() => handleClick(ratingValue)}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(0)}
                        >
                            <polygon points="9.9, 1.1, 3.3, 22, 19.6, 8.6, 0.2, 8.6, 16.5, 22" />
                        </svg>
                    );
                })}
            </div>
            <p>{rating}점</p>
        </div>
    );
}
