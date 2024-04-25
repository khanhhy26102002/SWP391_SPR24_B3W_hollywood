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
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from '@mui/icons-material/Edit';
import { Button } from "react-bootstrap";
import Sidebar from "./Sidebar";

const ManageCombo = () => {
  const [comboSize, setComboSize] = useState(10);
  const [page, setPage] = useState(1);
  const [combos, setCombos] = useState([]);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCombo, setSelectedCombo] = useState();
  const [combo, setCombo] = useState({
    name: "",
    description: "",
    price: "",
  });


  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleOpenConfirmationDialog = (index) => {
    setOpenConfirmationDialog(true);
  };

  const handleOnCloseConfirmationDialog = () => {
    setOpenConfirmationDialog(false);
    setSelectedCombo(null);
  };

  const handleDeleteCombo = () => {
    handleOnCloseConfirmationDialog();
  };

  const handleInputChange = (event) => {
    setCombo((prevCombo) => ({
      ...prevCombo,
      [event.target.name]: event.target.value,
    }));
  };

  const handleAddCombo = () =>{
    setOpenDialog(false);
  }

  const [isEdit, setIsEdit] = useState(false);

  const handleEditCombo = () => {
    setOpenDialog(true);
    setIsEdit(true);
  }

  return (
    <div className="container-scroller">
      <Sidebar />
      <div className="container-fluid page-body-wrapper">
        <Navbar />
        <div className="main-panel">
          <div class="content-wrapper" style={{backgroundColor: "white", top: "50px"}}>
            <div class="page-header">
              <TableTitle>Combo</TableTitle>
              <FlexContainer>
                <IconButton aria-label="add" onClick={() => setOpenDialog(true)}>
                    <AddIcon />
                </IconButton>
                <Pagination
                  count={Math.ceil(comboSize / 5)}
                  page={page}
                  onChange={(event, newPage) =>
                    handlePageChange(event, newPage)
                  }
                />
              </FlexContainer>
            </div>

            <StyledTableContainer component={Paper}>
              <StyledTable aria-label="Combo table">
                <StyledTableHead>
                  <TableRow>
                    <StyledTableCell align="center">Name</StyledTableCell>
                    <StyledTableCell align="center">Description</StyledTableCell>
                    <StyledTableCell align="center">Price</StyledTableCell>
                    <StyledTableCell align="center">Action</StyledTableCell>
                  </TableRow>
                </StyledTableHead>
                <TableBody>
                <TableRow>
                      <StyledTableCell align="center">
                      Combo 1
                      </StyledTableCell>
                      <StyledTableCell align="center">
                      1 Bắp Ngọt 60oz + 1 Coke 32oz - V 
                      </StyledTableCell>
                      <StyledTableCell align="center">
                      84.000&nbsp;₫
                      </StyledTableCell>
                      <StyledTableCell align="center">
                      <IconButton aria-label="edit" onClick={() => handleEditCombo()}>
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

                    <TableRow>
                      <StyledTableCell align="center">
                      Combo 2
                      </StyledTableCell>
                      <StyledTableCell align="center">
                      1 Bắp Ngọt 60oz + 2 Coke 32oz - V
                      </StyledTableCell>
                      <StyledTableCell align="center">
                      109.000&nbsp;₫
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <IconButton aria-label="edit" onClick={() => handleEditCombo()}>
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
                </TableBody>
              </StyledTable>
            </StyledTableContainer>
          </div>
        </div>
      </div>

      {openDialog && (
        <StyledDialog open={openDialog} onClose={() => setOpenDialog(false)}>
      <DialogTitle>{isEdit ? "Edit" : "Add New"} Combo</DialogTitle>
      <DialogContent>
        <DialogTextField
          label="Name"
          name="name"
          value={combo.name}
          onChange={handleInputChange}
        />
        <DialogTextField
          label="Description"
          name="description"
          value={combo.description}
          onChange={handleInputChange}
        />
        <DialogTextField
          label="Price"
          name="price"
          value={combo.price}
          onChange={handleInputChange}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
        <Button onClick={handleAddCombo} color="primary">
          {isEdit ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </StyledDialog>
      )}


      {openConfirmationDialog && (
        <StyledDialog
          open={openConfirmationDialog}
          onClose={handleOnCloseConfirmationDialog}
        >
          <DialogTitle>Delete Combo</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this combo?
          </DialogContent>
          <DialogActions>
            <Button onClick={handleOnCloseConfirmationDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDeleteCombo} color="primary">
              Delete
            </Button>
          </DialogActions>
        </StyledDialog>
      )}
    </div>
  );
};

export default ManageCombo;

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