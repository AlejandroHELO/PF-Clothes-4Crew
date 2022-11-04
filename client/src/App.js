import React,{ createContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
// import './App.css';
import { getProducts } from './redux/actions'
import HomePage from './components/HomePage/HomePage'
// import Footer from '';
import Footer from './components/Footer/Footer.jsx'
import AdminView from './components/Admin/AdminView'
// import Loading from '';
import HelpUsImprove from './components/HelpUsToImprove/HelpUsImprove'
import SearchResults from './components/SearchResults/SearchResults'
import Pago from './components/MercadoPago/MercadoPago'
import Register from './components/login&register/register'
import {auth} from './firebase/auth'
import {onAuthStateChanged} from 'firebase/auth'
import { LogInAction, logOutAction } from './redux/actions'
import Navbar from './components/navbar/navbar'



export const userContext = createContext({
    user: {}
})

function App() {
    const dispatch = useDispatch()
    const userLogged = useSelector(state => state.userLogged)
    const [open, setOpen] = React.useState(false)

    
    function authChanged(user) {
        return onAuthStateChanged(auth, () => {
            if(user.uid) {
                console.log(user)
                dispatch(LogInAction(user))
            }
            else dispatch(logOutAction())
        })
    }

    useEffect(() => {
        dispatch(getProducts())
        console.log(userLogged)
        return (
            authChanged(userLogged)
        )
        
    }, [userLogged])

    return (
      
        
           <userContext.Provider value={userLogged}> 
           {
            userLogged.isAdmin? (
                null
            ): (
                <Navbar />
            )
           }
           <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/searchResults/:query' element={<SearchResults open={open} setOpen={setOpen}/>} />
                <Route path="/searchResults/:query/:order" element={<SearchResults open={open} setOpen={setOpen} />} />
               <Route path='/register' element={<Register />} />
                <Route path="/helpusimprove" element={<HelpUsImprove />} />
                <Route path="/adminview//*" element={<AdminView />} />
                <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
            {/* <Pago id={'63615409b573f3a4a80dfc1f'}/> */}
            <Footer />
           </userContext.Provider>
        
       
    )
}


export default App