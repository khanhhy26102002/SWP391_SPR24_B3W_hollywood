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
import { getListUsers } from "../api/manageUserApi";

const ManageUser = () => {
  const [userSize, setUserSize] = useState(10);
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([{}]);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [openDialog, setOpenDialog] = useState(false);

  const fetchData = async () => {
    await getListUsers(sessionStorage.getItem("jwt"))
      .then((res) => {
        console.log(res.data);
        setUsers(res.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleOpenConfirmationDialog = (index) => {
    setOpenConfirmationDialog(true);
    setSelectedUser(index);
  };

  const handleOnCloseConfirmationDialog = () => {
    setOpenConfirmationDialog(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = () => {
    handleOnCloseConfirmationDialog();
  };

  const handleEditUser = (user) => {
    setOpenDialog(true);
    setSelectedUser(user);
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
                  onChange={(event, newPage) =>
                    handlePageChange(event, newPage)
                  }
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
                    <StyledTableCell align="center">Address</StyledTableCell>
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
                        {user.address}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {user.roleName}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                      <IconButton aria-label="edit" onClick={() => handleEditUser(user)}>
                            <EditIcon color="warning"/>
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          onClick={() => handleOpenConfirmationDialog()}
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
          value={selectedUser.userName}
          onChange={""}
        />
        <DialogTextField
          label="Email"
          name="email"
          value={selectedUser.email}
          onChange={""}
        />
        <DialogTextField
          label="Phone"
          name="phone"
          value={selectedUser.phone}
          onChange={""}
        />
        <DialogTextField
          label="Address"
          name="address"
          value={selectedUser.address}
          onChange={""}
        />
        <DialogTextField
          label="Role"
          name="role"
          value={selectedUser.roleName}
          onChange={""}
        />
        <DialogTextField
          label="Gender"
          name="gender"
          value={selectedUser.gender}
          onChange={""}
        />
        <DialogTextField
          label="Avatar"
          name="avatar"
          value={selectedUser.avatar}
          onChange={""}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
        <Button onClick={""} color="primary">
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
          <DialogTitle>Delete User</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this user?
          </DialogContent>
          <DialogActions>
            <Button onClick={handleOnCloseConfirmationDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDeleteUser} color="primary">
              Delete
            </Button>
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

const SelectOutlined = styled(FormControl)({
  width: "30%",
  marginBottom: "10px",
});

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