import React, { useState } from "react";
import "../styles/style.css";
import { useNavigate } from "react-router-dom";
import { SearchOutlined } from "@mui/icons-material";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { userLogout } from "../api/authApi";
import { useLocation } from "react-router-dom";


export const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [login,setLogin] = useState(location.state);
    const handleLogOut = async () =>{
        await userLogout(sessionStorage.getItem("jwt"))
      .then((res) => {
        navigate("/login");
        setLogin(false);
      })
      .catch((error) => {
        console.log(error);
      });
    }

    return (

<header className="header">
        <div className="container">
            <div className="row">
                <div className="col-lg-2">
                    <div className="header__logo">
                        <a href="#">
                            <img src="img/logo.png" alt=""/>
                        </a>
                    </div>
                </div>
                <div className="col-lg-8">
                    <div className="header__nav">
                        <nav className="header__menu mobile-menu">
                            <ul>
                                <li onClick={() => navigate("/category")}><a href="#">Homepage</a></li>
                                <li><a href="#">Categories <span className="arrow_carrot-down"></span></a>
                                    <ul className="dropdown">
                                        <li onClick={() => navigate("/category")}>Categories</li>
                                        <li onClick={() => navigate("/detail")}>Movie Details</li>
                                        <li onClick={() => navigate("/rule")}>Our Rules</li>
                                        
                                        {login ? <li onClick={() => handleLogOut()}>Logout</li> : (
                                            <>
                                            <li onClick={() => navigate("/login")}>Login</li>
                                            <li onClick={() => navigate("/register")}>Sign Up</li>
                                            </>
                                            )}
                                    </ul>
                                </li>
                                <li onClick={() => navigate("/rule")}><a href="#">Our Rules</a></li>
                                <li onClick={() => navigate("/contact")}><a href="#">Contacts</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div className="col-lg-2">
                    <div className="header__right">
                      <a href="#" class="search-switch"><SearchOutlined/></a>
                        {login ? <a href="#"><LogoutIcon onClick={() => handleLogOut()}/><span onClick={() => handleLogOut()}>Logout</span></a> 
                                : 
                                <a href="#"><LoginIcon onClick={() => navigate("/login")}/><span onClick={() => navigate("/login")}>Login</span></a>}
                    </div>
                </div>
            </div>
            <div id="mobile-menu-wrap"></div>
        </div>
    </header>
        );
    }