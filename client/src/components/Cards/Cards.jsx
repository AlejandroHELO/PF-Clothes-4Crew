import React from 'react'
import Slider from './Slider'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { getCategories } from '../../redux/actions'
// import Filters from "../Filters/Filters"

const Cards = () => {
    //acá en vez de traer productos traer de category
    //entonces llenar la base de datos con lo necesario
    //hacer collection nueva donde el administrador pueda personalizar el home
    //agregar un campo en la base de datos para que el adminitrador elija
    //los elementos más interesantes o de temporada
    const dispatch = useDispatch()
    const products = useSelector((state) => state.productsFiltered)
    const [categories, setCategories] = useState([])
    const [windowSize, setWindowSize] = React.useState(getWindowSize());
    function getWindowSize() {
        const {innerWidth, innerHeight} = window;
        return {innerWidth, innerHeight};
      }

    React.useEffect(() => {
        
        function handleWindowreSize() {
            setWindowSize(getWindowSize());
        }
        window.addEventListener('resize', handleWindowreSize)
        return () => {
            window.removeEventListener('resize', handleWindowreSize);
          };
    }, [products])

    
    React.useEffect(() => {
        dispatch(getCategories())
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    React.useEffect(() => {
        let result = new Set(products?.map((p) => p.category[0].name))
        let categ = [...result]
        setCategories(categ)
    }, [products])

    return (
        <div className=" my-6" style={{ textAlign: 'center', maxWidth: windowSize.innerWidth }}>
            <h4 className="uppercase mx-4 px-4 italic">
                2022 SPRING/SUMMER THE BEST OF SEASON
            </h4>
            {categories?.map((c) => {
                return (
                    <div key={c} className='m-auto' style={{display: 'inline-grid', maxWidth: windowSize.innerWidth, minWidth:'fit-content'}}>
                        <Slider
                            cat={c}
                            products={products}
                            windowSize={windowSize}
                        />
                    </div>
                )
            })}
        </div>
    )
}
export default Cards
