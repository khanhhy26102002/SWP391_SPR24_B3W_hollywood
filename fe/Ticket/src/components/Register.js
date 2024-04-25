import "../styles/style.css";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import HomeIcon from '@mui/icons-material/Home';
import PhoneIcon from '@mui/icons-material/Phone';
import PasswordIcon from '@mui/icons-material/Password';
import EmailIcon from '@mui/icons-material/Email';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { register } from "../api/authApi";
import { styled, DialogTitle, Dialog, DialogActions, DialogContent } from "@mui/material";
import {Button} from "@mui/material";

const Register = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [birthday, setBirthday] = useState();
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("Male");
  const [err, setErr] = useState("");
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async(e) => {
    e.preventDefault();
    setIsLoading(true);
        await register(userName, email, address,gender, birthday,phone,password)
        .then((res) =>{
          setErr("");
          setOpenConfirmationDialog(true);
          setIsLoading(false);
        })
          .catch((error) => {
            console.log(error);
            setErr("Something wrong!!!!");
            setIsLoading(false);
          });
    
  }
  return (
    <>
      <Header />
      <section class="signup spad">
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
        <div class="container">
          <Row style={{display:"flex", justifyContent:"center"}}>
          <div class="login__form">
                <form onSubmit={handleRegister}>
                  <div class="input__item" style={{display: "flex", justifyContent: "center"}}>
                    <input
                      type="text"
                      placeholder="User-name"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      required
                    />
                    <span class="icon_mail"><AccountCircleIcon/></span>
                  </div>
                  <div class="input__item">
                    <input
                      type="text"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <span class="icon_profile"><EmailIcon/></span>
                  </div>
                  <div class="input__item">
                    <input
                      type="text"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <span class="icon_lock"><PasswordIcon/></span>
                  </div>
                  <div class="input__item">
                    <input
                      type="text"
                      placeholder="Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                    <span class="icon_house"><HomeIcon/></span>
                  </div>
                  <div class="input__item">
                    <input
                      type="text"
                      placeholder="Phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                    <span class="icon_house"><PhoneIcon/></span>
                  </div>
                  <Row style={{ color: "white", fontSize:"20px" }}>
                  <Col
                      lg={6}
                      style={{ display: "flex", justifyContent: "left", fontSize:"20px" }}
                    >
                    Choose a gender:
                    </Col>
                  </Row>
                  <Row style={{ color: "white" }}>
                    <Col lg={4} style={{fontSize:"20px"}}>
                    <input type="radio" name="gender" value="Male" checked={gender === 'Male'} onChange={(event) => setGender(event.target.value)}/>Male
                    </Col>
                    <Col lg={4} style={{fontSize:"20px"}}>
                    <input type="radio" name="gender" value="Female" checked={gender === 'Female'} onChange={(event) => setGender(event.target.value)}/> Female
                    </Col>
                    <Col lg={4} style={{fontSize:"20px"}}>
                    <input type="radio" name="gender" value="Other" checked={gender === 'Other'} onChange={(event) => setGender(event.target.value)}/> Another
                    </Col>
                  </Row>
                  <Row style={{ color: "white" }}>
                    <Col
                      lg={6}
                      style={{ display: "flex", justifyContent: "left", fontSize:"20px" }}
                    >
                      Birthdate:
                    </Col>
                    <Col
                      lg={6}
                      style={{ display: "flex", justifyContent: "left" }}
                    >
                      <input
                        type="date"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        
                        required
                      />
                    </Col>
                  </Row>
                  
                  <br />
                  { err !== "" && (
                                <p style={{color: "white",textAlign:"left"}}>{err}</p>
                            )}
                  {isLoading ? (<button type="submit" class="site-btn" disabled style={{background: "grey"}}>
                    Register
                  </button>) : (
                    <button type="submit" class="site-btn">
                    Register
                  </button>
                  )}
                </form>
              </div>
          </Row>
          <Row style={{display:"flex", justifyContent:"center"}}>
          <h5 onClick={() => navigate("/login")}>
                  Already have an account? <a href="#">Log In!</a>
                </h5>
          </Row>
        </div>
      </section>
      
      {openConfirmationDialog && (
        <StyledDialog
          open={openConfirmationDialog}
          onClose={() => setOpenConfirmationDialog(false)}
        >
          <DialogTitle>Notification</DialogTitle>
          <DialogContent>
            Register successfully !!!!
          </DialogContent>
          <DialogActions>
            <Button onClick={() => navigate("/login")} color="primary">
              OK
            </Button>
            
          </DialogActions>
        </StyledDialog>
      )}
      <Footer />
    </>
  );
};

export default Register;

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogTitle-root": {
    fontWeight: "bold",
    fontSize: "1.5rem",
    textShadow: "none",
  },
  "& .MuiTextField-root": {
    marginBottom: theme.spacing(2),
  },
  "& .MuiDialogContent-root": {
    paddingTop: "1rem",
  },
  "& .MuiFormControl-root": {
    marginBottom: theme.spacing(2),
  },
  "& .MuiTypography-root": {
    color: "black",
    marginBottom: theme.spacing(2),
  },
  "& .MuiButton-root:not(:last-child)": {
    marginRight: theme.spacing(1),
  },
}));