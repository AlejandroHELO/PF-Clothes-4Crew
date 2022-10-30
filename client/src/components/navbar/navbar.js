import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCategories } from '../../redux/actions'

function Navbar() {
    const dispatch = useDispatch()

    const categories = useSelector(state => state.categories)

    useEffect(() => {
        dispatch(getCategories())
    }, [])

    return (
        <nav className="w-full h-1/6 mt-2 p-2 bg-white shadow-md flex flex-col justify-around">
            {/* Botones */}
            <div className='flex justify-between'>
                {/* Lado izquierdo */}
                <div className='flex space-x-3'>
                    {/* Logo */}
                    <div className='w-16 flex justify-center items-center'>
                        <img src='/images/Clothes 4Crew Logo.jpg' alt='LOGO'></img>
                    </div>
                    {/* Searchbar */}
                    <div className='border-gray-300 border-2 rounded flex p-2'>
                        <input type='text' placeholder='Search anything...'></input>
                        <button>🔎</button>
                    </div>
                </div>
                {/* Lado derecho */}
                <div className='flex space-x-3'>
                    {/* Favoritos */}
                    <button className='rounded p-2 flex justify-center items-center'>
                        🖤
                    </button>
                    {/* Carrito */}
                    <button className='rounded flex p-2 justify-center items-center'>
                        🛒
                    </button>
                    {/* Login */}
                    <button className='box-border bg-black text-white rounded flex p-2 justify-center items-center transition hover:bg-white hover:text-black hover:border-2 hover:border-black'>
                        👤 Iniciar sesión
                    </button>
                </div>
            </div>
            {/* Categorías */}
            <div className='flex justify-between mt-2'>
                {
                    categories.map(cat => {
                        return <a href={`/category/${cat.name}`} key={cat._id} className='p-1 hover:bg-black hover:text-white hover:rounded'>{cat.name}</a>
                    })
                }
            </div>
        </nav>
    )
}

export default Navbar