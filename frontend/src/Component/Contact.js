import "./css/style.css";
import HomeIcon from '@mui/icons-material/Home';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState } from "react";

  const Contact = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    return (
      <div>

        <div className="main-content">
        <div className="breadcrumb-option">
          <div className="container">
                    <div className="breadcrumb__links">
                        <span ><HomeIcon/> Home</span>
                        <ArrowForwardIosIcon/>
                        <span>Contact</span>
                    </div>
          </div>
        </div>


    <div className="anime-details spad">
      <div className="container">
            <div className="anime__details__content">
                <div className="row">
                    <div className="col-lg-6">
                            <div className="section-title">
                                <h5>Contacts</h5>
                            </div>
                            <div className="contact_contents">
                                <p>There are many ways to contact us. You may drop us a line, give us a call or send an email, choose what suits you the most.</p>
                                <div>
                                    <p>Hotline: (800) 686-6688</p>
                                    <p>Email: info.deercreative@gmail.com</p>
                                    <p>Open hours: 8:00-22:00</p>
                                </div>
                                    
                            </div>
                            <div className="follow_us_contents">
                                <h1>Follow Us</h1>
                                <ul className="social d-flex flex-row">
                                    <li><a href="#" style={{backgroundColor: "#3a61c9"}}><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                                    <li><a href="#" style={{backgroundColor: "#41a1f6"}}><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
                                    <li><a href="#" style={{backgroundColor: "#fb4343"}}><i className="fa fa-google-plus" aria-hidden="true"></i></a></li>
                                    <li><a href="#" style={{backgroundColor: "#8f6247"}}><i className="fa fa-instagram" aria-hidden="true"></i></a></li>
                                </ul>
                            </div>
                    </div>
                    <div className="col-lg-6 contact">
                            <div className="section-title">
                                <h5>Get In Touch With Us!</h5>
                            </div>
                            <p>Fill out the form below to recieve a free and confidential.</p>
					<form action="post">
						<div>
                            <input className="form_input input_email input_ph" type="email" name="email" placeholder="Email" required data-error="Valid email is required." value={email} onChange={(e) => setEmail(e.target.value)}/>
							<textarea className="input_ph input_message" name="message"  placeholder="Message" rows="3" required data-error="Please, write us a message." value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
						</div>
						<div>
							<button id="review_submit" type="submit" className="red_button message_submit_btn trans_300" value="Submit">send message</button>
						</div>
					</form>
                            
                    </div>
                </div>
            </div>
            </div>
        </div>
        </div>

        <div className="search-model">
            <div className="h-100 d-flex align-items-center justify-content-center">
                <div className="search-close-switch"><i className="icon_close"></i></div>
                <form className="search-model-form">
                    <input type="text" id="search-input" placeholder="Search here....."/>
                </form>
            </div>
        </div>
      </div>
    );
  };
  
  export default Contact;
  