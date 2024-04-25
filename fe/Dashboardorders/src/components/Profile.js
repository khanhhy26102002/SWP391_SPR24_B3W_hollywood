import React from 'react'
import Navbar from './Navbar'
import { Header } from './Header'
import { Footer } from "./Footer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword, userLogin, resetPassword } from "../api/authApi";
import { styled, Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions } from "@mui/material";

import PasswordIcon from '@mui/icons-material/Password';
import EmailIcon from '@mui/icons-material/Email';
export default function Profile() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await userLogin(email, password)
      .then((res) => {
        navigate("/category");
        setErr("");
      })
      .catch((error) => {
        console.log(error);
        setErr("Email or password incorrect !!!!");
      });
  }
  return (
    <div>
      <Header/>
       {/* <TextField autoFocus
       margin="dense"
       name="name"
       label */}
    </div>
  )
}
