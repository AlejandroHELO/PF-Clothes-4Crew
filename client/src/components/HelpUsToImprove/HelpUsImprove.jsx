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

        if (e.target.name === 'update') {
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

        <div className={st.container}>
            <div className= {st.titlePage}>
                <h2 className=""> ¡Leave us your comment and help us to improve! 🚀 </h2>
            </div>

            <div className={st.formCont}>

                <form classname={st.Form} onSubmit={handleSubmit}>

                    <div className={st.InputForm}>
                        <label className=' font-bold whitespace-pre-wrap'>Name</label>
                        <input 
                        type="text" 
                        name="name" 
                        onChange={handleChange} 
                        placeholder="Enter your name"
                        className={st.inputField} />
                    </div>
                    <div className={st.InputForm}>
                        <label className=' font-bold whitespace-pre-wrap'>Email</label>
                        <input 
                        type={"email"} 
                        name="email" 
                        onChange={handleChange} 
                        placeholder="Enter your email"
                        className={st.inputField} />
                    </div>
                    <div className={st.InputForm}>
                        <label className=' font-bold whitespace-pre-wrap'>Message</label>
                        <textarea 
                        type="text" 
                        name="message" 
                        onChange={handleChange} 
                        placeholder="Write a message"
                        className={st.inputField} />
                    </div>

                    <div className={st.InputButtonForm}>
                        <button 
                        className=' w-24 h-12 p-2 bg-slate-900 text-slate-50 rounded-lg flex justify-center items-center transition hover:bg-slate-50 hover:text-slate-900 hover:border-2 hover:border-slate-900'
                        disabled = {Message.message === ""}
                        name='update' 
                        ref={target} 
                        type="submit" 
                        onClick={(e) => {
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

                <div className={st.imageDiv}>
                    <img src="/images/newLogo.jpg" className={st.image} alt="img" />
                </div>
            </div>
            <Footer />
        </div>
    )
}