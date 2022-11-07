import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { search, filter } from '../../redux/actions'

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
        console.log(query)
    }, [query])
    const handleSubmit = (query, e) => {
        e.preventDefault()
        dispatch(search(query))
        navigate(`/searchResults/`)

    }


    return (
        <form>
            <input
                type="text"
                placeholder="Search anything..."
                onChange={(e) => handleInputChange(e)}
                className=" border-none"
                value={query}
            />
            <button onClick={(e) => handleSubmit(query, e)}>🔎</button>
        </form>
    )
}
