import { Col, Row } from "react-bootstrap";
import "../styles/style.css";
import {
  styled,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Dialog,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Header } from "./Header";
import { resetPassword } from "../api/authApi";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [token, setToken] = useState("");
  const [mess, setMess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenValue = urlParams.get('token');
    setToken(tokenValue);
  }, []);

  useEffect(() => {
}, [confirm]);

const handleResetPassword = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  console.log(token,newPass,confirm);
  await resetPassword(token, newPass, confirm)
  .then((res) => {
      setOpenConfirmationDialog(true);
      setIsLoading(false);
    })
    .catch((error) => {
      console.log(error);
      setMess("Something wrong!!!!");
      setIsLoading(false);
    });
}

  const handleOnCloseConfirmationDialog = () => {
    setOpenConfirmationDialog(false);
    setMess("");
    navigate("login");
  };

  return (
    <>
      <Header />
      <div className="main-content" style={{background:"#f5f5f5", color: "black",height: "100%"}}>
        <div className="product-page spad">
          <div className="container">
            <div className="row" style={{marginTop: "100px", display:"flex", justifyContent: "center"}}>
                <Col lg={6}>
                    <DialogTitle><strong>Reset Password</strong></DialogTitle>
                    <DialogContent>
                      <DialogTextField
                        label="New password"
                        name="newpassword"
                        value={newPass}
                        onChange={(e) => setNewPass(e.target.value)}
                      />
                      <DialogTextField
                        label="Confirm"
                        name="confirm"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                      />
                      {newPass !== confirm ? (
                        <p style={{ color: "red" }}>
                          Confirm password doesn't match !!!
                        </p>
                      ) : (
                        ""
                      )}
                    </DialogContent>

                    <DialogActions style={{display: "flex", justifyContent: "center"}}>
                      {!isLoading ? (<div onClick={handleResetPassword} color="primary" className="buy-ticket" style={{background: "blue"}}>
                        Change
                      </div>): (
                        <button onClick={handleResetPassword} color="primary" disabled className="buy-ticket" style={{background: "blue"}}>
                        Change
                      </button>
                      )}
                    </DialogActions>
                </Col>
            </div>
          </div>
        </div>
      </div>
      {openConfirmationDialog && (
        <StyledDialog
          open={openConfirmationDialog}
          onClose={handleOnCloseConfirmationDialog}
          style={{paddingLeft: "35%",paddingRight:"35%"}}
        >
          <DialogTitle>
            Notifacation
          </DialogTitle>
          <DialogContent>
            {mess}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleOnCloseConfirmationDialog} color="primary">
              OK
            </Button>
          </DialogActions>
        </StyledDialog>
      )}
    </>
  );
};

export default ResetPassword;

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    width: "100%",
    maxWidth: "1000px",
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
