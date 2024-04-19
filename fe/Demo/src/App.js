import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { useEffect } from "react";

import PrivateRoute from "./components/PrivateRoute";
import {Home} from "./components/Home";
/*import {SignUp} from "./components/SignUp";
import SignIn from "./components/SignIn";*/
import Contact from "./components/contact";
import Category from "./components/category";
import BuyTicket from "./components/buy-ticket";
import Login from "./components/Login";
import Register from "./components/Register";
import FURules from "./components/FURule";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const jwt = sessionStorage.getItem("jwt");
    setIsLogin(jwt !== null);
  }, [isLogin]);

  return (
    <div className="App">
      <Router>
        
            <Routes>
              <Route path="/" element={<Category />} />
              <Route path="/contact" element={<Contact/>}/>
              <Route path="/category" element={<Category/>}/>
              <Route path="/buyticket" element={<BuyTicket/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/rule" element={<FURules/>}/>
            </Routes>
      </Router>
    </div>
  );
}

const MainLayout = styled("div")`
  width: 100vw;
  height: auto;
  background-color: #f6f1f1;
  padding: 0 4.5rem;
`;

const Box = styled("div")({
  display: "flex",
  overflow: "hidden",
  flexDirection: "column",
});

export default App;
