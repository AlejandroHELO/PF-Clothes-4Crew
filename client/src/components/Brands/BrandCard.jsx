import React from 'react'
import { Link } from 'react-router-dom'

export default function BrandCard({ name }) {
    return (
        <div className='w-full h-full flex p-2 justify-center items-center'>
            <Link to={`/searchResults/${name.toLowerCase()}`}>
                <img src={`/images/brandsLogo/${name}.svg`} alt={`${name}`} />
            </Link>
        </div>
    )
}
