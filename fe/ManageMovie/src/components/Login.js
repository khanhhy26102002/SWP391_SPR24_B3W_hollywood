import "../styles/style.css";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../api/authApi";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState([]);
    const [password, setPassword] = useState([]);
    const navigate = useNavigate();
    const handleLogin = async()=>{
        try{
            const response = await axios.post('http://localhost:8080/api/auth/login',{
                email,
                password,
            });
            const token = response.data.token;
            localStorage.setItem('token',token);
        }catch(error){
            console.error('Error logging in',error);
        }
    };
    

    const handleSubmit = async () => {
        await userLogin(email,password)
      .then((res) => {
        navigate("/category", {state: true});
        // setErr("");
      })
      .catch((error) => {
        console.log(error);
        // setErr("Email or password incorrect !!!!");
      });
    }

    return (
        <>
        <Header/>
            <section className="normal-breadcrumb set-bg" style={{backgroundImage:`url(./img/images.jpg)`}}>
        <div className="container">
            <div className="row">
                <div className="col-lg-12 text-center">
                    <div className="normal__breadcrumb__text">
                        <h2>Login</h2>
                        <p>Welcome to the official CGV Ticket.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <section className="login spad">
        <div className="container">
            <div className="row">
                <div className="col-lg-6">
                    <div className="login__form">
                        <h3>Login</h3>
                        <form onSubmit={() => handleSubmit()}>
                            <div className="input__item">
                                <input type="text" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
                                <span className="icon_mail"></span>
                            </div>
                            <div className="input__item">
                                <input type="text" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                                <span className="icon_lock"></span>
                            </div>
                            {/* { err !== "" && (
                                <p style={{color: "white",textAlign:"left"}}>{err}</p>
                            )} */}
                            <button type="submit" className="buy-ticket">Login</button>
                        </form>
                        <a href="#" className="forget_pass">Forgot Your Password?</a>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="login__register">
                        <h3>Don’t Have An Account?</h3>
                        <div className="red_button message_submit_btn trans_300" onClick={() => navigate(`/register`)}>Register Now</div>
                    </div>
                </div>
            </div>
            <div className="login__social">
                <div className="row d-flex justify-content-center">
                    <div className="col-lg-6">
                        <div className="login__social__links">
                            <span>or</span>
                            <ul>
                                <li><a href="#" className="google"><i className="fa fa-google"></i> Sign in With Google</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <Footer/>
        </>
    );
};

export default Login;