import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Singup_Login/Login';
import Navbar from './components/Navbar/Navbar';
import './firebase'
import Signup from './pages/Singup_Login/Signup';
import Home from './pages/Home/Home';
export default function App() {


  return (
    <>
      {/* <Navbar /> */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          {/* <Route path="/contact" element={<ContactPage />} /> */}
        </Routes>
      </Router>
    </>
  )
}

