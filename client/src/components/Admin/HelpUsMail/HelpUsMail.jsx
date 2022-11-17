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
            <h1 className={st.title}> Help Us Mail </h1>

            <div className={st.listContainer}>
                <ul className={st.listMessages}>
                    {   comments && comments.map(
                        (msg, index) => {
                            return (
                                <div key={index} className={st.divItem}>
                                  <div className={st.listHead}>
                                      <li className={st.listItem}>
                                          ID: {index + 1}
                                      </li>
                                      <li className={st.listItem}>
                                          Name: {msg.name}
                                      </li>
                                      <li className={st.listItem}>
                                          Email: {msg.email}
                                      </li>
                                   </div>
                                   <div className={st.itemMsg}>
                                      <li className={st.listItem}>
                                          Message: {msg.message}
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
