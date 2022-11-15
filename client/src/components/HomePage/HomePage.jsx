
import React from 'react'
import Navbar from '../navbar/navbar.jsx'
import Cards from '../Cards/Cards'
import HeroSlider from '../HeroSlider/HeroSlider'
import Brands from '../Brands/Brands.jsx'
import Footer from '../Footer/Footer.jsx'
import { useSelector } from 'react-redux'
// import './HomePage.module.css'
// import { Outlet } from 'react-router-dom'

export default function HomePage() {


    return (
        <div className=" w-full overflow-hidden">
      
            <HeroSlider />
            {/* <Outlet /> */}
            <Cards />
            <Brands />
            <Footer/>
        </div>
    )
}
