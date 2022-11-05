import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import st from './ProductReviews.module.css';
import { createProductReview } from '../../redux/actions';
import { StarIcon } from '@heroicons/react/20/solid';
import { FaStar } from "react-icons/fa";
import { Container, Radio, Rating } from "./ProductReviewsStyles";

function ProductReviews()  {
    const dispatch = useDispatch();


    const [input, setInput] = useState({
        score: 5,
        comment: ''
    })

    const [errors, setErrors] = useState({})

    const [rate, setRate] = useState(0);

    function validate({input}){
        let errors = {};
        if(!input.score){
            errors.score = 'Score the product'
        }
        return errors;
    }


    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleSelect(e){
        if(e.target.checked){
            setInput({
                ...input,
                score: [...input.score, e.target.value]
            });
            setErrors(validate({
                ...input,
                score: e.target.value,
            }))
        }
    }

    function handleSubmit(e){
        e.preventDefault();
        if(errors.length === 0 && input.score !== ''){
            dispatch(createProductReview(input));
            setInput({
                score: 5,
                comment: ''
            })
            alert('Review successfully created')
        }else {
            alert('Score field must be fulfilled')
        }
    }

    return(
        <div className={st.Container}>
            <h4 className={st.title}>Score our product and comment your experience</h4>

            <div className={st.topInfo}>

                <div className={st.productInfo}>
                    <h3>Product name</h3>
                    <img className={st.productImg} src="https://cdn.shopify.com/s/files/1/0603/3031/1875/products/main-square_0b3ffaad-ad39-4392-a2e9-1feb3793be27_540x.jpg?v=1657245083"/>
                    <span className={st.productDescription}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus consequuntur vel nobis.!</span> 
                </div>
                <Container>
                    {[...Array(5)].map((item, index) => {
                        const givenRating = index + 1;
                        return (
                            <label>
                            <Radio
                            name='score'
                            id='score'
                            type="radio"
                            value={givenRating}
                            onClick={() => {
                                setRate(givenRating);
                            }}
                            onChange={handleSelect}
                            />
                            <Rating>
                            <FaStar
                                color={
                                    givenRating < rate || givenRating === rate
                                    ? "rgb(239, 255 ,0)"
                                    : "rgb(192,192,192)"
                                }
                                />
                            </Rating>
                        </label>
                        );
                    })}
                </Container>
                {errors.score ? <p>{errors.score}</p> : null}
            </div>
            <div className={st.bottomInfo}>
                <form className={st.labels} onSubmit={(e) => handleSubmit(e)}>
                    <div className={st.propertiesBox}>
                        <p>Add your comment</p>
                        <textarea className={st.textarea} name='comment' type='text' value={input.comment} id='comment' onChange={(e) => handleChange(e)} placeholder='Comment about your product'></textarea>
                        <input className={st.send} type='submit' value='Send'/>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default ProductReviews;