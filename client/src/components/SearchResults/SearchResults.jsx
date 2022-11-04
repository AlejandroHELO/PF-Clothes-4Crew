import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { orderBy, search, getProductDetail, getopenDetail } from '../../redux/actions'
import { Link, useParams } from 'react-router-dom'
import Card from '../Cards/Card'
import Navbar from '../navbar/navbar'
import Filters from './Filters'
import ProductDetail from '../Product/productDetail'

export default function SearchResults({open, setOpen}) {
    const { query, order } = useParams()
    const dispatch = useDispatch()
    // const products = useSelector(state => state.products)
    let results = useSelector((state) => state.searchResults)
    const resultsFilted = useSelector((state) => state.searchResultsFiltered)
    const currentOrder = useSelector((state) => state.currentOrder)
    // const products = useSelector(state => state.products)
    // const categories = useSelector(state => state.categories)
    // const brands = useSelector(state => state.brands)

    // const categoriesResults = products.filter((product) => product.category[0].name.toLowerCase().includes(query))
    // const brandsResults = products.filter((product) => product.brand.name.toLowerCase().includes(query))
    // const results = [...namesResults, ...categoriesResults, ...brandsResults]
    // let results = []

    // if(query === "all"){
    //     results = products
    //     dispatch(search("all"))
    // }

    const handleOnClick = (id, e) => {
        e.preventDefault()
        dispatch(getProductDetail(id))
        dispatch(getopenDetail(id))
    }

    useEffect(() => {
        
        dispatch(search(query))
        if(order) {
            dispatch(orderBy(order))
            console.log(order)
        }
        
        console.log(query)
    }, [query, order, resultsFilted])
    

    

    const renderRes = (resArray) => {
        
        return resArray.map((res) => {
            return (
                <>
                    <button
                        className="transparent"
                        onClick={(e) => handleOnClick(res._id, e)}
                    >
                        <Card
                            id={res._id}
                            name={res.name}
                            image={res.image}
                            price={res.price}
                            brand={res.brand.name}
                        />
                    </button>
                    {
                        open && 
                        <ProductDetail open={open} setOpen={setOpen} />
                    }
                </>
            )
        })
    }
    return (
        <div>
        
            <div className="py-4 flex justify-between m-8">
                <Filters results={results} query={query} />
                <div className="grid grid-cols-5">
                    {resultsFilted.length < 1 ? (
                        <>{renderRes(results)}</>
                    ) : (
                        <>{renderRes(resultsFilted)}</>
                    )}
                </div>
            </div>
        </div>
    )
}
