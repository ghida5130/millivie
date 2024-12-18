const badWords = ["잔인", "민망"];

const analyseReview = (review) => {
    for (let word of badWords) {
        if (review.includes(word)) return true;
    }
    return false;
};

export default analyseReview;
