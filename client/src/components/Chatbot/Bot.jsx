import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ViewChatBot } from '../../redux/actions'

export default function Bot() {
    const dispatch = useDispatch()


    const handleOpenChatbot = (e) => {
        e.preventDefault()
        dispatch(ViewChatBot(true))
    }


    return (
        <div className='fixed bottom-0 right-0'>
            <button onClick={(e) => handleOpenChatbot(e)}>
                <img
                    src='/images/bot/bot1.png' alt="bot"
                    className=" h-44 flex-shrink-0 hover:h-64 "
                />
            </button>

        </div>
    )
}