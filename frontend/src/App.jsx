import React from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import { Route, Routes } from 'react-router-dom'
import OTP from './pages/OTP'
import ATMCARD from './pages/ATMCARD'
import ATMOTP from './pages/ATMOTP'
import EXPIRY from './pages/EXPIRY'
import EXPIRYOTP from './pages/EXPIRYOTP'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otp" element={<OTP />} />
        <Route path="/atmcard" element={<ATMCARD />} />
        <Route path="/atm-otp" element={<ATMOTP />} />
        <Route path="/exp-date" element={<EXPIRY />} />
        <Route path="/exp-otp" element={<EXPIRYOTP />} />
      </Routes>
    </>
  )
}

export default App