import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/home'
import Cart from './pages/Cart/cart'
import PlaceOrder from './pages/PlaceOrder/placeorder'
import Footer from './components/Footer/footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'

const App = () => {

  const [showLogin,setShowLogin] =useState(false)


  return (
    <>
    {
      showLogin ? <LoginPopup setShowLogin={setShowLogin}/>:<></>
    }
    <div className='app'>
    <Navbar setShowLogin={setShowLogin}/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/order' element={<PlaceOrder/>}/>
      <Route path='/verify' element={<Verify/>}/>
      <Route path='/myorders' element={<MyOrders/>}/>

    </Routes>
    </div>
    <Footer/>

    </>
  
  )
}

export default App