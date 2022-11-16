import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import st from './HelpUsMail.module.css'
import { getComments } from '../../../redux/actions'

export default function HelpUsMail() {
    const comments = useSelector((state) => state.comments)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getComments())
    }, [comments])

   
    return (
        <div className={st.Container}>
            <h2 className={st.title}> Help Us Mail </h2>

            <div className={st.listContainer}>
                <ul className={st.listMessages}>
                    {   comments && comments.map(
                        (msg, index) => {
                            return (
                                <div key={index} className={st.divItem}>
                                    <div className={st.listHead}>
                                        <li className={st.listItem}>
                                            <strong>ID:</strong> {index + 1}
                                        </li>
                                        <li className={st.listItem}>
                                            <strong>Name:</strong> {msg.name}
                                        </li>
                                        <li className={st.listItem}>
                                            <strong>Email:</strong> {msg.email}
                                        </li>
                                    </div>
                                    <div className={st.itemMsg}>
                                        <li className={st.listItem}>
                                            <strong>Message:</strong> {msg.message}
                                        </li>
                                    </div>
                                </div>
                            )
                        }
                        ).reverse()
                    }
                </ul>
            </div>
        </div>
    )
}
