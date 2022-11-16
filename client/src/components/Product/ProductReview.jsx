/*eslint-disable */
import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPReviews, reviewsFilter } from '../../redux/actions';
import st from './ReviewCard.module.css';
import { Container } from "./CreateReviewsStyles";
import { StarIcon } from '@heroicons/react/20/solid'


function ProductReview() {
    const dispatch = useDispatch()
    // const product = useSelector((state) => state.details)
    // const reviews = useSelector(state => state.reviews)
    const reviews = useSelector(state => state.reviews)
    const pDetail = useSelector(state => state.openDetail)
    const slider = useRef()


    React.useEffect(() => {
        dispatch(getPReviews())
    }, [dispatch])

    const filter = reviews.filter(r => r.productId === pDetail)
   

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    function handleReviewsFilter(e) {
        e.preventDefault()
        dispatch(reviewsFilter(e.target.value))
    }

    return (
        <div className={st.Container} ref={slider}>
            <div>
            <h1 className={st.title}>Reviews</h1>
            <div className={st.filterContainer}>
                <select className={st.filter} onChange={handleReviewsFilter}>
                    <option value='All rates'>All rates</option>
                    <option value='5'>5  ☆</option> 
                    <option value='4'>4  ☆</option>
                    <option value='3'>3  ☆</option>
                    <option value='2'>2  ☆</option>
                    <option value='1'>1  ☆</option>
                </select>
            </div>
            {
                (filter.length) ?
                <div>
                    {filter?.map((review, i) => {
                        return (
                            <div key={i} className={st.card}>
                                <Container className={st.starsCont}>
                                {[0, 1, 2, 3, 4].map((rating, l) => (
                                        <StarIcon 
                                            key={l}
                                            className={classNames(
                                                review.score > rating ? 'text-yellow-600' : 'text-gray-200',
                                                'h-5 w-5 flex-shrink-0',
                                                st.stars
                                            )}
                                            aria-hidden="true"
                                        />
                                    ))}
                                </Container>
                                <div>
                                    {review.comment.charAt(0).toUpperCase() + review.comment.slice(1)}
                                </div>
                            </div>
                        )
                    })}

                </div>
            :
                <div className={st.noResults}>
                    <h6>No results</h6>
                </div>
            }
            </div>
        </div>
    )
}
export default ProductReview;














