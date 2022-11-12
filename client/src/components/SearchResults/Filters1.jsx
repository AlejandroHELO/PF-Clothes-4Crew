import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { filter, orderBy, resetFilter } from '../../redux/actions'
import PropTypes from 'prop-types'

Filters.propTypes = {
    results: PropTypes.array,
    query: PropTypes.string,
}

export default function Filters({ results, query }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const [orderDir, setOrderDir] = useState({ price: false, alpha: true })
    // console.log(orderDir)

    const brands = []
    const genres = []
    // const genders = []
    const categories = []

    const handleSelect = (e) => {
        e.preventDefault()
        const order = e.target.value
        dispatch(orderBy(order))
        // if (order === "priceAsc") setOrderDir({ alpha: false, price: true })
        // if (order === "priceDesc") setOrderDir({ alpha: false, price: false })
        navigate(`/searchResults/${query}/${order}`)
    }
    // const handleSelectAlpha = (e) => {
    //     var order = (e.target.value)
    //     dispatch(orderBy(order))
    //     if (order === "aZ") setOrderDir({ price: false, alpha: true })
    //     if (order === "zA") setOrderDir({ price: false, alpha: false })
    //     navigate(`/searchResults/${query}/${order}`)
    // };

    const handleFilter = (e) => {
        e.preventDefault()
        dispatch(filter(e.target.value))
    }

    const handleReset = (e) => {
        e.preventDefault()
        dispatch(resetFilter())
    }

    results.forEach((res) => {
        const { brand, genre, category } = res
        if (!genres.includes(genre)) genres.push(genre)
        if (!brands.includes(brand.name)) brands.push(brand.name)
        if (!categories.includes(category[0].name))
            categories.push(category[0].name)
    })

    // genres.forEach(genre => {
    //     if (genre === "Unisex") genders.push("Unisex")
    //     if (genre === "Mens") genders.push("Men")
    //     if (genre === "Womens") genders.push("Women")
    // })

    return (
        <div className="w-48 flex flex-col px-4 text-xs">
            <div className="flex flex-col mb-4 items-start">
                <span className="font-bold">Order:</span>
                <button value={'priceAsc'} onClick={(e) => handleSelect(e)}>
                    Price 🔼
                </button>
                <button value={'priceDesc'} onClick={(e) => handleSelect(e)}>
                    Price 🔽
                </button>
                <button value={'aZ'} onClick={(e) => handleSelect(e)}>
                    A-Z 🔼
                </button>
                <button value={'zA'} onClick={(e) => handleSelect(e)}>
                    Z-A 🔽
                </button>
            </div>
            <div className="flex flex-col mb-4">
                <span className="font-bold">Filter:</span>
                {genres.length > 1 ? (
                    <div>
                        <span>Gender:</span>
                        <select onChange={(e) => handleFilter(e)} name="" id="">
                            {genres.map((gen) => {
                                return (
                                    <option key={gen} value={gen}>
                                        {gen}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                ) : (
                    <span>{genres[0]} only available</span>
                )}
                {categories.length > 1 ? (
                    <div>
                        <span>Category:</span>
                        <select onChange={(e) => handleFilter(e)} name="" id="">
                            {categories.map((cat) => {
                                return (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                ) : (
                    <span>{categories[0]} only available</span>
                )}
                {brands.length > 1 ? (
                    <div>
                        <span>Brand:</span>
                        <select onChange={(e) => handleFilter(e)} name="" id="">
                            {brands.map((bra) => {
                                return (
                                    <option key={bra} value={bra}>
                                        {bra}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                ) : (
                    <span>{brands[0]} only available</span>
                )}
                <button onClick={(e) => handleReset(e)}>Reset filters</button>
            </div>
        </div>
    )
}
