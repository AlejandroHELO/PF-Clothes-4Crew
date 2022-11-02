import React from 'react';
import Card from "./Card";
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { clearDetail, getProductDetail, getopenDetail } from '../../redux/actions';
import ProductDetail from '../Product/productDetail';

const Slider = (props) => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.productsFiltered.filter((p) => p.featured === true)); //featured ->sólo los destacados
    const slider = useRef()
    console.log(props.cat)
    // className=" mx-8  px-2  shadow-md h-80"

    const handleOnClickDetail = (id) => {
        dispatch(getProductDetail(id))
        dispatch(getopenDetail(id))
    }


    return (
        <div>
            <div className='flex flex-col justify-center'>
                <h5 className='uppercase ml-24 px-4' >{props.cat}</h5>
                <div className=" mx-8 h-96 max-w-7xl">
                    {(products.length !== 0) ? (
                        <div className='flex items-center justify-center w-full h-full'>
                            <button className='h-10 w-10 mx-8' onClick={() => slider.current.scrollLeft -= 200}>
                                <img src='/flecha1.png' alt="flecha1" />
                            </button>
                            <div ref={slider} className='snap-x overflow-scroll scroll-smooth h-full flex items-center justify-start text-center'>
                                {console.log(products)}
                                {products.filter((p) => p.category[0].name === props.cat).map((e) => {
                                    return (
                                        <div>
                                            <button key={e._id} className='transparent' onClick={() => handleOnClickDetail(e._id)}>
                                                <div key={e._id}>
                                                    <Card
                                                        key={e._id}
                                                        id={e._id}
                                                        name={e.name}
                                                        image={e.image}
                                                        price={e.price}
                                                        brand={e.brand.name}
                                                    />
                                                </div>
                                            </button>
                                            <ProductDetail
                                                key={e._id & e._id}
                                                id={e._id}
                                                name={e.name}
                                                image={e.image}
                                                price={e.price}
                                                brand={e.brand.name}
                                                size={e.size}
                                                description={e.description}
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                            <button className='h-10 w-10 mx-8' onClick={() => slider.current.scrollLeft += 200}>
                                <img src='/flecha2.png' alt="flecha2" />
                            </button>
                        </div>


                    ) :
                        <div>{console.log('no hay productos')}</div>
                    }
                </div>
            </div>
        </div>

    )
};
export default Slider;