import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Card from '../Cards/Card'
import Navbar from '../navbar/navbar'

export default function SearchResults() {

    const results = useSelector(state => state.searchResults)

    return (
        <div>
            <Navbar />
            <div className='grid grid-cols-5 py-4'>
            {
                results.map((res) => {
                    return (
                        
                        <Link className='no-underline ' to={`/productDetail/${res._id}`}>
                            <Card
                                key={res._id}
                                id={res._id}
                                name={res.name}
                                image={res.image}
                                price={res.price}
                                brand={res.brand.name}
                            />
                        </Link>
                    )
                })
            }
            </div>
        </div>
    )
}
