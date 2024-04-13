"use client";

import { useEffect, useState } from "react";

export default function community() {
    const [reviewData, setReviewData] = useState("");
    useEffect(() => {
        const fetchReviews = async () => {
            const res = await fetch("/api/review");
            const data = await res.json();
            setReviewData(data);
            // console.log(data.reviews);
        };

        fetchReviews();
    }, []);
    return <div>aa</div>;
}
