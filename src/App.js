import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Login from './pages/Singup_Login/Login';
import Signup from './pages/Singup_Login/Signup';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import Navbar from './components/Navbar/Navbar';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useUser } from './Contexts/UserContext';
import './firebase';
import ProductUpload from './pages/ProductUpload/ProductUpload';

export default function App() {
  const { userData, loading } = useUser();
  const auth = getAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user && location.pathname !== '!login' && location.pathname !== '/register') {
        navigate('/login', { replace: true });
      }
    });
    return () => unsubscribe();
  }, [auth, navigate]);

  // Hide Navbar on login and signup pages
  const showNavbar = location.pathname !== '/login' && location.pathname !== '/register';

  if (loading) {
    return <>
      loading...
    </>
  }

  return (
    <>
      {showNavbar && <Navbar accountName={userData && userData.name} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/sellitem" element={<ProductUpload />} />
      </Routes>
    </>
  );
}
