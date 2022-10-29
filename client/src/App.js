import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import { getProducts } from './redux/actions';
import HomePage from './components/HomePage/HomePage';
import Footer from './components/Footer/Footer';
import AdminView from './components/Admin/AdminView';
// import Loading from '';
import HelpUsImprove from './components/HelpUsToImprove/HelpUsImprove'

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProducts())
  }, [])

 
  return (
      //<AuthProvider> 
        <div className="App">
            <Navbar />
            <Routes>
            <Route exact path='/' element={<HomePage/>}>
            </Route>
              <Route path='/productDetail/:productId' element={<ProductDetail />}/>
            <Route exact path='/admin' element={<AdminView />} />
          </Routes>
          <Footer/>
        </div>
      //</AuthProvider>
  )
}

export default App;
