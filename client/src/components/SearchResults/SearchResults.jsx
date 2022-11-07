import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
    orderBy,
    search,
    getProductDetail,
    getopenDetail,
} from '../../redux/actions'
import Card from '../Cards/Card'
import Filters from './Filters1'
import ProductDetail from '../Product/productDetail'
import Footer from '../Footer/Footer'
import PropTypes from 'prop-types'

SearchResults.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func,
}

export default function SearchResults({ open, setOpen }) {
    const { query, order } = useParams()
    const dispatch = useDispatch()
    const openDetail = useSelector((state) => state.openDetail)
    // const products = useSelector(state => state.products)
    let results = useSelector((state) => state.searchResults)
    const resultsFilted = useSelector((state) => state.searchResultsFiltered)
    //const currentOrder = useSelector((state) => state.currentOrder)
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
        }
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
                    {open && (
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
                    )}
                </>
            )
        })
    }
    return (
        <div>
            <div className="py-4 flex justify-between m-8">
                <Filters results={results} query={query} />
                <div className="grid grid-cols-6">
                    {resultsFilted.length < 1 ? (
                        <>{renderRes(results)}</>
                    ) : (
                        <>{renderRes(resultsFilted)}</>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    )
}
