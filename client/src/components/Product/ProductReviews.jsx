import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import st from './ProductReviews.module.css';
import { createProductReview } from '../../redux/actions';
import { StarIcon } from '@heroicons/react/20/solid';
import { FaStar } from "react-icons/fa";
import { Container, Radio, Rating } from "./ProductReviewsStyles";
import Footer from '../Footer/Footer';


function ProductReviews()  {
    const dispatch = useDispatch();


    const [input, setInput] = useState({
        score: 5,
        comment: ''
    })

    const [errors, setErrors] = useState({})

    const [rate, setRate] = useState(0);

    function validate(input){
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


    function handleSubmit(e){
        e.preventDefault();
        if(!errors.score  && input.score !== ''){
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
    console.log(input)

    return(
        <div>
            <div className={st.Container}>
                {/* <h1 className={st.title}>Score our product and comment your experience</h1> */}

                <div className={st.topInfo}>

                    <div className={st.productInfo}>
                        <h3>Fila Logo Baseball Cap</h3>
                        <img className={st.productImg} src="https://cdn.shopify.com/s/files/1/0603/3031/1875/products/main-square_0b3ffaad-ad39-4392-a2e9-1feb3793be27_540x.jpg?v=1657245083"/>
                        <span className={st.productDescription}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</span> 
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
                                    setInput({...input, score:givenRating})
                                }}
                                />
                                <Rating className={st.stars}>
                                <FaStar
                                    color={
                                        givenRating < rate || givenRating === rate
                                        ? "rgb(212, 175, 55)"
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
                    <form className={st.labels} >
                        <div className={st.propertiesBox}>
                            <h6>Add your comment</h6>
                            <p className={st.op}>(Optional)</p>
                            <textarea className={st.textarea} name='comment' type='text' value={input.comment} id='comment' onChange={(e) => handleChange(e)} placeholder='Comment about your product'></textarea>
                        </div>
                        <div>
                            <input className={st.send} type='button' value='Send' onClick={handleSubmit}/>
                        </div>
                    </form> 
                </div>
            
            </div>
            <Footer></Footer>  
        </div>
    )
}
export default ProductReviews;