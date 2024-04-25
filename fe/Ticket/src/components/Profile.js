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
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";
import { useEffect, useState } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { getUserProfile, updateUser } from "../api/manageUserApi";
import { changePassword } from "../api/authApi";

const Profile = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [birthday, setBirthday] = useState();
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [avt, setAvt] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [mess, setMess] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await getUserProfile(
      sessionStorage.getItem("userId"),
      sessionStorage.getItem("jwt")
    )
      .then((resp) => {
        setName(resp.data.userName);
        setEmail(resp.data.email);
        setAddress(resp.data.address);
        setBirthday(resp.data.birthdate);
        setPhone(resp.data.phone);
        setGender(resp.data.gender);
        setAvt(resp.data.avatar);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChangePass = async (e) => {
    e.preventDefault();
    setIsloading(true);
    await changePassword(password, newPass, sessionStorage.getItem("jwt"))
      .then((res) => {
        setMess("Change password successfully !!!!");
        setOpenConfirmationDialog(true);
        setIsloading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsloading(false);
      });
  };

  const handleEditUser = async () => {
    setIsloading(true);
    try {
      await updateUser(sessionStorage.getItem("userId"),avt,name,email,address,gender,birthday,phone,sessionStorage.getItem("jwt"));
      setOpenConfirmationDialog(true);
      setMess("Update user information success !!!!");
      fetchData();
      setIsloading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setIsloading(false);
    }
  }

  const handleOnCloseConfirmationDialog = () => {
    setOpenConfirmationDialog(false);
    setMess("");
  };

  return (
    <>
      <Header />
      <div className="main-content" style={{background:"#f5f5f5", color: "black"}}>
        <div className="product-page spad">
          <div className="container">
            <div className="row" style={{marginTop: "100px"}}>
            <Col lg={6}>
                    <DialogTitle><strong>Account</strong></DialogTitle>
                    <DialogContent>
                      <DialogTextField
                        label="Name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <DialogTextField
                        label="Email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <DialogTextField
                        label="Phone"
                        name="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                      <DialogTextField
                        label="Address"
                        name="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                      <DialogTextField
                        label="Birthdate"
                        name="birthdate"
                        type="date"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                      />
                      <SelectOutlined variant="outlined" style={{ width: "100%" }}>
          <InputLabel>Gender</InputLabel>
          <Select
            label="Gender"
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Another">Other</MenuItem>
          </Select>
        </SelectOutlined>
                      <DialogTextField
                        label="Avatar"
                        name="avatar"
                        type="url"
                        value={avt}
                        onChange={(e) => setAvt(e.target.value)}
                      />
                    </DialogContent>

                    <DialogActions>
                      {!isLoading ? (
                        <button className="buy-ticket" style={{background: "blue"}} onClick={handleEditUser} color="primary">
                        Save
                      </button>
                      ): (
                        <button disabled className="buy-ticket" style={{background: "blue"}} onClick={handleEditUser} color="primary">
                        Save
                      </button>
                      )}
                    </DialogActions>
                </Col>
                <Col lg={6}>
                    <DialogTitle><strong>Change Password</strong></DialogTitle>
                    <DialogContent>
                      <DialogTextField
                        label="Old Password"
                        name="oldpassword"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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

                    <DialogActions>
                      {isLoading ? (
                        <button disabled onClick={handleChangePass} color="primary" className="buy-ticket" style={{background: "blue"}}>
                        Change
                      </button>
                      ) : (
                        <button onClick={handleChangePass} color="primary" className="buy-ticket" style={{background: "blue"}}>
                        Change
                      </button>
                      )}
                    </DialogActions>
                </Col>
            </div>
          </div>
        </div>
      </div>
      <Footer />
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
            {mess === "" ? "Fail !!!" : mess}
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

export default Profile;

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

const SelectOutlined = styled(FormControl)({
  width: "30%",
  marginBottom: "10px",
});
