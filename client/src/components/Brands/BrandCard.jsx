import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { filter, brandElect } from '../../redux/actions'

export default function BrandCard({ name }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleOnClickBrand = (e, name) => {
        e.preventDefault()
        dispatch(filter([{ filters: "brand", name: name }]))
        dispatch(brandElect(name))
        navigate(`/searchResults/`)
    }


    return (
        <div className="w-full h-full flex p-2 justify-center items-center">
            <button onClick={(e) => handleOnClickBrand(e, name)}>
                <img src={`/images/brandsLogo/${name}.svg`} alt={`${name}`} />
            </button>
        </div>
    )
}
