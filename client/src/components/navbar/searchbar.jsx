import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { search, filter } from '../../redux/actions'
// import { MagnifyingGlassCircleIcon } from '@heroicons/react/24/outline'
import { MagnifyingGlassCircleIcon } from '@heroicons/react/20/solid'

export default function SearchBar() {
    const [query, setQuery] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const filtersElect = useSelector((state) => state.filtersElect)

    const handleInputChange = (e) => {
        e.preventDefault()
        setQuery(e.target.value)
    }
    useEffect(() => {
        dispatch(filter(filtersElect))
        dispatch(search(query))
    }, [query])
    const handleSubmit = (query, e) => {
        e.preventDefault()
        dispatch(search(query))
        // navigate(`/searchResults/`)
    }


    return (
        <form className=" flex items-center hover:border-2">

            <button className='flex flex-row w-full h-fit justify-between items-center hover:border-transparent' onClick={(e) => handleSubmit(query, e)}>
                <input
                    className="border-none rounded hover:border-none"
                    type="text"
                    placeholder="Search clothes..."
                    onChange={(e) => handleInputChange(e)}

                    value={query}
                />
                <MagnifyingGlassCircleIcon className='h-8 w-8 justify-end' />
            </button>
        </form>
    )
}
