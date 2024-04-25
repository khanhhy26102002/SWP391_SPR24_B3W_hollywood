import { useState } from "react";
import "../styles/admin.css";
import "./Sidebar.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import MovieIcon from '@mui/icons-material/Movie';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import PeopleIcon from '@mui/icons-material/People';
import PieChartIcon from '@mui/icons-material/PieChart';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [page, setPage] = useState("");

  useEffect(() => {
    if (location.state !== null) {
      setPage(location.state);
    }
  }, [location.state]);
    return(
        <nav class="sidebar sidebar-offcanvas" id="sidebar">
        <div class="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
          <img src="https://inthienha.com/wp-content/uploads/CGV-Cinemas-1536x1152.png?v=1606473529" alt="logo" />
        </div>
        <ul class="nav">
          <li class={`nav-item nav-category`}>
            <span class="nav-link">Navigation</span>
          </li>
          <li class={`nav-item menu=items ${page === "admin" ? "active1" : ""}`} onClick={() => navigate("/admin", {state: "admin"})}>
            <a class="nav-link" href="/admin">
              <span class="menu-icon">
                <PieChartIcon/>
              </span>
              <span class="menu-title">Dashboard</span>
            </a>
          </li>
          <li class={`nav-item menu-items ${page === "manageuser" ? "active1" : ""}`} onClick={() => navigate("/manageuser", {state: "manageuser"})}>
            <a class="nav-link" href="">
              <span class="menu-icon">
                <PeopleIcon/>
              </span>
              <span class="menu-title">Manage User</span>
            </a>
          </li>
          <li class={`nav-item menu-items ${page === "managecombo" ? "active1" : ""}`} onClick={() => navigate("/managecombo", {state: "managecombo"})}>
            <a class="nav-link" href="">
              <span class="menu-icon">
                <FastfoodIcon/>
              </span>
              <span class="menu-title">Manage Combo</span>
            </a>
          </li>
          <li class={`nav-item menu-items ${page === "managemovie" ? "active1" : ""}`} onClick={() => navigate("/managemovie", {state: "managemovie"})}>
            <a class="nav-link" href="">
              <span class="menu-icon">
                <MovieIcon/>
              </span>
              <span class="menu-title">Manage Movie</span>
            </a>
           </li>
           <li className="nav-items menu-items">
            <a class="nav-link" href="/order">
              <span class="menu-icon">
                <MovieIcon/>
              </span>
              <span class="menu-title">Manage Orders</span>
            </a>
           </li>
          <span className="menu-title" style={{textAlign:"left"}}><a href="./category">Homepage</a></span>
        </ul>
      </nav>
    );
}

export default Sidebar;