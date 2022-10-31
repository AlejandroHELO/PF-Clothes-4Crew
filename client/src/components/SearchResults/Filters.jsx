import React from 'react'
import { useDispatch } from "react-redux";
import { orderBy } from "../../redux/actions"

//
//
//          TODAVIA
//          NO
//          FUNCIONA
//          NA
//          DA
//
//

export default function Filters({ results }) {
    const dispatch = useDispatch();

    const handleSelect = (e) => {
        var order = (e.target.value)
        dispatch(orderBy(order))
    };
    const brands = []
    const genres = []
    const categories = []

    results.forEach((res) => {
        const { brand, genre, category } = res
        if (!genres.includes(genre)) genres.push(genre)
        if (!brands.includes(brand.name)) brands.push(brand.name)
        if (!categories.includes(category[0].name)) categories.push(category[0].name)
    })

    console.log({ brands, genres, categories })

    return (
        <div className='w-48 flex flex-col px-4'>
            <div className='flex flex-col mb-4 items-start'>
                {/* <label>Order by</label> */}
                <button className='rounded p-2 flex justify-center items-center'>
                    Price
                </button>
                <input type="button" label="Price"></input>
            </div>
            <div className='flex flex-col mb-4'>
                <span>Filter:</span>
                <span>Gender</span>
                <select onChange={handleSelect} name="" id="">
                    {
                        genres.map((gen) => {
                            return <option key={gen} value={gen}>{gen}</option>
                        })
                    }
                </select>

                <span>Brand</span>
                <select onChange={handleSelect} name="" id="">
                    {
                        brands.map((bra) => {
                            return <option key={bra} value={bra}>{bra}</option>
                        })
                    }
                </select>

                <span>Category</span>
                <select onChange={handleSelect} name="" id="">
                    {
                        categories.map((cat) => {
                            return <option key={cat} value={cat}>{cat}</option>
                        })
                    }
                </select>
            </div>




        </div>
    );
}
