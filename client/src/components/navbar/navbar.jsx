import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCategories } from '../../redux/actions'
import {Link} from 'react-router-dom'
import SearchBar from './searchbar'

function Navbar() {
    const dispatch = useDispatch()

    const categories = useSelector(state => state.categories)

    React.useEffect(() => {
        dispatch(getCategories())
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <nav className="w-full h-1/6 mt-2 p-2 bg-white shadow-md flex flex-col justify-around">
            {/* Botones */}
            <div className='flex justify-between'>
                {/* Lado izquierdo */}
                <div className='flex space-x-3'>
                    <div className='w-16 flex justify-center items-center'>
                    <Link to='/'>
                        <img src='/images/clothes4crew.jpg' alt='LOGO'></img>
                    </Link>
                    </div>
                    {/* Searchbar */}
                    <div className='border-gray-300 border-2 rounded flex p-2'>
                        <SearchBar />
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
            <Link to={`/searchResults/all`} key="all" className='no-underline text-inherit p-1 hover:bg-black hover:text-white hover:rounded'>All products</Link>
                {
                    categories.map(cat => {
                        return <Link to={`/searchResults/${cat.name.toLowerCase()}`} key={cat._id} className='no-underline text-inherit p-1 hover:bg-black hover:text-white hover:rounded'>{cat.name}</Link>
                    })
                }
            </div>
        </nav>
    )
};

export default Navbar