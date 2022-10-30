import React from 'react'
import Navbar from '../navbar/navbar.jsx'
import { Outlet } from 'react-router-dom'
import './HomePage.module.css'


export default function HomePage() {
    
  return (
    <div>
        <Navbar />
        <h1>HomePage</h1>
        <Outlet />
    </div>
  )
}
