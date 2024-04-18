import React, { useEffect, useState } from 'react'
import { UserAuth } from '../context/AuthConext';
import {Icon} from 'react-materialize'
import './css/style.css'
import axios from 'axios';
import GoogleButton from 'react-google-button';
import { useNavigate } from 'react-router-dom';
export default function Login() {
  // const {googleSignIn,user} = UserAuth();
  // const navigate = useNavigate()
  // const handleGoogleSignIn = async()=>{
  //    try{
  //      await googleSignIn();
  //    }catch(error){
  //      console.log(error)
  //    }
  // };
  // useEffect(()=>{
  //    if(user!=null){
  //       navigate('/Form')
  //    }
  // },[user])
  return (
    <div>
    <section class="login spad">
      <h3 className="blue1">Login</h3><br/>
      <div class="container">
        <div class="row">
          <div class="col-lg-6">
            <div class="login__form">
              <form action="#">
                <div class="input__item">
               <input type="text" placeholder="Email"/>
               <span><Icon left>email</Icon></span>
                </div>
                <div class="input__item">
                <input type="password" placeholder="Password"/>
                <span class="icon_lock"><Icon left>lock</Icon></span>
                </div>
                <div className='blue2'>
                <button type="submit" className='site-btn'><a href="#">Login Now</a></button>
                </div>
                </form>
                <a href="#" class="forget_pass">Forgot Your Password?</a>   
            </div>
          </div>
          <br/>
          <div class="login__register">
              <h5 class="blue4">Dont’t Have An Account?</h5>
              <a href="./register" class="primary-btn">Register Now</a>
          </div>
          <br/>
        </div>
      </div>
    </section>
    </div>
  )
}

