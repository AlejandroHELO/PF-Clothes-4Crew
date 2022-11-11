/*eslint-disable */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPReviews } from '../../redux/actions';
import ReviewCard from './ReviewCard';
import st from './ReviewCard.module.css';
import { Link } from 'react-router-dom';

function ProductReview(product) {
    const dispatch = useDispatch()
    // const { productId } = useParams();
    // const product = useSelector((state) => state.details)
    // const reviews = useSelector(state => state.reviews)
    const reviews = useSelector(state => state.reviews)
    
    React.useEffect(() => {
        dispatch(getPReviews())
    }, [dispatch])

    const reviewsFilter = reviews.filter(r => r.productId === product.id)

    return (
        <div className={st.Container}>
            <div>
                {reviewsFilter?.map((review) => {
                    return (
                        <Link to={`/cardReviews${review.id}`}>
                            <ReviewCard score={review.score} comment={review.comment.charAt(0).toUpperCase() + review.comment.slice(1)}/>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
export default ProductReview;














