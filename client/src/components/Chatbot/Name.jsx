import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'


export default function Name(props) {
    console.log('props Name----------------', props)
    return (
        <div>
            {(props.state?.messages[1]?.message) ?
                <div className=" text-3xl flex justify-center items-center">
                    <img
                        src='/images/bot/hello.png' alt="bot"
                        className=" w-24 flex-shrink-0 hover:w-28"
                    />
                    {props.state.messages[1].message}
                </div>
                : null}
        </div>
    )
}