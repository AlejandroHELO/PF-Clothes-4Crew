import React from 'react'
import { Outlet } from 'react-router-dom'
import './HomePage.module.css'


export default function HomePage() {
    
  return (
    <div>
        <h1>HomePage</h1>
        <Outlet />
    </div>
  )
}
