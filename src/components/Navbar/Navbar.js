import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.scss";
import { getAuth } from "firebase/auth";
import { useUser } from "../../Contexts/UserContext";

export default function Navbar(props) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const { userData, loading, error } = useUser()

    const auth = getAuth();
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    if (loading) {
        return (<>Loading...</>)
    }
    if (error) {
        return <>We Faced an error, Please refresh to try again.</>
    }

    if (userData)


        return (
            <nav>
                <div className="nav-items">
                    <div className="home-account">
                        <Link to="/">E-Commerce</Link>
                    </div>

                    <div className="search">
                        <input
                            className="searchInput"
                            type="text"
                            placeholder="Search Products"
                        />
                    </div>

                    <div className="home-account">
                        <div className="dropdown"
                            onMouseEnter={toggleDropdown}
                            onMouseLeave={toggleDropdown}
                        >
                            <button className={`dropdown-btn ${isDropdownOpen ? 'open-select' : ''}`}>
                                <span>
                                    <i style={{ fontSize: '1.2rem' }} class="fa-light fa-user-circle" aria-hidden="true"></i>
                                </span>
                                {props.accountName}
                                <span>
                                    <i style={{ fontSize: '1.2rem' }} className={`fa-light fa-circle-chevron-${isDropdownOpen ? 'up' : 'down'}`} aria-hidden="true"></i>
                                </span>
                            </button>

                            <div
                                className={`dropdown-content ${isDropdownOpen ? 'openAnimation' : 'closeDropdown'}`} >
                                {
                                    isDropdownOpen && (
                                        <>
                                            <Link to="/profile" onClick={() => setIsDropdownOpen(false)}>
                                                <i className="fa-light fa-user" aria-hidden="true"></i> Profile
                                            </Link>

                                            <Link to="/cart" onClick={() => setIsDropdownOpen(false)}>
                                                <i className="fa-light fa-shopping-cart" aria-hidden="true"></i> Cart
                                            </Link>

                                            <Link to="/orders" onClick={() => setIsDropdownOpen(false)}>
                                                <i className="fa-light fa-list" aria-hidden="true"></i> Orders
                                            </Link>

                                            <Link to="/notifications" onClick={() => setIsDropdownOpen(false)}>
                                                <i className="fa-light fa-bell" aria-hidden="true"></i> Notifications
                                            </Link>

                                            {
                                                userData.userType === "seller" &&
                                                <Link to={`/sellitem`}>
                                                    <i className="fa-light fa-upload" aria-hidden="true"></i> Sell an Item
                                                </Link>
                                            }

                                            <Link to="#" onClick={() => { auth.signOut(); navigate('/login') }}>
                                                <i className="fa-light fa-sign-out" aria-hidden="true"></i>
                                                Logout
                                            </Link>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </nav >
        );
}
