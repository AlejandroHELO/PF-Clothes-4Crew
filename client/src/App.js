import React,{ useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'
// import './App.css';
import { getProducts, getCart, getProfile } from './redux/actions'
import HomePage from './components/HomePage/HomePage'
import AdminView from './components/Admin/AdminView'
// import Loading from '';
import HelpUsImprove from './components/HelpUsToImprove/HelpUsImprove'
import SearchResults from './components/SearchResults/SearchResults'
import Pago from './components/MercadoPago/MercadoPago'
import Register from './components/login&register/register'
import Navbar from './components/navbar/navbar'
import { useAuth0 } from "@auth0/auth0-react";
import Footer from './components/Footer/Footer'
import { ConstructionOutlined } from '@mui/icons-material'
import Filters from './components/SearchResults/Filters'
import Checkout from './components/Checkout/Checkout'
import ProductReviews from './components/Product/ProductReviews'
import AdminRoutes from "./AdminRoutes"
import ProtectedRoutes from './ProtectedRoutes'
import CCheckout from './components/CCheckout/CCheckout'



export default function App() {
    const dispatch = useDispatch()
    const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();

    useEffect(() => {
        if (isAuthenticated) {
            console.log(user)
          dispatch(getProfile(getAccessTokenSilently, user));
        }
      }, [dispatch, isAuthenticated, getAccessTokenSilently, user]);

    useEffect(() => {

        dispatch(getCart())
        dispatch(getProducts())
    }, [])


    return (
        <>
            
            <Routes>

                <Route path='/' element={<Navbar/>} >
                    <Route path='/' element={<HomePage />} />
                    <Route path='/searchResults/' element={<Filters />} />
                    {/* <Route path='/searchResults/:query' element={<SearchResults open={open} setOpen={setOpen} />} />
                    <Route path="/searchResults/:query/:order" element={<SearchResults open={open} setOpen={setOpen} />} /> */}
                    <Route path='/register' element={<Register />} />
                    <Route path="/helpusimprove" element={<HelpUsImprove />} />
                    <Route element={<ProtectedRoutes/>}>
                        <Route path="/products/reviews" element={<ProductReviews id='635ae766f530d18d68f103cb' userId='63615409b573f3a4a80dfc1f' />} />
                        <Route path="/checkout" element={<Checkout  />} />
                        <Route path="/checkout/confirm" element={<CCheckout/>} />
                    </Route>
                </Route>
                <Route element={<AdminRoutes/>}>
                    <Route path="/adminview//*" element={<AdminView />} />
                </Route>
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
     //       <Footer/>
            {/* <Pago id={'63615409b573f3a4a80dfc1f'}/> */}
        </>

    ) 
}

