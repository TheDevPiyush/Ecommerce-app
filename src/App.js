import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Singup_Login/Login';
import Navbar from './components/Navbar/Navbar';

export default function App() {
  return (
    <>
      {/* <Navbar /> */}
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route path="/about" element={<AboutPage />} /> */}
          {/* <Route path="/contact" element={<ContactPage />} /> */}
        </Routes>
      </Router>
    </>
  )
}

