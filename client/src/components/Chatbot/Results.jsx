import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'


export default function Results(props) {
    const { setState, state } = props
    const [size, setSize] = useState('')

    useEffect(() => {
        const datos = state.size.genre

        if (datos.genre === 'women') {
            if ((datos.peso > 44 && datos.peso < 55) || (datos.alt > 149 && datos.alt < 161)) {
                setSize('S')
            } else if ((datos.peso > 54 && datos.peso < 65) || (datos.alt > 159 && datos.alt < 170)) {
                setSize('M')
            } else if ((datos.peso > 64 && datos.peso < 76) || (datos.alt > 169 && datos.alt < 176)) {
                setSize('L')
            } else if ((datos.peso > 75 && datos.peso < 91) || (datos.alt > 175 && datos.alt < 191)) {
                setSize('XL')
            } else {
                setSize("Women's measurements not included. Write height between 150 and 190. And weight between 45 and 90.")
            }
        } else if (datos.genre === 'men') {
            if ((datos.peso > 54 && datos.peso < 65) || (datos.alt > 149 && datos.alt < 161)) {
                setState(state => ({
                    ...state,
                    size: {
                        ...state.size,
                        genre: {
                            ...state.size.genre,
                            size: 'S'
                        }
                    }
                }))
            } else if ((datos.peso > 64 && datos.peso < 55) || (datos.alt > 159 && datos.alt < 170)) {
                setState(state => ({
                    ...state,
                    size: {
                        ...state.size,
                        genre: {
                            ...state.size.genre,
                            size: 'M'
                        }
                    }
                }))
            } else if ((datos.peso > 74 && datos.peso < 86) || (datos.alt > 169 && datos.alt < 176)) {
                setState(state => ({
                    ...state,
                    size: {
                        ...state.size,
                        genre: {
                            ...state.size.genre,
                            size: 'L'
                        }
                    }
                }))
            } else if ((datos.peso > 85 && datos.peso < 111) || (datos.alt > 175 && datos.alt < 201)) {
                setState(state => ({
                    ...state,
                    size: {
                        ...state.size,
                        genre: {
                            ...state.size.genre,
                            size: 'XL'
                        }
                    }
                }))

            } else {
                setState(state => ({
                    ...state,
                    size: {
                        ...state.size,
                        genre: {
                            ...state.size.genre,
                            size: "Men's measurements not included. Write height between 150 and 200. And weight between 55 and 110."
                        }
                    }
                }))

            }
        } else {
            setState(state => ({
                ...state,
                size: {
                    ...state.size,
                    genre: {
                        ...state.size.genre,
                        size: 'Gender not contemplated, write only woman or man'
                    }
                }
            }))

        }



    }, [])

    console.log('props Results----------------', state.size.genre.size)
    return (
        <div>
            {(state.size.genre?.size) ?
                <div className="flex justify-center items-center">
                    {/* <img
                        src='/images/bot/hello.png' alt="bot"
                        className=" w-24 flex-shrink-0 hover:w-28"
                    /> */}
                    The size for the measurements entered is  "{state.size.genre.size}"

                </div>
                : null}
        </div>
    )
}