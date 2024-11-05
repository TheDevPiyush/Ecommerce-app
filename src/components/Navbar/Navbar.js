import React from "react";
import Inputfield from "../Inputfield/Inputfield";
import "./navbar.scss";
import { Link } from "react-router-dom";
export default function Navbar(props) {
    return (
        <>
            <nav>
                <div className="nav-items">
                    <div className="home-account">
                        <Link>
                            E-Commerce
                        </Link>
                    </div>
                    <div className="search">

                        <input
                            className="searchInput"
                            type="text"
                            placeholder="Search Products"
                        />
                    </div>
                    <div className="home-account">
                        <Link>
                            {props.accountName}
                            <span>
                                <i class="fa fa-arrow-down" aria-hidden="true"></i>
                            </span>
                        </Link>
                        <Link>
                            <span>
                                <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                            </span>
                            Cart
                        </Link>
                    </div>
                </div>
            </nav>
        </>
    );
}
