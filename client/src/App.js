import React from 'react'
import Navbar from './components/navbar/navbar'
import { useDispatch} from 'react-redux';
import { Routes, Route, Navigate, matchPath } from "react-router-dom";
import { getProducts } from './redux/actions';
import ProductDetail from './components/Product/productDetail';
import HomePage from './components/HomePage/HomePage';
// import Footer from '';
import AdminView from './components/Admin/AdminView';
// import Loading from '';
import HelpUsImprove from './components/HelpUsToImprove/HelpUsImprove'

function App() { 
  

  const dispatch = useDispatch()

  React.useEffect(() => {
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
        </div>
      //</AuthProvider>
  )
}

export default App;
