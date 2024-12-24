import React from 'react'
import { StickyNavbar } from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MainLayout } from './layouts/Mainlayout'
import Home from './pages/Home'
import ResellTickets from './pages/ResellTickets'
import CreateEvent from './pages/CreateEvent'
import LoginSignup from './pages/LoginSignup'

export default function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}> 
          <Route index element={<Home />} />
          <Route path="/resell-tickets" element={<ResellTickets />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/login-signup" element={<LoginSignup />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}
