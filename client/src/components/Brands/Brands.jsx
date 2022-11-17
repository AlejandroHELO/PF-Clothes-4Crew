import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBrands } from '../../redux/actions'
import BrandCard from './BrandCard'


export default function Brands() {
    const dispatch = useDispatch()
    const brands = useSelector((state) => state.brands)

    useEffect(() => {
        dispatch(getBrands())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="py-8 flex flex-row justify-items-center items-center">
            {brands?.map((brand) => {
                return (
                    <div
                        key={brand._id}
                        className="w-full"
                    >
                        <BrandCard name={brand.name} />
                    </div>
                )
            })}
        </div>
    )
}
