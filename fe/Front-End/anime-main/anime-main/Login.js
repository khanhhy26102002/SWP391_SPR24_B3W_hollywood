import React, { useEffect } from 'react'
import { UserAuth } from '../context/AuthConext'
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import GoogleButton from 'react-google-button';

export default function Login() {
  const {googleSignIn,user} = UserAuth();
  const navigate = useNavigate()
  const handleGoogleSignIn = async()=>{
     try{
       await googleSignIn();
     }catch(error){
      console.log(error)
     }
  };
  useEffect(()=>{
    if(user!=null){
       navigate('')
    }
  },[user])
  return (
    <div>
      <h5>Login Page</h5>
      <TextField label="Email Address"></TextField><br/>
      <TextField label="Password"></TextField>
      <br/>
      <br/>
      <div className='khanhhy'><GoogleButton onClick={handleGoogleSignIn}/></div>
      <br/>
      <button type='submit'>Đăng nhập</button>
    </div>
  )
}
