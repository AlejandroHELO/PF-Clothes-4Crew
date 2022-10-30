import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { search } from '../../redux/actions'
import { useNavigate } from 'react-router-dom'

export default function SearchBar() {
    const [query, setQuery] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleInputChange = (e) => {
        e.preventDefault()
        setQuery(e.target.value)
    }
    const handleSubmit = (query, e) => {
        e.preventDefault()
        if(!query) return
        dispatch(search(query))
        navigate(`/searchResults/${query}`)
    }

    return (
        <form>
            <input type='text' placeholder='Search anything...' onChange={(e) => handleInputChange(e)} />
            <button onClick={(e) => handleSubmit(query, e)}>🔎</button>
        </form>
    )
}
