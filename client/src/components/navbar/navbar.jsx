/*eslint-disable */
import './favoriteCard.css'
import './responsivenavbar.css'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    getCategories, getProducts, getBrands, getCurrentUser,
    getProductDetail, getopenDetail, getCart, brandElect, getColors,
    deleteFromFavorites, cartEmpty
} from '../../redux/actions'
import { Link, useNavigate, Outlet } from 'react-router-dom'
import SearchBar from './searchbar'
import { useAuth0 } from "@auth0/auth0-react";
import Cart from "../Cart/Cart";
import Sort from "../SearchResults/Sort"
import heartFill from '../../icons/heartFill.svg'
import Menu from '../../icons/menu.svg'
import Chatbots from '../Chatbot/Chatbots'
import Bot from '../Chatbot/Bot'

const styled = {
    backgroundColor: 'rgba(200, 200, 200, .2)',
    position: 'absolute',
    overflowY: 'auto',
    height: '0px',
    width: '0px',
    zIndex: '5',
    right: '9%',
    top: '5%',
    borderRadius: '20px',
    padding: '0%',
    transition: 'all 1s ease-in-out .5s',
    boxShadow: '-5px 7px 12px black',
    backdropFilter: 'blur(10px)',
    gridAutoColumns: '100%',

}


function Navbar() {
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart);
    const userLogged = useSelector(state => state.userLogged);
    const { loginWithPopup, isAuthenticated, user, logout, getAccessTokenSilently } = useAuth0()
    const [openCart, setOpenCart] = React.useState(false)
    const filtersElect = useSelector((state) => state.filtersElect)
    const favorites = useSelector(state => state.favorites)
    const categories = useSelector((state) => state.categories)
    const [openFavorites, setOpenFavorites] = React.useState(false)
    let navigate = useNavigate();
    const [style, setStyle] = React.useState({
        ...styled
    })
    const [openNav, setOpenNav] = React.useState(false)

    useEffect(() => {
        if (isAuthenticated && !userLogged._id) {
            dispatch(getCurrentUser(getAccessTokenSilently, user));
        }
    }, [dispatch, isAuthenticated, getAccessTokenSilently, user]);

    useEffect(() => {
        dispatch(getCart())
        dispatch(getCategories())
        dispatch(getColors())
        dispatch(getBrands())

    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    function OnClicklogout() {
        localStorage.setItem('cart', JSON.stringify([]))
        dispatch(cartEmpty())
        logout()

    }
    function handleOpen() {
        if (openFavorites === false) {
            setOpenFavorites(true)
            setStyle({
                ...styled,
                height: '30em',
                width: '20em',
                padding: '.2%'

            })
        }
        if (openFavorites === true) {
            setOpenFavorites(false)
            setStyle({
                ...styled,
                height: '0px',
                width: '0px',
                padding: '0%'

            })
        }
    }

    function removeFromFavorites(id) {
        dispatch(deleteFromFavorites(id))
    }

    const handleOnClickDetail = (id) => {
        dispatch(getProductDetail(id))
        dispatch(getopenDetail(id))
    }
    const openNavCollapse = () => {
        if (openNav === false) {
            setOpenNav(true)

        }
        else {
            setOpenNav(false)

        }
    }

    const handleAllProducts = (e) => {
        e.preventDefault()
        let filtersElectSinBrand = []


        navigate('/searchResults/');
        if (filtersElect.length > 0) {
            filtersElectSinBrand = filtersElect.filter((f) => f.filters !== "brand")
        }
        if (filtersElectSinBrand.length > 0) {

            let ids = filtersElectSinBrand?.map((f) => {
                return f.id
            })
            ids.map((i) => document.getElementById(i).checked = false)
        }
        dispatch(getProducts())
        dispatch(brandElect({
            id: 1,
            name: 'All',
            avatar: `/images/brandsLogo/All.svg`,

        }))
    }

    return (
        <div className='w-full'>
            <nav id='fullWidNavbar' className="w-full h-fit mt-2  items-center bg-white shadow-md flex flex-col justify-around ">
                {/* Botones */}
                <div className="flex w-full justify-between items-center">
                    {/* Lado izquierdo */}
                    <div className="flex items-center space-x-2 mx-3">
                        <div className=" w-32 flex justify-center items-center">
                            <Link to="/">
                                <img
                                    src="/images/clothes4crew.jpg"
                                    alt="LOGO"
                                ></img>
                            </Link>
                        </div>
                        <div className=" flex justify-center items-center">
                            <Sort />
                        </div>
                        <div className=" w-32 flex justify-center items-center">
                            <button
                                type='button'
                                onClick={(e) => handleAllProducts(e)}
                                key="all"
                                className=" h-10 no-underline box-border bg-slate-900 text-slate-50 rounded flex p-2 justify-center items-center transition hover:bg-slate-50 hover:text-slate-900 hover:border-2 hover:border-slate-900"
                            >
                                All Products
                            </button>
                        </div>
                        {/* h-16 border-gray-300 border-2 rounded  flex justify-center items-center p-2 */}
                        {/* Searchbar */}
                        <div className='flex rounded items-center border-2 h-max'>
                            <SearchBar />
                        </div>
                    </div>
                    {/* Lado derecho */}
                    <div style={style} onMouseLeave={() => handleOpen()}>
                        {
                            favorites.map((i) => {
                                return (
                                    <div key={i.id} className="favoriteCard">
                                        <div className="img">
                                            <img src={i.image[0]} alt="product image" className='productImage' />
                                        </div>
                                        <div className="header">
                                            {i.name}
                                        </div>
                                        <div className="main">
                                            $ {i.price} USD
                                        </div>
                                        <div className="footer">
                                            <div className="deleteButton">
                                                <button onClick={() => removeFromFavorites(i.id)}>
                                                    <img src={heartFill} alt="" style={{ width: '1.5em', height: '1.5em' }} />
                                                </button>
                                            </div>
                                            <div className="addtocartButton">
                                                <button onClick={() => handleOnClickDetail(i.id)} className='addToCartButton'>Details</button>
                                            </div>

                                        </div>

                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="flex space-x-3">
                        {/* Favoritos */}
                        <button onClick={() => handleOpen()} className="rounded p-2 flex justify-center items-center">
                            🖤
                        </button>
                        {/* Carrito */}
                        <button onClick={() => setOpenCart(true)} className="rounded flex p-2 justify-center items-center">
                            🛒
                        </button>
                        {/* Login */}
                        {!isAuthenticated ?
                            <button onClick={loginWithPopup} className="mx-4  box-border bg-black text-white rounded flex p-2 justify-center items-center transition hover:bg-white hover:text-black hover:border-2 hover:border-black">
                                👤 Sign In
                            </button>
                            : userLogged.isAdmin ?
                                <div className='flex gap-3' >
                                    <img src={user?.picture} alt="User picture" className='h-10 w-10 rounded-full' />
                                    <Link to="/adminview" className=' no-underline'>
                                        <button className="box-border bg-black text-white rounded flex p-2 justify-center items-center transition hover:bg-white hover:text-black hover:border-2 hover:border-black">
                                            Admin Panel
                                        </button>
                                    </Link>
                                    <Link to={`/profile/${userLogged._id}`} className=' no-underline'>
                                        <button className="box-border bg-black text-white rounded flex p-2 justify-center items-center transition hover:bg-white hover:text-black hover:border-2 hover:border-black">
                                            Profile
                                        </button>
                                    </Link>
                                    <button onClick={OnClicklogout} className="box-border bg-black text-white rounded flex p-2 justify-center items-center transition hover:bg-white hover:text-black hover:border-2 hover:border-black">
                                        LogOut
                                    </button>
                                </div>
                                : <div className='flex gap-3' >
                                    <img src={user?.picture} alt="User picture" className='h-10 w-10 rounded-full' />
                                    <Link to={`/profile/${userLogged._id}`} className=' no-underline'>
                                        <button className="box-border bg-black text-white rounded flex p-2 justify-center items-center transition hover:bg-white hover:text-black hover:border-2 hover:border-black">
                                            Profile
                                        </button>
                                    </Link>
                                    <button onClick={OnClicklogout} className="box-border bg-black text-white rounded flex p-2 justify-center items-center transition hover:bg-white hover:text-black hover:border-2 hover:border-black">
                                        LogOut
                                    </button>
                                </div>
                        }
                    </div>
                </div>
                {/* Categorías */}
                <Cart
                    open={openCart}
                    setOpen={setOpenCart}
                    products={cart}
                />

            </nav>
            <nav id='responsiveNavButton' className='lg:hidden' onMouseLeave={() => setOpenNav(false)}>
                <div className=" w-full flex flex-row justify-between">
                    <div className=" w-1/6 ">
                        <Link to="/">
                            <img
                                src="/images/clothes4crew.jpg"
                                alt="LOGO"
                            ></img>
                        </Link>
                    </div>
                    <div>
                        <button className=' w-5/6 ' onClick={() => openNavCollapse()}>
                            <img src={Menu} className='w-10 h-10' />
                        </button>
                    </div>

                </div>

                {
                    openNav === true &&
                    <div className='bg-white position-absolute z-30 w-full flex flex-col justify-end items-end'>
                        <div className="flex justify-center flex-col flex-wrap w-full items-end h-fit">
                            <div className=' m-2'>
                                <Sort />
                            </div>
                            <div className=' w-5/6 m-2 border-2'>
                                <SearchBar />
                            </div>
                        </div>

                        <div className=' flex flex-row justify-evenly h-fit'>
                            <button onClick={() => handleOpen()} className="rounded w-full flex justify-center p-2 items-center">
                                🖤
                            </button>
                            <div style={style} onMouseLeave={() => handleOpen()}>
                                {
                                    favorites.map((i) => {
                                        return (
                                            <div key={i.id} className="favoriteCard">
                                                <div className="img">
                                                    <img src={i.image[0]} alt="product image" className='productImage' />
                                                </div>
                                                <div className="header">
                                                    {i.name}
                                                </div>
                                                <div className="main">
                                                    $ {i.price} USD
                                                </div>
                                                <div className="footer">
                                                    <div className="deleteButton">
                                                        <button onClick={() => removeFromFavorites(i.id)}>
                                                            <img src={heartFill} alt="" style={{ width: '1.5em', height: '1.5em' }} />
                                                        </button>
                                                    </div>
                                                    <div className="addtocartButton">
                                                        <button onClick={() => handleOnClickDetail(i.id)} className='addToCartButton'>Details</button>
                                                    </div>

                                                </div>

                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <button onClick={() => setOpenCart(true)} className="rounded w-full flex justify-center p-2 items-center">
                                🛒
                            </button>
                        </div>

                        <div className=" w-5/6 m-2 flex justify-center items-center">
                            <button
                                type='button'
                                onClick={(e) => handleAllProducts(e)}
                                key="all"
                                className=" w-full h-10 no-underline box-border bg-slate-900 text-slate-50 rounded flex p-2 justify-center items-center transition hover:bg-slate-50 hover:text-slate-900 hover:border-2 hover:border-slate-900"
                            >
                                All Products
                            </button>
                        </div>

                        {!isAuthenticated ?
                            <button onClick={loginWithPopup} className=" w-5/6 m-2 flex justify-center items-center p-2 box-border bg-black text-white rounded transition hover:bg-white hover:text-black hover:border-2 hover:border-black">
                                👤 Sign In
                            </button>
                            : userLogged.isAdmin ?
                                <div className='flex gap-3' >
                                    <img src={user?.picture} alt="User picture" className='h-10 w-10' />
                                    <Link to="/adminview" className=' no-underline'>
                                        <button className="box-border bg-black text-white rounded flex p-2 justify-center items-center transition hover:bg-white hover:text-black hover:border-2 hover:border-black">
                                            Admin Panel
                                        </button>
                                    </Link>
                                    <Link to={`/profile/${userLogged._id}`} className=' no-underline'>
                                        <button className="box-border bg-black text-white rounded flex p-2 justify-center items-center transition hover:bg-white hover:text-black hover:border-2 hover:border-black">
                                            Profile
                                        </button>
                                    </Link>
                                    <button onClick={OnClicklogout} className="box-border bg-black text-white rounded flex p-2 justify-center items-center transition hover:bg-white hover:text-black hover:border-2 hover:border-black">
                                        LogOut
                                    </button>
                                </div>
                                : <div className='flex gap-3' >
                                    <img src={user?.picture} alt="User picture" className='h-10 w-10' />
                                    <Link to={`/profile/${userLogged._id}`} className=' no-underline'>
                                        <button className="box-border bg-black text-white rounded flex p-2 justify-center items-center transition hover:bg-white hover:text-black hover:border-2 hover:border-black">
                                            Profile
                                        </button>
                                    </Link>
                                    <button onClick={OnClicklogout} className="box-border bg-black text-white rounded flex p-2 justify-center items-center transition hover:bg-white hover:text-black hover:border-2 hover:border-black">
                                        LogOut
                                    </button>
                                </div>
                        }
                    </div>
                }
            </nav>
            <Outlet />
            <div className="relative">
                <Bot />
                <Chatbots />
            </div>
        </div>
    )
}

export default Navbar
/*eslint-enable */