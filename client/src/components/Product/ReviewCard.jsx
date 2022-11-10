import React from 'react';
import st from './ReviewCard.module.css';

const ReviewCard = ({score, comment}) => {
    return (
        <div className={st.card}>
            <h1>{score}</h1>
            <p>{comment}</p>
        </div>
    )
}

export default ReviewCard;