import React from 'react';
import Card from "./Card";
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

const Slider = (props) => {
    const products = useSelector((state) => state.products.filter((p) => p.featured === true)); //featured ->sólo los destacados
    const slider = useRef()
    console.log(props.cat)
    // className=" mx-8  px-2  shadow-md h-80"
    return (
        <div>
            <div className='flex flex-col items-center justify-center'>
                <h4 className='uppercase mx-4 px-4' >{props.cat}</h4>
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
                                        <Link className='no-underline ' to={`/productDetail/${e._id}`}>
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
                                        </Link>

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