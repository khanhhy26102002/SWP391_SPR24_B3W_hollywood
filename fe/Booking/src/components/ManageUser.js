import { useEffect, useState } from "react";
import "../styles/admin.css";
import Navbar from "./Navbar";
import {
  styled,
  TableContainer,
  Pagination,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import { Button, Row, Col } from "react-bootstrap";
import Sidebar from "./Sidebar";
import { deleteUser, getListUsers, updateUser } from "../api/manageUserApi";

const ManageUser = () => {
  const [userSize, setUserSize] = useState(0);
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([{}]);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avt, setAvt] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [phone, setPhone] = useState("");
  const [mess, setMess] = useState("");

  const fetchData = async () => {
    await getListUsers(sessionStorage.getItem("jwt"))
      .then((res) => {
        console.log(res.data);
        setUsers(res.data)
        setUserSize(users.length);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);


  const handleOpenConfirmationDialog = (user) => {
    setOpenConfirmationDialog(true);
    setSelectedUser(user.id);
  };

  const handleOnCloseConfirmationDialog = () => {
    setOpenConfirmationDialog(false);
    setOpenDialog(false);
    setSelectedUser();
    setAddress();
    setAvt();
    setBirthdate();
    setEmail();
    setGender();
    setName();
    setPhone();
    setMess();
  };

  const handleDeleteUser = async () => {
    try {
      await deleteUser(selectedUser, sessionStorage.getItem("jwt"));
      handleOnCloseConfirmationDialog();
      fetchData();
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleOpenDialog = (user) => {
    setOpenDialog(true);
    setSelectedUser(user.id);
    setAddress(user.address);
    setAvt(user.avatar);
    setBirthdate(user.birthdate);
    setEmail(user.email);
    setGender(user.gender);
    setName(user.userName);
    setPhone(user.phone);
  }

  const handleEditUser = async () => {
    try {
      await updateUser(selectedUser,avt,name,email,address,gender,birthdate,phone,sessionStorage.getItem("jwt"));
      setOpenConfirmationDialog(true);
      setMess("Update user information success !!!!");
      fetchData();
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  return (
    <div className="container-scroller">
      <Sidebar />
      <div className="container-fluid page-body-wrapper">
        <Navbar />
        <div className="main-panel">
          <div class="content-wrapper" style={{backgroundColor: "white", top: "50px"}}>
            <div class="page-header">
              <TableTitle>User</TableTitle>
              <FlexContainer>
                <Pagination
                  count={Math.ceil(userSize / 5)}
                  page={page}
                  onChange={(e) => setPage(e.target.value)}
                />
              </FlexContainer>
            </div>

            <StyledTableContainer component={Paper}>
              <StyledTable aria-label="User table">
                <StyledTableHead>
                  <TableRow>
                    <StyledTableCell align="center"></StyledTableCell>
                    <StyledTableCell align="center">Name</StyledTableCell>
                    <StyledTableCell align="center">Email</StyledTableCell>
                    <StyledTableCell align="center">Phone</StyledTableCell>
                    <StyledTableCell align="center">Role</StyledTableCell>
                    <StyledTableCell align="center">Action</StyledTableCell>
                  </TableRow>
                </StyledTableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow>
                      <StyledTableCell align="center">
                      <div class="navbar-profile" style={{marginRight: "0"}}>
                        <img class="img-xs rounded-circle" src={user.avatar} alt=""/>
                    </div>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {user.userName}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {user.email}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {user.phone}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {user.roleName}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                      <IconButton aria-label="edit" onClick={() => handleOpenDialog(user)}>
                            <EditIcon color="warning"/>
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          onClick={() => handleOpenConfirmationDialog(user)}
                        >
                          <DeleteIcon color="error" />
                        </IconButton>
                      </StyledTableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </StyledTable>
            </StyledTableContainer>
          </div>
        </div>
      </div>

      {openDialog && (
        <StyledDialog open={openDialog} onClose={() => setOpenDialog(false)}>
      <DialogTitle>Update User</DialogTitle>
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
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
        />
        <DialogTextField
          label="Gender"
          name="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />
        <DialogTextField
          label="Avatar"
          name="avatar"
          type="url"
          value={avt}
          onChange={(e) => setAvt(e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
        <Button onClick={handleEditUser} color="primary">
          Update
        </Button>
      </DialogActions>
    </StyledDialog>
      )}

      {openConfirmationDialog && (
        <StyledDialog
          open={openConfirmationDialog}
          onClose={handleOnCloseConfirmationDialog}
        >
          <DialogTitle>{mess !== "" ? "Notification": "Delete User"}</DialogTitle>
          <DialogContent>
            {mess !== "" ? mess : "Are you sure you want to delete this user?"}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleOnCloseConfirmationDialog} color="primary">
              Cancel
            </Button>
            {mess === "" && (
              <Button onClick={handleDeleteUser} color="primary">
             Delete
            </Button>
            )} 
            
          </DialogActions>
        </StyledDialog>
      )}
    </div>
  );
};

export default ManageUser;

const TableTitle = styled("div")({
  fontWeight: "bold",
  textTransform: "uppercase",
  fontSize: "1rem",
  color: "black",
});

const FlexContainer = styled("div")({
  display: "flex",
  alignItems: "center",
});

const StyledTableContainer = styled(TableContainer)`
  margin-top: 16px;
`;

const StyledTable = styled(Table)`
  min-width: 650px;
`;

const StyledTableHead = styled(TableHead)`
  & th {
    position: relative;
    text-align: center;
    font-weight: bold;
  }

  & th::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    background-color: rgba(224, 224, 224, 1);
    width: 1px;
    height: 70%;
  }
  background-color: #f5f5f5;
`;

const StyledTableCell = styled(TableCell)`
  font-weight: 300;
  text-align: center;
`;

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