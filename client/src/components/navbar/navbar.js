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
        <nav className=" mx-8 h-32 px-2 bg-white shadow-md flex flex-col justify-around">
            <div className='flex justify-between'>
                <div className='flex space-x-3'>
                    <div className=' h-14 w-14'>
                        <img src='/images/logo192.png' alt='LOGO'></img>
                    </div>
                    <div className='border-gray-300 border-2 rounded flex p-2'>
                        <input type='text' placeholder='Search anything...'></input>
                        <button>🔎</button>
                    </div>
                </div>
                <div className='flex space-x-3'>
                    <button className='rounded p-2 flex justify-center items-center'>
                        🖤
                    </button>
                    <button className='rounded flex p-2 justify-center items-center'>
                        🛒
                    </button>
                    <button className='box-border bg-black text-white rounded flex p-2 justify-center items-center transition hover:bg-white hover:text-black hover:border-2 hover:border-black'>
                        👤 Iniciar sesión
                    </button>
                </div>
            </div>
            <div className='flex justify-between'>
                {
                    categories.map(cat => {
                        return <a href={`/category/${cat.name}`} key={cat.id} className='p-1 hover:bg-black hover:text-white hover:rounded'>{cat.name}</a>
                    })
                }
            </div>
        </nav>
    )
}

export default Navbar