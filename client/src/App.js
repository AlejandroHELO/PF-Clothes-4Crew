import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import HomePage from './components/HomePage/HomePage';
// import Footer from '';
import AdminView from './components/Admin/AdminView';
// import Loading from '';
import HelpUsImprove from './components/HelpUsToImprove/HelpUsImprove'
import Footer from './components/Footer/Footer';

function App() {




  return (
    <BrowserRouter>
      {/* <AuthProvider> */}

        <div className="App">

          <Routes>
            <Route exact path='/' element={<HomePage/>}/>
            <Route path='/helpusimprove' element={<HelpUsImprove/>}/>
            <Route path='/adminView//*' element={<AdminView/>} />
            <Route path='*' element={<Navigate to='/home'/>}/>
          </Routes>
          <Footer/>
        </div>

      {/* </AuthProvider> */}
    </BrowserRouter>
  )
};

export default App;
