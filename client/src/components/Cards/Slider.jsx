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
    const [open, setOpen] = React.useState(false)
    const [catProducts, setProducts] = React.useState([])
    // console.log(cat)
    // className=" mx-8  px-2  shadow-md h-80"
    const [productsSlice, setSlice] =React.useState(0)
    const catSlice = catProducts.slice(productsSlice,productsSlice + 8)
    // console.log('products en slider', products)
    React.useEffect(() => {
        setProducts(products?.filter((p) => p.category[0].name === cat))
    }, [products])


    function next() {
        if(catProducts.length <= productsSlice + 3) {
            setSlice(productsSlice)
        }else {
            setSlice(productsSlice + 3)
        }
    }

    function prev() {
        if(productsSlice < 7) {
            setSlice(0)
        } else {
            setSlice(productsSlice - 3)
        }
    }

    return (
        <div className='w-full flex justify-center'>
            <div className="flex flex-col justify-center w-full py-5" >
                <h5 className="uppercase">{cat}</h5>
                <div className= "w-full, h-64">                    {products?.length !== 0 ? (
                        <div className="flex items-center justify-center w-full h-full position-relative">
                           {
                            catProducts.length > 3 && productsSlice !== 0? (
                                <button
                                className="h-fit w-fit  z-20 left-0  "
                                onClick={() => prev()}
                            >
                                <img src="/flecha1.png" style={{filter:'invert(.5)'}} alt="flecha1" className='w-10 h-10 hover:w-13 hover:h-13'/>
                            </button>
                            ): null
                           }
                            <div
                                ref={slider}
                                className="snap-x w-full  scroll-smooth h-full flex items-center text-center"
                            >

                                {(catSlice).map((e) => {
                                    return (
                                        <div className='flex justify-center' key={e._id}>

                                            <div key={e._id} >
                                                <Card
                                                   
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
                                            
                                                id={e._id}
                                                name={e.name}
                                                image={e.image}
                                                price={e.price}
                                                brand={e.brand.name}
                                                color={e.color}
                                                size={e.size}
                                                description={e.description}
                                                open={open}
                                                setOpen={setOpen}
                                            />
                                        </div>

                                    )
                                })}
                            </div>
                            {
                                catProducts.length > 3 && catProducts.length >= productsSlice + 8 ? (
                                    <button
                                className="h-fit w-fit  right-0"
                                onClick={() => next()}
                            >
                                <img src="/flecha2.png" style={{filter:'invert(.5)'}} alt="flecha2" className='w-10 h-10 hover:w-13 hover:h-13' />
                            </button>
                                ): null
                            }
                        </div>
                    ) : (
                        null
                    )}
                </div>
            </div>
        </div>
    )
}
export default Slider
