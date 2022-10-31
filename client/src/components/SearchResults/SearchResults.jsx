import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { search } from '../../redux/actions'
import { Link, useParams } from 'react-router-dom'
import Card from '../Cards/Card'
import Navbar from '../navbar/navbar'
// import Filters from './Filters'

export default function SearchResults() {

    const { query } = useParams()
    const dispatch = useDispatch()
    const products = useSelector(state => state.products)
    const namesResults = useSelector(state => state.searchResults)
    // const categories = useSelector(state => state.categories)
    // const brands = useSelector(state => state.brands)

    const categoriesResults = products.filter((product) => product.category[0].name.toLowerCase().includes(query))
    const brandsResults = products.filter((product) => product.brand.name.toLowerCase().includes(query))
    const results = [...namesResults, ...categoriesResults, ...brandsResults]
    // let results = []
    useEffect(() => {
        dispatch(search(query))
    }, [query])



    return (
        <div>
            <Navbar />
            <div className='py-4 flex justify-between m-8'>
                {/* <Filters results={results} /> */}
                <div className='grid grid-cols-5'>
                    {results.map((res) => {
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
        </div>
    )
}
