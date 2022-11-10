import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux';
import st from './HelpUsImprove.module.css'
import { postComment } from '../../redux/actions.js'
import Footer from '../Footer/Footer.jsx';

import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';

export default function HelpUsImprove() {
    const [show, setShow] = useState(false);
    const target = useRef(null);
    const dispatch = useDispatch()

    const [Message, setMessage] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        e.preventDefault();
        setMessage((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (e.target.name == 'update') {
            console.log('SOY EL MENSAJE', Message)
            dispatch(postComment(Message))
            setMessage({
                name: '',
                email: '',
                message: '',
            })
        }
    };

    return (
        <div>
            <div className= {st.titlePage}>
                <h2 className=" "> HELP US TO IMPROVE </h2>
            </div>

            <div className={st.formCont}>

                {/* <div className={st.float1}>
                    <img src={image} className={st.img} alt="img" />
                </div> */}
                
                <form classname={st.form} onSubmit={handleSubmit}>
                    <div>
                        <label>Name</label>
                        <input type="text" name="name" onChange={handleChange} placeholder="Enter your name"> 
                        </input>
                    </div>

                    <div>
                        <label>Email</label>
                        <input type={"email"} name="email" onChange={handleChange} placeholder="Enter your email"> 
                        </input>
                    </div>

                    <div>
                        <label>Message</label>
                        <textarea type="text" name="message" onChange={handleChange} placeholder="Write a message">
                        </textarea>
                    </div>

                    <div>
                        <button name='update' variant="primary" ref={target} type="submit" onClick={(e) => {
                            handleSubmit(e);
                            setShow(!show);
                        }}>
                            Submit
                        </button>
                    </div>

                    <Overlay target={target.current} show={show} placement="right">
                        {(props) => (
                            <Tooltip id="overlay-example" {...props}>
                                Comment successfully send!
                            </Tooltip>
                        )}
                    </Overlay>

                </form>
            </div>
            <Footer />
        </div>
    )
};
