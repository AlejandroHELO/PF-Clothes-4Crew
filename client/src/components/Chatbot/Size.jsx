import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ChevronDoubleRightIcon } from '@heroicons/react/20/solid'


export default function Size(props) {
    const { setState, state } = props

    const dispatch = useDispatch()
    const [viewForm, setViewForm] = useState(false)
    const [genre, setGenre] = useState({
        genre: '',
        alt: '',
        peso: '',
    })

    useEffect(() => {
        console.log(state)
    }, [state])

    const handleSize = (e) => {
        e.preventDefault()
        setViewForm(true)
        console.log('viewForm', viewForm)
    }

    const handleInputGenre = (e) => {
        e.preventDefault()
        setGenre(
            genre => ({
                ...genre,
                [e.target.name]: e.target.value
            }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setState(state => ({
            ...state,
            size: { ...state.size, genre: genre }
        }))
        alert('Data saved! Write results.')
    }

    console.log('props size----------------', props)

    return (
        <div>
            <button onClick={(e) => handleSize(e)}>
                <img
                    src='/images/bot/size1.png' alt="bot"
                    className=" w-24 flex-shrink-0 hover:w-28"
                />
            </button>
            {viewForm ?
                <form >
                    <label>Genre</label>
                    <input
                        type="text"
                        name='genre'
                        className='shadow-2xl'
                        placeholder="men or women"
                        onChange={(e) => handleInputGenre(e)}
                        value={genre.genre}
                    />
                    <label>Height</label>
                    <input
                        type="text"
                        name='alt'
                        className='shadow-2xl'
                        placeholder="enter a number in cm"
                        onChange={(e) => handleInputGenre(e)}
                        value={genre.alt}
                    />
                    <label>Weight</label>
                    <input
                        type="text"
                        name='peso'
                        className='shadow-2xl'
                        placeholder="enter a number in Kg"
                        onChange={(e) => handleInputGenre(e)}
                        value={genre.peso}
                    />
                    <div className='flex'>
                        <label className='flex mt-2' >Click on <ChevronDoubleRightIcon
                            className="-mr-1 ml-1 mt-1 h-5 w-5 text-gray-900 "
                            aria-hidden="true"
                        /> <ChevronDoubleRightIcon
                                className="-mr-1 ml-1 mt-1 h-5 w-5 text-gray-900 "
                                aria-hidden="true"
                            /> <ChevronDoubleRightIcon
                                className="-mr-1 ml-1 mt-1 h-5 w-5 text-gray-900 "
                                aria-hidden="true"
                            />

                        </label>

                        <button className=' bg-slate-400 p-2' onClick={handleSubmit} >SEND</button>
                    </div>


                    <label>Write the word <b>result</b> to obtain the size according to the data entered.</label>
                    <label> If you want to enter new data, write <b>size</b>.</label>


                </form>
                : null}
        </div>
    )
}