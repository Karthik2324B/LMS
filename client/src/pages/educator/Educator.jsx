import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/educator/Navbar'
import Sidebar from '../../components/educator/Sidebar'
import Footer from '../../components/educator/Footer'

const Educator = () => {
  return (
    // 1. Make the main wrapper a vertical flex container
    <div className='flex flex-col text-default min-h-screen bg-white'>
      <Navbar />

      {/* 2. Make this middle section grow to fill all available space */}
      <div className='flex flex-1'>
        <Sidebar />
        <div className='flex-1'>
          <Outlet />
        </div>
      </div>

      {/* This will now be pushed to the bottom */}
      <Footer />
    </div>
  )
}

export default Educator