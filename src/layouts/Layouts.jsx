import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/ui/Navbar'
import { Footer } from '../components/ui/Footer'

const Layouts = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
     <div className='mt-24'>
       <Outlet />
     </div>
     <div>
      <Footer />
     </div>
    </div>
  )
}

export default Layouts