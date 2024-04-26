import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { styled } from "@mui/material/styles";
import Contact from "./components/contact";
import Category from "./components/category";
import BuyTicket from "./components/buy-ticket";
import Login from "./components/Login";
import Register from "./components/Register";
import FURules from "./components/FURule";
import Moviedetail from "./components/Detail";
import Dashboard1 from "./components/AdminPage";
import ManageUser from "./components/ManageUser";
import ManageCombo from "./components/ManageCombo";
import ManageMovie from "./components/ManageMovie";
import ManageScreening from "./components/ManageScreening";
import Profile from "./components/Profile";
import ResetPassword from "./components/ResetPassword";
import ViewOrder from "./components/ViewOrder";
import TestImage from "./components/Image";
import Payment from "./components/Payment";

function App() {

  return (
    <div className="App">
      <Router>
        
            <Routes>
              <Route path="/" element={<Category />} />
              <Route path="/contact" element={<Contact/>}/>
              <Route path="/home" element={<Category/>}/>
              <Route path="/buyticket" element={<BuyTicket/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/rule" element={<FURules/>}/>
              <Route path="/detail" element={<Moviedetail/>}/>
              <Route path="/admin" element={<Dashboard1/>}/>
              <Route path="/manageuser" element={<ManageUser/>}/>
              <Route path="/managecombo" element={<ManageCombo/>}/>
              <Route path="/managemovie" element={<ManageMovie/>}/>
              <Route path="/managescreening" element={<ManageScreening/>}/>
              <Route path="/myprofile" element={<Profile/>}/>
              <Route path="/api/auth/resetPassword" element={<ResetPassword/>}/>
              <Route path="/vieworder" element={<ViewOrder/>}/>
              <Route path="/test" element={<TestImage/>}/>
              <Route path="/payment" element={<Payment/>}/>
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
