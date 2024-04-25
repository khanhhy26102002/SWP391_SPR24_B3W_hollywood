import { useState } from "react";
import "../styles/admin.css";
import "./Navbar.css";
import { styled, Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions } from "@mui/material";
import { changePassword } from "../api/authApi";

const Navbar = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [message, setMessage] = useState("");
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);

  const handleChangePass = async (e) => {
    e.preventDefault();
    console.log(oldPass, newPass, sessionStorage.getItem("jwt"));
    await changePassword(oldPass, newPass, sessionStorage.getItem("jwt"))
      .then((res) => {
        setOpenDialog(false);
        setMessage(res.data);
        setOpenConfirmationDialog(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }


  return (
    <>
      <nav class="navbar p-0 fixed-top d-flex flex-row">
        <div class="navbar-menu-wrapper flex-grow d-flex align-items-stretch">
          <ul class="navbar-nav navbar-nav-right">
            <li>
              <a href="#">
                <div class="navbar-profile">
                  <img
                    class="img-xs rounded-circle"
                    src="../../assets/images/faces/face15.jpg"
                    alt=""
                  />
                </div>
              </a>
              <ul className="drop-down">
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
                      onClick={() => setOpenDialog(true)}
                    >
                      Change Password
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
                    >
                      Logout
                    </p>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
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
            {newPass !== confirmPass ? <p style={{ color: "red" }}>Confirm password doesn't match !!!</p> : ""}
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

export default Navbar;


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