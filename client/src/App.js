import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
// import './App.css';
import { getProducts } from './redux/actions'
import ProductDetail from './components/Product/productDetail'
import HomePage from './components/HomePage/HomePage'
// import Footer from '';
import Footer from './components/Footer/Footer.jsx'
import AdminView from './components/Admin/AdminView'
// import Loading from '';
import HelpUsImprove from './components/HelpUsToImprove/HelpUsImprove'

import SearchResults from './components/SearchResults/SearchResults'


function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProducts())
        //document.body.classList.add('flex', 'justify-center', 'w-full', 'mb-20')
    }, [])

    return (
        //<AuthProvider>
        <div className="App">
            <Routes>
                <Route exact path="/" element={<HomePage />} />
                {/* <Route path='/productDetail/:productId' element={<ProductDetail />} /> */}
                <Route
                    path="/searchResults/:query/"
                    element={<SearchResults />}
                />
                <Route
                    path="/searchResults/:query/:order"
                    element={<SearchResults />}
                />
                <Route path="/helpusimprove" element={<HelpUsImprove />} />
                <Route path="/adminview//*" element={<AdminView />} />
                <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
            <Footer />
        </div>
        //</AuthProvider>
    )
}


export default App
