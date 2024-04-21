import "../styles/style.css";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Register = () =>{
    const navigate = useNavigate();
    const [userName, setUserName] = useState();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [birthday, setBirthday] = useState();
    const [phone, setPhone] = useState("");
    return(
        <>
            <Header/>
            <section class="normal-breadcrumb set-bg" style={{backgroundImage:`url(./img/images.jpg)`}}>
        <div class="container">
            <div class="row">
                <div class="col-lg-12 text-center">
                    <div class="normal__breadcrumb__text">
                        <h2>Sign Up</h2>
                        <p>Welcome to the official Anime blog.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="signup spad">
        <div class="container">
            <div class="row">
                <div class="col-lg-6">
                    <div class="login__form">
                        <h3>Sign Up</h3>
                        <form action="#">
                            <div class="input__item">
                                <input type="text" placeholder="User-name" value={userName} onChange={(e) => setUserName(e.target.value)}/>
                                <span class="icon_mail"></span>
                            </div>
                            <div class="input__item">
                                <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                <span class="icon_profile"></span>
                            </div>
                            <div class="input__item">
                                <input type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                <span class="icon_lock"></span>
                            </div>
                            <div class="input__item">
                                <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)}/>
                                <span class="icon_house"></span>
                            </div>
                           <Row style={{color: "white"}}>
                            Choose a gender:
                            </Row>
                            <Row style={{color: "white"}}>
                            <Col lg={4}><input checked="checked" type="radio" name="gender"/> Male</Col>
                            <Col lg={4}><input name="gender" type="radio"/> Female</Col>
                            <Col lg={4}><input name="gender" type="radio"/> Another</Col>
                           </Row>
                           <Row style={{color: "white"}}>
                                <Col lg={6} style={{display:"flex", justifyContent:"left"}}>Birthdate:</Col>
                                <Col lg={6} style={{display:"flex", justifyContent:"left"}}><input type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)}/></Col>
                           </Row>
                           <Row style={{color: "white"}}>
                                <Col lg={6} style={{display:"flex", justifyContent:"left"}}>Phone number:</Col>
                                <Col lg={6} style={{display:"flex", justifyContent:"left"}}><input type="text" value={phone} onChange={(e) => setPhone(e.target.value)}/></Col>
                           </Row>
                            <br/>
                            <button type="submit" class="site-btn">Register</button>
                        </form>
                        <h5 onClick={() => navigate("/login")}>Already have an account? <a href="#">Log In!</a></h5>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="login__social__links">
                        <h3>Login With</h3>
                        <ul>
                            <li><a href="#" onclick="" class="google"><i class="fa fa-google"></i> Sign in With Google</a></li>

                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <Footer/>
        </>
    );
};

export default Register;