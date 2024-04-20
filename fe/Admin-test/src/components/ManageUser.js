import { useState } from "react";
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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Row, Col } from "react-bootstrap";
import Sidebar from "./Sidebar";

const ManageUser = () => {
  const [userSize, setUserSize] = useState(10);
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState();


  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleEditRole = (e, index) => {
    setUsers((prevRole) => {
      const updatedRole = [...prevRole];
      updatedRole[index] = e.target.value;
      return updatedRole;
    });
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
    //removeUser(filteredUsers[selectedUser]);
    handleOnCloseConfirmationDialog();
  };

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
                    <StyledTableCell align="center">Name</StyledTableCell>
                    <StyledTableCell align="center">Email</StyledTableCell>
                    <StyledTableCell align="center">Role</StyledTableCell>
                    <StyledTableCell align="center">Action</StyledTableCell>
                  </TableRow>
                </StyledTableHead>
                <TableBody>
                <TableRow>
                      <StyledTableCell align="center">
                        A
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        a@email
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <SelectOutlined
                          variant="outlined"
                          style={{ width: "50%" }}
                        >
                          <InputLabel>Select Role</InputLabel>
                          <Select
                            label="Select Role"
                            name="roles"
                            value={
                              "Member"
                            }
                            onChange={(e) => handleEditRole(e)}
                          >
                            <MenuItem value="Staff">Staff</MenuItem>
                            <MenuItem value="Member">Member</MenuItem>
                          </Select>
                        </SelectOutlined>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <IconButton
                          aria-label="delete"
                          onClick={() => handleOpenConfirmationDialog()}
                        >
                          <DeleteIcon color="error" />
                        </IconButton>
                      </StyledTableCell>
                    </TableRow>

                    <TableRow>
                      <StyledTableCell align="center">
                        B
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        b@mail
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <SelectOutlined
                          variant="outlined"
                          style={{ width: "50%" }}
                        >
                          <InputLabel>Select Role</InputLabel>
                          <Select
                            label="Select Role"
                            name="roles"
                            value={
                                "Staff"
                            }
                            onChange={(e) => handleEditRole(e)}
                          >
                            <MenuItem value="Staff">Staff</MenuItem>
                            <MenuItem value="Member">Member</MenuItem>
                          </Select>
                        </SelectOutlined>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <IconButton
                          aria-label="delete"
                          onClick={() => handleOpenConfirmationDialog()}
                        >
                          <DeleteIcon color="error" />
                        </IconButton>
                      </StyledTableCell>
                    </TableRow>
                </TableBody>
              </StyledTable>
            </StyledTableContainer>
          </div>
        </div>
      </div>

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
