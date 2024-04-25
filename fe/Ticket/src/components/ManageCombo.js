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
import AddIcon from "@mui/icons-material/Add";
import EditIcon from '@mui/icons-material/Edit';
import { Button } from "react-bootstrap";
import Sidebar from "./Sidebar";
import { createCombo, deleteCombo, fetchComboData, updateCombo } from "../api/comboApi";

const ManageCombo = () => {
  const [page, setPage] = useState(1);
  const [combos, setCombos] = useState([]);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCombo, setSelectedCombo] = useState();
  const [name, setName] = useState("");
  const [description, setDesciption]= useState("");
  const [price, setPrice] = useState(0);
  const [mess, setMess] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    fetchData();
  },[])

  const fetchData = async () =>{
    try{
      const response = await fetchComboData()
      setCombos([...response.data]);
    }catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  const handleOpenConfirmationDialog = (id) => {
    setOpenConfirmationDialog(true);
    setSelectedCombo(id);
  };

  const handleOnCloseConfirmationDialog = () => {
    setOpenConfirmationDialog(false);
    setOpenDialog(false);
    setName("");
    setDesciption("");
    setPrice(0);
    setIsEdit(false);
    setMess("");
  };

  const handleOpenDialog = (combo) => {
    setOpenDialog(true);
    setSelectedCombo(combo.comboId);
    setName(combo.comboName);
    setDesciption(combo.description);
    setPrice(combo.comboPrice);
    setIsEdit(true);
  };

  const handleDeleteCombo = async () => {
    try {
      await deleteCombo(selectedCombo, sessionStorage.getItem("jwt"));
      setMess("Delete combo successfully !!!");
      setOpenConfirmationDialog(true);
      fetchData();
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleAddCombo = async () =>{
    try {
      await createCombo(
        name,
        description,
        price,
        sessionStorage.getItem("jwt")
      );
      setMess("Add combo successfully !!!");
      fetchData();
      setOpenConfirmationDialog(true);
      fetchData();
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  const handleEditCombo = async() => {
    try {
      await updateCombo(
        selectedCombo,
        name,
        description,
        price,
        sessionStorage.getItem("jwt")
      );
      setMess("Update combo successfully !!!");
      setOpenConfirmationDialog(true);
      fetchData();
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  return (
    <div className="container-scroller" style={{background: "#070720"}}>
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
                  count={Math.ceil(combos.length / 5)}
                  page={page}
                  onChange={(event, newPage) =>
                    setPage(newPage)
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
                {combos.slice((page - 1) * 5, page * 5).map((combo) => (
                  <TableRow>
                      <StyledTableCell align="center">
                      {combo.comboName}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                      {combo.description}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                      {combo.comboPrice}&nbsp;₫
                      </StyledTableCell>
                      <StyledTableCell align="center">
                      <IconButton aria-label="edit" onClick={() => handleOpenDialog(combo)}>
                            <EditIcon color="warning"/>
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          onClick={() => handleOpenConfirmationDialog(combo.comboId)}
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
      <DialogTitle>{isEdit ? "Edit" : "Add New"} Combo</DialogTitle>
      <DialogContent>
        <DialogTextField
          label="Name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <DialogTextField
          label="Description"
          name="description"
          value={description}
          onChange={(e) => setDesciption(e.target.value)}
        />
        <DialogTextField
          label="Price"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="number"
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleOnCloseConfirmationDialog}>{mess === "" ? "Cancel" : "OK"}</Button>
        <Button onClick={isEdit? handleEditCombo : handleAddCombo} color="primary">
          {isEdit ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </StyledDialog>
      )}


      {openConfirmationDialog && (
        <StyledDialog
          open={openConfirmationDialog}
          onClose={handleOnCloseConfirmationDialog}
          style={{paddingLeft: "35%",paddingRight:"35%"}}
        >
          <DialogTitle>
            {mess === "" ? "Delete Movie" : "Notifacation"}
          </DialogTitle>
          <DialogContent>
            {mess === "" ? "Are you sure you want to delete this movie?" : mess}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleOnCloseConfirmationDialog} color="primary">
              {mess === "" ? "Cancel" : "OK"}
            </Button>
            {mess === "" && (
              <Button onClick={handleDeleteCombo} color="primary">
                Delete
              </Button>
            )}
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

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    width: "100%",
    maxWidth: "1500px",
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