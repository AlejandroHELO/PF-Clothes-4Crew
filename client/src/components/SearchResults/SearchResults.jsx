import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { orderBy, search, getProductDetail, getopenDetail } from '../../redux/actions'
import { Link, useParams } from 'react-router-dom'
import Card from '../Cards/Card'
import Navbar from '../navbar/navbar'

// import Filters from './Filters'

import Filters from './Filters1'

import ProductDetail from '../Product/productDetail'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import Footer from '../Footer/Footer'

export default function SearchResults({ open, setOpen }) {
    const { query, order } = useParams()
    const dispatch = useDispatch()
    const openDetail = useSelector((state) => state.openDetail)
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
        setOpen(true)
    }
    useEffect(() => {

        dispatch(search(query))
        if (order) {
            dispatch(orderBy(order))
            console.log(order)
        }
        
        console.log(query)
    }, [query, order, resultsFilted,openDetail])




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
                        <ProductDetail 
                         key={res._id & res._id}
                         id={res._id}
                         name={res.name}
                         image={res.image}
                         price={res.price}
                         brand={res.brand.name}
                         color={res.color}
                         size={res.size}
                         description={res.description}
                         open={open}
                         setOpen={setOpen}
                        />
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
            {/* ----------------------------- */}


            {/* 
            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                <div className="flex flex-1 justify-between sm:hidden">
                    <a
                        href="#"
                        className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Previous
                    </a>
                    <a
                        href="#"
                        className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Next
                    </a>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700">
                            Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                            <span className="font-medium">97</span> results
                        </p>
                    </div>
                    <div>
                        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                            <a
                                href="#"
                                className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                            >
                                <span className="sr-only">Previous</span>
                                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                            </a> */}
            {/* OJO ESTA LÍNEA ESTABA COMENTADA ANTES NO DESCOMENTAR */}
            {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
            {/* <a
                                href="#"
                                aria-current="page"
                                className="relative z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20"
                            >
                                1
                            </a>
                            <a
                                href="#"
                                className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                            >
                                2
                            </a>
                            <a
                                href="#"
                                className="relative hidden items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 md:inline-flex"
                            >
                                3
                            </a>
                            <span className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700">
                                ...
                            </span>
                            <a
                                href="#"
                                className="relative hidden items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 md:inline-flex"
                            >
                                8
                            </a>
                            <a
                                href="#"
                                className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                            >
                                9
                            </a>
                            <a
                                href="#"
                                className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                            >
                                10
                            </a>
                            <a
                                href="#"
                                className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                            >
                                <span className="sr-only">Next</span>
                                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                            </a>
                        </nav>
                    </div>
                </div>
            </div> */}


            {/* ------------------------------------ */}
         
        </div>
    )
}
