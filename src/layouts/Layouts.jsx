import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/ui/Navbar'
import { useState } from 'react'
import { Footer } from '../components/ui/Footer'
import CartModal from '../components/CartModal'
const Layouts = () => {
   const [isCartOpen, setIsCartOpen] = useState(false);
  
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  return (
    <div>
      <div>
       <Navbar openCart={openCart} />
      </div>
      <div>
         <CartModal isOpen={isCartOpen} onClose={closeCart}/>
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