import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'
import { getProducts, getCart, getCurrentUser, getBrands, getColors, getCategories } from './redux/actions'
import { useAuth0 } from "@auth0/auth0-react";
// import { ConstructionOutlined } from '@mui/icons-materzial'
import HomePage from './components/HomePage/HomePage'
import AdminView from './components/Admin/AdminView'
// import Loading from '';
import HelpUsImprove from './components/HelpUsToImprove/HelpUsImprove'
import SearchResults from './components/SearchResults/SearchResults'
import Pago from './components/MercadoPago/MercadoPago'
import Register from './components/login&register/register'
import Navbar from './components/navbar/navbar'
import Filters from './components/SearchResults/Filters'
import Checkout from './components/Checkout/Checkout'
import CreatePReview from './components/Product/CreatePReview'
import AdminRoutes from "./AdminRoutes"
import ProtectedRoutes from './ProtectedRoutes'
import CCheckout from './components/CCheckout/CCheckout'
import MyCheckout from './components/MyCheckout/MyCheckout'
import UserProfile from './components/User/UserProfile';
import AboutUs from './components/AboutUs/AboutUs'
import Footer from './components/Footer/Footer'
// import './App.css';
// import Loading from '';
import ProductReview from './components/Product/ProductReview'


export default function App() {
    const dispatch = useDispatch()
    const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();

    useEffect(() => {
        if (isAuthenticated) {
            console.log(user)
            dispatch(getCurrentUser(getAccessTokenSilently, user));
        }
    }, [dispatch, isAuthenticated, getAccessTokenSilently, user]);

    useEffect(() => {
        dispatch(getCart())
        dispatch(getProducts())
        dispatch(getCategories())
        dispatch(getColors())
        dispatch(getBrands())
    }, [])


    return (
        <div className='w-full'>
            
            <Routes>

                <Route path='/' element={<Navbar />} >
                    <Route path='/' element={<HomePage />} />
                    <Route path='/searchResults/' element={<Filters />} />
                    {/* <Route path='/searchResults/:query' element={<SearchResults open={open} setOpen={setOpen} />} />
                    <Route path="/searchResults/:query/:order" element={<SearchResults open={open} setOpen={setOpen} />} /> */}
                    <Route path='/register' element={<Register />} />
                    <Route path='/helpusimprove' element={<HelpUsImprove />} />
                    <Route path='/aboutus' element={<AboutUs />} />
                    <Route path="/cardReviews" element={<ProductReview />}/>

                    <Route path="/adminview//*" element={<AdminView />} />

                    <Route element={<ProtectedRoutes/>}>
                        <Route path='/profile/:userId' element={<UserProfile />} />
                        <Route path="/products/reviews/:id/:userId" element={<ProductReview  />} />
                        <Route path="/reviews/:id/:userId" element={<CreatePReview id='635ae766f530d18d68f103cb' userId='63615409b573f3a4a80dfc1f' />} />
                        <Route path="/checkout" element={<Checkout  />} />
                        <Route path="/mycheckout" element={<MyCheckout/>} />
                    </Route>
                </Route>
                <Route element={<AdminRoutes />}>
                </Route>
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            {/* <Footer/> */}
            {/* <Pago id={'63615409b573f3a4a80dfc1f'}/> */}
        </div>

    )
}

