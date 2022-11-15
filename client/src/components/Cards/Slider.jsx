import React from 'react';
import Card from "./Card";
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { clearDetail, getProductDetail, getopenDetail } from '../../redux/actions';
import ProductDetail from '../Product/productDetail';

const Slider = ({ cat, products }) => {
    const dispatch = useDispatch()
    // const products = useSelector((state) => state.products.filter((p) => p.featured === true)) //featured ->sólo los destacados
    const slider = useRef()
    // console.log(cat)
    // className=" mx-8  px-2  shadow-md h-80"

    // console.log('products en slider', products)

    return (
        <div className='w-full overflow-hidden'>
            <div className="flex flex-col justify-center w-full" >
                <h5 className="uppercase">{cat}</h5>
                <div className= "h-96 w-full">
                    {products?.length !== 0 ? (
                        <div className="flex items-center justify-center w-full h-full position-relative">
                            <button
                                className="h-fit w-fit position-absolute z-20 left-0  "
                                onClick={() => (slider.current.scrollLeft -= 200)}
                            >
                                <img src="/flecha1.png" alt="flecha1" className='w-10 h-10 hover:w-13 hover:h-13'/>
                            </button>
                            <div
                                ref={slider}
                                className="snap-x w-full overflow-hidden scroll-smooth h-full flex items-center text-center"
                            >

                                {products?.filter((p) => p.category[0].name === cat).map((e) => {
                                    return (
                                        <div key={e._id}>

                                            <div key={e._id & e._id} >
                                                <Card
                                                    key={e._id}
                                                    id={e._id}
                                                    name={e.name}
                                                    image={e.image}
                                                    price={e.price}
                                                    brand={e.brand.name}
                                                    color={e.color}
                                                    description={e.description}
                                                    size={e.size}
                                                />
                                            </div>

                                            <ProductDetail
                                                key={e._id & e._id & e._id}
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
                                className="h-fit w-fit position-absolute right-0"
                                onClick={() => (slider.current.scrollLeft += 200)}
                            >
                                <img src="/flecha2.png" alt="flecha2" className='w-10 h-10 hover:w-13 hover:h-13' />
                            </button>
                        </div>
                    ) : (
                        <div>{console.log('no hay productos')}</div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default Slider
