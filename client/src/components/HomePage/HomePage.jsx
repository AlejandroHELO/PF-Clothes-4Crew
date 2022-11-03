import React from 'react'
import Navbar from '../navbar/navbar.jsx'
import Cards from '../Cards/Cards'
import HeroSlider from '../HeroSlider/HeroSlider'
import Brands from '../Brands/Brands.jsx'
import Footer from '../Footer/Footer.jsx'
// import './HomePage.module.css'
// import { Outlet } from 'react-router-dom'

export default function HomePage() {
    return (
        <div className=" max-w-screen-xl mb-20">
            <Navbar />
            <HeroSlider />
            {/* <Outlet /> */}
            <Cards />
            <Brands />
            <img src={'/images/Clothes 4Crew Logo.JPG'} alt="Logo" />
            <Footer />
        </div>
    )
}
