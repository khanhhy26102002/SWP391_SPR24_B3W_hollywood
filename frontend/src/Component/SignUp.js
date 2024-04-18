import { FormControl, FormControlLabel, FormLabel, RadioGroup, Radio } from '@mui/material'
import React from 'react'
import { Icon } from 'react-materialize'
export default function SignUp() {
  return (
    <section class="signup spad">
     <div className='container'>
        <div class="row">
          <div class="login__form">
             <h3>Sign Up</h3>
             <form action="#">
               <div class="input__item">
                 <input type="text" placeholder="user-name"/>
                 <span><Icon left>people</Icon></span>
               </div>
               <div class="input__item">
                <input type="email" placeholder="email"/>
                <span><Icon left>email</Icon></span>
               </div>
               <div class="input__item">
                <input type="password" placeholder="Password"/>
                <span><Icon left>lock</Icon></span>
                </div>
                <div class="input__item">
                <input type="text" placeholder="Address"/>
                <span><Icon left>home</Icon></span>
                </div>
                <div className='white-container'>
                <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">Choose a gender:</FormLabel>
                <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
                <FormControlLabel value="female" control={<Radio/>} label="Female"/>
                <FormControlLabel value="male" control={<Radio/>} label="Male"/>
                <FormControlLabel value="other" control={<Radio/>} label="Other"/>
                </RadioGroup>
                </FormControl>
                </div>
                 <br/>
                  <div className="birthdate-container">
                   Birthdate:
                   <input type="date" />
                  </div>
                  <br/>
                  <div className="black-container">
                    Phonenumber:
                   <input type="number"/>
                  </div>
                <button type="submit" class="site-btn"><a href="./login">Register</a></button>
             </form>
             <h5>Already have an account? <a href="./login">Log In!</a></h5>
          </div>
        </div>
     </div>
   </section>
  )
}
