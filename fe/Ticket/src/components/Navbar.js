import { useState } from "react";
import "../styles/admin.css";
import "./Navbar.css";
import { styled, Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions} from "@mui/material";
import { changePassword, userLogout } from "../api/authApi";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { Image } from "react-bootstrap";
import av1 from "../img/avatar/hyldk.jpg";
import av2 from "../img/avatar/quynhntm.jpg";
import av3 from "../img/avatar/quihp.jpg";
import av4 from "../img/avatar/trihk.jpg";
import av5 from "../img/avatar/truonghd.jpg";
import av6 from "../img/avatar/hiepdv.jpg";

const Navbar = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [oldPass, setOldPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [message,setMessage] = useState("");
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
    const navigate = useNavigate();

    const handleChangePass = async (e) => {
        e.preventDefault();
        console.log(oldPass,newPass,sessionStorage.getItem("jwt"));
        await changePassword(oldPass,newPass,sessionStorage.getItem("jwt"))
        .then((res) => {
            setOpenDialog(false);
            setMessage(res.data);
            setOpenConfirmationDialog(true);
          })
          .catch((error) => {
            console.log(error);
          });
    }

    const handleLogOut = async () => {
      await userLogout(sessionStorage.getItem("jwt"))
        .then((res) => {
          navigate("/login");
        })
        .catch((error) => {
          console.log(error);
        });
    };


  return (
    <>
      <nav class="navbar p-0 fixed-top d-flex flex-row" style={{background: "#070720"}}>
        <div class="navbar-menu-wrapper flex-grow d-flex align-items-stretch">
          <ul class="navbar-nav navbar-nav-right">
            <li>
              {sessionStorage.getItem("jwt") !== null && (
                <div class="navbar-profile">
                <div class="navbar-profile" style={{marginRight: "0"}}>
                        <Image class="img-xs rounded-circle" src={sessionStorage.getItem("userAvt") === "hyldk.jpg" ? av1 : 
                                                                  (sessionStorage.getItem("userAvt") === "quynhntm.jpg" ? av2 :
                                                                  (sessionStorage.getItem("userAvt") === "quihp.jpg" ? av3 :
                                                                  (sessionStorage.getItem("userAvt") === "trihk.jpg" ? av4 :
                                                                  (sessionStorage.getItem("userAvt") === "truonghd.jpg" ? av5 : av6)))) } style={{width:"50px",height:"50px", borderRadius:"50%"}} alt=""/>
                    </div>
                  <span>Welcome, <strong>{sessionStorage.getItem("userName")}</strong></span>
                </div>
              )}
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
                      onClick={() => navigate("/myprofile")}
                    >
                      My Profile
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
                    <LogoutIcon/>
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
        {newPass !== confirmPass ? <p style={{color:"red"}}>Confirm password doesn't match !!!</p> : ""}
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