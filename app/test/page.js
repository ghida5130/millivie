"use client";

import { signIn } from "next-auth/react";

export default function Test() {
    const handleSubmit = async () => {
        const response = await fetch("/api/addReview", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ movie_id: "123456", rating: 4, content: "test" }),
        });
    };
    return (
        <button
            onClick={() => {
                handleSubmit();
            }}
        >
            github login test
        </button>
    );
}
