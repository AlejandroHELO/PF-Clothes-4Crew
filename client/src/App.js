import React, { createContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
// import './App.css';
import { getProducts, getCart } from './redux/actions'
import HomePage from './components/HomePage/HomePage'
import AdminView from './components/Admin/AdminView'
// import Loading from '';
import HelpUsImprove from './components/HelpUsToImprove/HelpUsImprove'
import SearchResults from './components/SearchResults/SearchResults'
import Pago from './components/MercadoPago/MercadoPago'
import Register from './components/login&register/register'
import Navbar from './components/navbar/navbar'
import { useAuth0 } from '@auth0/auth0-react'
import Checkout from './components/Checkout/Checkout'
import ProductReviews from './components/Product/ProductReviews'
import Footer from './components/Footer/Footer'

function App() {
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(false)
    const { isAuthenticated, getAccessTokenSilently, user } = useAuth0()

    useEffect(() => {
        dispatch(getCart())
        dispatch(getProducts())
    }, [isAuthenticated])

    return (
        <>
            <Navbar
                auth={isAuthenticated}
                getToken={() => getAccessTokenSilently()}
            />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route
                    path="/searchResults/:query"
                    element={<SearchResults open={open} setOpen={setOpen} />}
                />
                <Route
                    path="/searchResults/:query/:order"
                    element={<SearchResults open={open} setOpen={setOpen} />}
                />
                <Route path="/register" element={<Register />} />
                <Route path="/helpusimprove" element={<HelpUsImprove />} />
                <Route path="/adminview//*" element={<AdminView />} />
                <Route
                    path="/products/reviews"
                    element={
                        <ProductReviews
                            id="635ae766f530d18d68f103cb"
                            userId="63615409b573f3a4a80dfc1f"
                        />
                    }
                />
                <Route
                    path="/checkout"
                    element={<Checkout id={'63615409b573f3a4a80dfc1f'} />}
                />
                <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
            {/* <Pago id={'63615409b573f3a4a80dfc1f'}/> */}
            {/* <Footer/>  */}
        </>
    )
}

export default App
