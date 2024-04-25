import { useState } from "react";
import "../styles/admin.css";
import "./Sidebar.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import MovieIcon from '@mui/icons-material/Movie';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import PeopleIcon from '@mui/icons-material/People';
import PieChartIcon from '@mui/icons-material/PieChart';
import TvIcon from '@mui/icons-material/Tv';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import pic from "../img/logo-removebg-preview.png";

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
        <nav class="sidebar sidebar-offcanvas" id="sidebar" style={{background: "#070720"}}>
        <div class="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
          <img src={pic} alt="logo" />
        </div>
        <ul class="nav">
          <li class={`nav-item nav-category`}>
            <span class="nav-link">Navigation</span>
          </li>
          {sessionStorage.getItem("userRoleName") === "ADMIN" && (
            <li class={`nav-item menu=items ${page === "admin" ? "active1" : ""}`} style={{cursor: "pointer"}} onClick={() => navigate("/admin", {state: "admin"})}>
            <div class="nav-link">
              <span class="menu-icon">
                <PieChartIcon/>
              </span>
              <span class="menu-title">Dashboard</span>
            </div>
          </li>
          )}
          <li class={`nav-item menu-items ${page === "vieworder" ? "active1" : ""}`} style={{cursor: "pointer"}} onClick={() => navigate("/vieworder", {state: "vieworder"})}>
            <div class="nav-link">
              <span class="menu-icon">
                <ShoppingCartIcon/>
              </span>
              <span class="menu-title">View Order</span>
            </div>
          </li>
          <li class={`nav-item menu-items ${page === "manageuser" ? "active1" : ""}`} style={{cursor: "pointer"}} onClick={() => navigate("/manageuser", {state: "manageuser"})}>
            <div class="nav-link">
              <span class="menu-icon">
                <PeopleIcon/>
              </span>
              <span class="menu-title">Manage User</span>
            </div>
          </li>
          <li class={`nav-item menu-items ${page === "managecombo" ? "active1" : ""}`} style={{cursor: "pointer"}} onClick={() => navigate("/managecombo", {state: "managecombo"})}>
            <div class="nav-link">
              <span class="menu-icon">
                <FastfoodIcon/>
              </span>
              <span class="menu-title">Manage Combo</span>
            </div>
          </li>
          <li class={`nav-item menu-items ${page === "managemovie" ? "active1" : ""}`} style={{cursor: "pointer"}}onClick={() => navigate("/managemovie", {state: "managemovie"})}>
            <div class="nav-link">
              <span class="menu-icon">
                <MovieIcon/>
              </span>
              <span class="menu-title">Manage Movie</span>
            </div>
          </li>
          <li class={`nav-item menu-items ${page === "managescreening" ? "active1" : ""}`} style={{cursor: "pointer"}} onClick={() => navigate("/managescreening", {state: "managescreening"})}>
            <div class="nav-link">
              <span class="menu-icon">
                <TvIcon/>
              </span>
              <span class="menu-title">Manage Screening</span>
            </div>
          </li>
        </ul>
      </nav>
    );
}

export default Sidebar;