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

    React.useEffect(() => {
        dispatch(getCategories())
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    React.useEffect(() => {
        let result = new Set(products.map((p) => p.category[0].name))
        let categ = [...result]
        setCategories(categ)
    }, [products])

    return (
        <div className="m-4 w-full" style={{textAlign: 'center'}}>
            <h4 className="uppercase mx-4 px-4 italic">
                LO MEJOR DE LA TEMPORADA PRIMAVERA/VERANO 2022
            </h4>
            {categories.map((c) => {
                return (
                    <div key={c}>
                        <Slider cat={c} />
                    </div>
                )
            })}
        </div>
    )
}
export default Cards
