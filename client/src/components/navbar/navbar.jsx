/*eslint-disable */
import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCategories, getProducts, getBrands, getProfile} from '../../redux/actions'
import { Link, useNavigate, Outlet } from 'react-router-dom'
import SearchBar from './searchbar'
import { useAuth0 } from "@auth0/auth0-react";
import Cart from "../Cart/Cart";
import Sort from "../SearchResults/Sort"

function Navbar() {
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart);
    const userDetail = useSelector(state => state.userDetail);
    const { loginWithPopup, isAuthenticated, user, logout, getAccessTokenSilently} = useAuth0()
    const [openCart, setOpenCart] = React.useState(false)
    const filtersElect = useSelector((state) => state.filtersElect)

    const categories = useSelector((state) => state.categories)
    let navigate = useNavigate();


    
    useEffect(() => {
        if (isAuthenticated) {
            console.log("AQUI TOYYY:", user)
          dispatch(getProfile(getAccessTokenSilently, user));
        }
      }, [dispatch, isAuthenticated, getAccessTokenSilently, user]);

    useEffect(() => {

        dispatch(getCategories())
        dispatch(getBrands())
        console.log("pido categories y brands en el navbar al renderizarse")
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const handleAllProducts = (e) => {
        e.preventDefault()

        console.log("presioné botón del all y me dirige a searchResult")

        navigate('/searchResults/');
        if (filtersElect.length > 0) {
            let ids = filtersElect?.map((f) => {
                return f.id
            })
            ids.map((i) => document.getElementById(i).checked = false)
        }
        dispatch(getProducts())
    }

    console.log("USER DETAIIL: " ,userDetail)
    return (
        <>
            <nav className="w-full h-1/6 mt-2  bg-white shadow-md flex flex-col justify-around ">
                {/* Botones */}
                <div className="flex justify-between items-center">
                    {/* Lado izquierdo */}
                    <div className="flex space-x-3">
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
                                All products
                            </button>
                        </div>
                        {/* h-16 border-gray-300 border-2 rounded  flex justify-center items-center p-2 */}
                        {/* Searchbar */}
                        <button className=" h-11 my-4 border-gray-300 border-2 rounded flex p-2 justify-center items-center ">
                            <SearchBar />
                        </button>





                    </div>
                    {/* Lado derecho */}
                    <div className="flex space-x-3">
                        {/* Favoritos */}
                        <button className="rounded p-2 flex justify-center items-center">
                            🖤
                        </button>
                        {/* Carrito */}
                        <button onClick={() => setOpenCart(true)} className="rounded flex p-2 justify-center items-center">
                            🛒
                        </button>
                        {/* Login */}
                        {!isAuthenticated? <button onClick={loginWithPopup} className="box-border bg-black text-white rounded flex p-2 justify-center items-center transition hover:bg-white hover:text-black hover:border-2 hover:border-black">
                            👤 Iniciar sesión
                        </button>: userDetail.isAdmin?
                        <div className='flex gap-3' >
                            <img src={user?.picture} alt="User picture" className='h-10 w-10' />
                            <Link to="/adminview">
                                <button className="box-border bg-black text-white rounded flex p-2 justify-center items-center transition hover:bg-white hover:text-black hover:border-2 hover:border-black">
                                    Admin Panel
                                </button>
                            </Link>
                            <button onClick={logout} className="box-border bg-black text-white rounded flex p-2 justify-center items-center transition hover:bg-white hover:text-black hover:border-2 hover:border-black">
                                Logout
                            </button>
                        </div>: <div className='flex gap-3' >
                            <img src={user?.picture} alt="User picture" className='h-10 w-10' />
                            <button onClick={logout} className="box-border bg-black text-white rounded flex p-2 justify-center items-center transition hover:bg-white hover:text-black hover:border-2 hover:border-black">
                                Logout
                            </button>
                        </div>
                        }

                    </div>
                </div>
                {/* Categorías */}
                <div className="flex justify-between mt-2">
                    {/* <Link
                        to={`/searchResults/all`}
                        key="all"
                        className="no-underline text-inherit p-1 hover:bg-black hover:text-white hover:rounded"
                    >
                        All products
                    </Link> */}

                    {/* {categories?.map((cat) => {
                        return (
                            <Link
                                to={`/searchResults/${cat.name.toLowerCase()}`}
                                key={cat._id}
                                className="no-underline text-inherit p-1 hover:bg-black hover:text-white hover:rounded"
                            >
                                {cat.name}
                            </Link>
                        )
                    })} */}
                </div>

                <Cart
                    open={openCart}
                    setOpen={setOpenCart}
                    products={cart}
                />

            </nav>
            <Outlet/>
        </>
    )
}

export default Navbar
/*eslint-enable */