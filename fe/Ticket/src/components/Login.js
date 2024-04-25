import "../styles/style.css";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword, userLogin, resetPassword } from "../api/authApi";
import { styled, Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import PasswordIcon from '@mui/icons-material/Password';
import { getUserProfile } from "../api/manageUserApi";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState("");
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await userLogin(email,password)
      .then( async() => {
        await getUserProfile(sessionStorage.getItem("userId"), sessionStorage.getItem("jwt"))
        .then((resp) => {
          sessionStorage.setItem("userName", resp.data.userName);
          sessionStorage.setItem("userRoleName", resp.data.role.roleName);
          sessionStorage.setItem("userAvt", resp.data.avatar);
        }).catch((error) => {
        console.log(error);
      });
        if(sessionStorage.getItem("userRoleName") === "MEMBER"){ 
          navigate("/home");
        } else if (sessionStorage.getItem("userRoleName") === "ADMIN") {
          navigate("/admin");
        } else {
          navigate("/manageuser");
        };
        setErr("");
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setErr("Email or password incorrect !!!!");
        setIsLoading(false);
      });
    }

    const [openDialog, setOpenDialog] = useState(false);
    const [resetPass, setReset] = useState(false);
    const [message, setMessage] = useState("");
    const [emailReset, setEmailReset] = useState("");

      const handleSendEmail = async (e) => {
        e.preventDefault();
        await forgotPassword(emailReset)
      .then((res) => {
        setReset(true);
        setMessage(res.data);
      })
      .catch((error) => {
        console.log(error);
        setErr("Something wrong!!!!");
      });
    }

    return (
        <>
        <Header/>
            <section className="normal-breadcrumb set-bg">
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
                        <form onSubmit={handleSubmit}>
                            <div className="input__item">
                                <input type="text" placeholder="Email/Phone number" required value={email} onChange={(e) => setEmail(e.target.value)}/>
                                <span className="icon_mail"><PersonIcon/></span>
                            </div>
                            <div className="input__item">
                                <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                                <span className="icon_lock"><PasswordIcon/></span>
                            </div>
                            { err !== "" && (
                                <p style={{color: "white",textAlign:"left"}}>{err}</p>
                            )}
                            {isLoading ? (<button type="submit" className="buy-ticket" disabled style={{background: "grey"}}>Login</button>):(<button type="submit" className="buy-ticket">Login</button>)}
                        </form>
                        <span className="forget_pass" style={{cursor: "pointer"}} onClick={() => setOpenDialog(true)}>Forgot Your Password?</span>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="login__register">
                        <h3>Don’t Have An Account?</h3>
                        <div className="red_button message_submit_btn trans_300" onClick={() => navigate(`/register`)}>Register Now</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <Footer/>
    {openDialog && (
        <StyledDialog open={openDialog} onClose={() => setOpenDialog(false)}>
      <DialogTitle>Forgot Password</DialogTitle>
      <DialogContent>
      {!resetPass ? (
        <DialogTextField
          label="Your email"
          name="email"
          value={emailReset}
          onChange={(e) => setEmailReset(e.target.value)}
        />
      ) : (
        <>
        <DialogTitle>{message}</DialogTitle>
        </>
      )}
      </DialogContent>

      <DialogActions>
        {!resetPass ? (
          <>
          <Button onClick={() => {setOpenDialog(false); setReset(false)}}>Cancel</Button>
            <Button onClick={handleSendEmail} color="primary">
          Send
        </Button>
          </>
        ) : (
          <Button onClick={() => setOpenDialog(false)} color="primary">
          OK
        </Button>
        )}
      </DialogActions>
    </StyledDialog>
      )}
        </>
    );
};

export default Login;


const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    width: "100%",
    maxWidth: "600px",
  },
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

  const DialogTextField = styled(TextField)({
    width: "100%",
  });