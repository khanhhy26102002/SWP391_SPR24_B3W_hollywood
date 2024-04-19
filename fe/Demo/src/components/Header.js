import React from "react";
import "../styles/style.css";
import { useNavigate } from "react-router-dom";
import { SearchOutlined } from "@mui/icons-material";
import PersonIcon from '@mui/icons-material/Person';
import { userLogout } from "../api/authApi";


export const Header = () => {
    const navigate = useNavigate();
    const handleLogOut = async () =>{
        await userLogout(sessionStorage.getItem("jwt"))
      .then((res) => {
        navigate("/login");
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
                                        <li onClick={() => navigate("/register")}>Sign Up</li>
                                        { sessionStorage.getItem("jwt") === "" ? (<li onClick={() => navigate("/login")}>Login</li>) : <li onClick={() => handleLogOut()}>Logout</li>}
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
                        <a href="#"><PersonIcon onClick={() => navigate("/login")}/></a>
                    </div>
                </div>
            </div>
            <div id="mobile-menu-wrap"></div>
        </div>
    </header>
        );
    }