import React from 'react'
import Card from './Card'
import { useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import {
    clearDetail,
    getProductDetail,
    getopenDetail,
} from '../../redux/actions'
import ProductDetail from '../Product/productDetail'
import PropTypes from 'prop-types'

const Slider = ({ cat, products }) => {
    const dispatch = useDispatch()
    // const products = useSelector((state) => state.products.filter((p) => p.featured === true)) //featured ->sólo los destacados
    const slider = useRef()
    // className=" mx-8  px-2  shadow-md h-80"

    return (
        <div>
            <div className="flex flex-col justify-center">
                <h5 className="uppercase ml-24">{cat}</h5>
                <div className=" h-96 w-full">
                    {products?.length !== 0 ? (
                        <div className="flex items-center justify-center w-full h-full">
                            <button
                                className="h-10 w-10 mx-8"
                                onClick={() =>
                                    (slider.current.scrollLeft -= 200)
                                }
                            >
                                <img src="/flecha1.png" alt="flecha1" />
                            </button>
                            <div
                                ref={slider}
                                className="snap-x overflow-hidden scroll-smooth h-full flex items-center justify-start text-center"
                            >
                                {products
                                    ?.filter((p) => p.category[0].name === cat)
                                    .map((e) => {
                                        return (
                                            <div key={e._id}>
                                                <div key={e._id}>
                                                    <Card
                                                        key={e._id}
                                                        id={e._id}
                                                        name={e.name}
                                                        image={e.image}
                                                        price={e.price}
                                                        brand={e.brand.name}
                                                        color={e.color}
                                                        description={
                                                            e.description
                                                        }
                                                        size={e.size}
                                                    />
                                                </div>

                                                <ProductDetail
                                                    key={e._id & e._id}
                                                    id={e._id}
                                                    name={e.name}
                                                    image={e.image}
                                                    price={e.price}
                                                    brand={e.brand.name}
                                                    color={e.color}
                                                    size={e.size}
                                                    description={e.description}
                                                />
                                            </div>
                                        )
                                    })}
                            </div>
                            <button
                                className="h-10 w-10 mx-8"
                                onClick={() =>
                                    (slider.current.scrollLeft += 200)
                                }
                            >
                                <img src="/flecha2.png" alt="flecha2" />
                            </button>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    )
}

Slider.propTypes = {
    cat: PropTypes.string,
    products: PropTypes.array,
}

export default Slider
