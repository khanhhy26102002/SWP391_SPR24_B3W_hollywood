import React, { useState } from "react";
import "../styles/style.css";
import { useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { changePassword, userLogout } from "../api/authApi";
import {
  styled,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
} from "@mui/material";
import pic from "../img/logo-removebg-preview.png";

export const Header = () => {
  const navigate = useNavigate();
  const handleLogOut = async () => {
    await userLogout(sessionStorage.getItem("jwt"))
      .then((res) => {
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [openDialog, setOpenDialog] = useState(false);
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [message, setMessage] = useState("");
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);

  const handleChangePass = async (e) => {
    e.preventDefault();
    await changePassword(oldPass, newPass, sessionStorage.getItem("jwt"))
      .then((res) => {
        setOpenDialog(false);
        setMessage(res.data);
        setOpenConfirmationDialog(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <header className="header">
      <div className="container">
        <div className="row">
          <div className="col-lg-2">
            <div className="header__logo">
              <a href="/home">
                <img
                  src={pic}
                  alt=""
                  style={{ width: "200px", height: "auto" }}
                />
              </a>
            </div>
          </div>
          <div
            className="col-lg-8"
            style={{ display: "flex", alignItems: "center" }}
          >
            <div className="header__nav">
              <nav className="header__menu mobile-menu">
                <ul style={{ display: "flex", marginBottom: "0" }}>
                  <li
                    onClick={() => navigate("/home")}
                    style={{ cursor: "pointer" }}
                  >
                    Homepage
                  </li>
                  <li
                    onClick={() => navigate("/rule")}
                    style={{ cursor: "pointer" }}
                  >
                    Our Rules
                  </li>
                  <li
                    onClick={() => navigate("/contact")}
                    style={{ cursor: "pointer" }}
                  >
                    Contacts
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div
            className="col-lg-2"
            style={{ display: "flex", alignItems: "center" }}
          >
            <div className="header__right">
              {sessionStorage.getItem("jwt") !== null ? (
                <>
                  <div class="navbar-profile" style={{display:"flex"}}>
                    <AccountCircleIcon
                      style={{ width: "40px", height: "40px" }}
                    />
                    <span>Welcome, <strong>{sessionStorage.getItem("userName")}</strong></span>
                  </div>
                  <ul className="dropdown">
                    <li>
                      <h6 class="p-3 mb-0">Profile</h6>
                    </li>
                    <li>
                      <div class="preview-thumbnail">
                        <div class="preview-icon bg-dark rounded-circle">
                          <i class="mdi mdi-settings text-success"></i>
                        </div>
                      </div>
                      <div class="preview-item-content">
                        <p
                          class="preview-subject mb-1"
                          style={{ cursor: "pointer" }}
                          onClick={() => navigate("/myprofile")}
                        >
                          My profile
                        </p>
                      </div>
                    </li>
                    <li>
                      <div class="preview-thumbnail">
                        <div class="preview-icon bg-dark rounded-circle">
                          <i class="mdi mdi-settings text-success"></i>
                        </div>
                      </div>
                      <div class="preview-item-content">
                        <p
                          class="preview-subject mb-1"
                          style={{ cursor: "pointer" }}
                          onClick={handleLogOut}
                        >
                          <LogoutIcon />
                          <span>Logout</span>
                        </p>
                      </div>
                    </li>
                  </ul>
                </>
              ) : (
                <div
                  onClick={() => navigate("/login")}
                  style={{ cursor: "pointer" }}
                >
                  <LoginIcon />
                  <span>Login</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div id="mobile-menu-wrap"></div>
      </div>
      {openDialog && (
        <StyledDialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Change Password</DialogTitle>
          <DialogContent>
            <DialogTextField
              label="Old Password"
              name="oldpassword"
              value={oldPass}
              onChange={(e) => setOldPass(e.target.value)}
            />
            <DialogTextField
              label="New password"
              name="newpassword"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
            />
            <DialogTextField
              label="Confirm"
              name="confirm"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
            />
            {newPass !== confirmPass ? (
              <p style={{ color: "red" }}>Confirm password doesn't match !!!</p>
            ) : (
              ""
            )}
          </DialogContent>

          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={handleChangePass} color="primary">
              Change
            </Button>
          </DialogActions>
        </StyledDialog>
      )}

      {openConfirmationDialog && (
        <StyledDialog
          open={openConfirmationDialog}
          onClose={() => setOpenConfirmationDialog(false)}
        >
          <DialogTitle>Change Password</DialogTitle>
          <DialogContent>{message}</DialogContent>
          <DialogActions>
            <Button
              onClick={() => setOpenConfirmationDialog(false)}
              color="primary"
            >
              OK
            </Button>
          </DialogActions>
        </StyledDialog>
      )}
    </header>
  );
};

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
