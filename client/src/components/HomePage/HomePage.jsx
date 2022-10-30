import React from 'react'
import Navbar from '../navbar/navbar.jsx'
import { Outlet } from 'react-router-dom'
import Cards from "../Cards/Cards";
import './HomePage.module.css'


export default function HomePage() {

  return (
    <div>
      <Navbar />
      <Outlet />
      <Cards />
    </div>
  )
}
