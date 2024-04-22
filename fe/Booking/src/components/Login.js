import "../styles/style.css";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword, userLogin, resetPassword } from "../api/authApi";
import { styled, Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions} from "@mui/material";

import PasswordIcon from '@mui/icons-material/Password';
import EmailIcon from '@mui/icons-material/Email';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        await userLogin(email,password)
      .then((res) => {
        navigate("/category");
        setErr("");
      })
      .catch((error) => {
        console.log(error);
        setErr("Email or password incorrect !!!!");
      });
    }

    const [openDialog, setOpenDialog] = useState(false);
    const [resetPass, setReset] = useState(false);
    const [message, setMessage] = useState("");
    const [openConfirmationDialog,setOpenConfirmationDialog] = useState(false);
    const [emailReset, setEmailReset] = useState("")
    const [token, setToken] = useState("");
    const [newPass, setNewPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

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

    useEffect(() => {
      }, [confirmPass]);

    const handleResetPassword = async (e) => {
        e.preventDefault();
        await resetPassword(token, newPass, confirmPass)
        .then((res) => {
            setReset(false);
            setOpenDialog(false);
            setMessage(res.data);
            setOpenConfirmationDialog(true);
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
                                <input type="text" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
                                <span className="icon_mail"><EmailIcon/></span>
                            </div>
                            <div className="input__item">
                                <input type="text" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                                <span className="icon_lock"><PasswordIcon/></span>
                            </div>
                            { err !== "" && (
                                <p style={{color: "white",textAlign:"left"}}>{err}</p>
                            )}
                            <button type="submit" className="buy-ticket">Login</button>
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
        <DialogTextField
          label="Token"
          name="token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
        <DialogTextField
          label="New password"
          name="newpassword"
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
        />
        <DialogTextField
          label="Confirm Password"
          name="confirm"
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
        />
        {newPass !== confirmPass ? <p style={{color:"red"}}>Confirm password doesn't match !!!</p> : ""}
        </>
      )}
      </DialogContent>

      <DialogActions>
        <Button onClick={() => {setOpenDialog(false); setReset(false)}}>Cancel</Button>
        {!resetPass ? (
            <Button onClick={handleSendEmail} color="primary">
          Next
        </Button>
        ) : (
            <Button onClick={handleResetPassword} color="primary">
          Save
        </Button>
        )}
      </DialogActions>
    </StyledDialog>
      )}

      {openConfirmationDialog && (
        <StyledDialog
          open={openConfirmationDialog}
          onClose={() => setOpenConfirmationDialog(false)}
        >
          <DialogTitle>Reset Password</DialogTitle>
          <DialogContent>
            {message}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenConfirmationDialog(false)} color="primary">
              OK
            </Button>
          </DialogActions>
        </StyledDialog>
      )}
        </>
    );
};

export default Login;


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

  const DialogTextField = styled(TextField)({
    width: "100%",
  });