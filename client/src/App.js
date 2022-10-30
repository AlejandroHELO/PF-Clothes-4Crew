import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import './App.css';
import { getProducts } from './redux/actions';
import ProductDetail from './components/Product/productDetail.jsx';

import HomePage from './components/HomePage/HomePage';
import Footer from './components/Footer/Footer';
import AdminView from './components/Admin/AdminView';
import Navbar from './components/navbar/navbar.js'
// import Loading from '';
import HelpUsImprove from './components/HelpUsToImprove/HelpUsImprove'

function App() { 
  

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProducts())
    document.body.classList.add('flex', 'justify-center')
  }, [])

 
  return (

    //<AuthProvider> 
    <div className="App">
      <Routes>
        <Route exact path='/' element={<HomePage/>}/>
        <Route path='/productDetail/:productId' element={<ProductDetail />}/>
        <Route path='/helpusimprove' element={<HelpUsImprove/>}/>
        <Route path='/adminview//*' element={<AdminView/>} />
        <Route path='*' element={<Navigate to='/'/>}/>
      </Routes>
      <Footer/>
    </div>
    //</AuthProvider>

  )
};

export default App;
