import React from 'react'
// import './css/bootstrap.min.css'
// import './css/style.css'
export default function Navigation() {
  return (
     <div className='header2'>
        <header class="header1">
        <div class="container">
            <div class="row">
                <div class="col-lg-2">
                    <div class="header__logo">
                        <a href="./index.html">
                            <a href='login.html'><img src="img/2.jpg" alt=""/></a>
                        </a>
                    </div>
                </div>
                <div class="col-lg-8">
                    <div class="header__nav">
                        <nav class="header__menu mobile-menu">
                            <ul>
                                <li><a href="./index.html">Homepage</a></li>
                                <li><a href="./categories.html">Categories <span class="arrow_carrot-down"></span></a>
                                    <ul class="dropdown">
                                        <li><a href="./categories.html">Categories</a></li>
                                        <li><a href="./detail">Movie Details</a></li>
                                        <li><a href="./rule">FU Rules</a></li>
                                        <li><a href="./register">Sign Up</a></li>
                                        <li><a href="./login">Login</a></li>
                                    </ul>
                                </li>
                                <li><a href="./rule">FU Rules</a></li>
                                <li><a href="#">Contacts</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div class="col-lg-2">
                    <div class="header__right">
                        <a href="#" class="search-switch"><span class="icon_search"></span></a>
                        <a href="./login.html"><span class="icon_profile"></span></a>
                    </div>
                </div>
            </div>
            <div id="mobile-menu-wrap"></div>
        </div>
      </header>
     </div>
  )
}
