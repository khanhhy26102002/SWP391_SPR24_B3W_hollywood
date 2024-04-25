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

const ManagePromotion = () => {
  const [promotionSize, setPromotionSize] = useState(10);
  const [page, setPage] = useState(1);
  const [promotions, setPromotions] = useState([]);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState();
  const [promotion, setPromotion] = useState({
    code: "",
    discount: "",
    expiration: "",
    status: "",
  });


  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleOpenConfirmationDialog = (index) => {
    setOpenConfirmationDialog(true);
  };

  const handleOnCloseConfirmationDialog = () => {
    setOpenConfirmationDialog(false);
    setSelectedPromotion(null);
  };

  const handleDeletePromotion = () => {
    handleOnCloseConfirmationDialog();
  };

  const handleInputChange = (event) => {
    setPromotion((prevPromotion) => ({
      ...prevPromotion,
      [event.target.name]: event.target.value,
    }));
  };

  const handleAddPromotion = () =>{
    setOpenDialog(false);
  }

  const [isEdit, setIsEdit] = useState(false);

  const handleEditPromotion = () => {
    setOpenDialog(true);
    setIsEdit(true);
  }

  return (
    <div className="container-scroller">
      <Sidebar/>
      <div className="container-fluid page-body-wrapper">
        <Navbar/>
        <div className="main-panel">
          <div class="content-wrapper" style={{backgroundColor: "white", top: "50px"}}>
            <div class="page-header">
              <TableTitle>Promotion</TableTitle>
              <FlexContainer>
                <IconButton aria-label="add" onClick={() => setOpenDialog(true)}>
                    <AddIcon />
                </IconButton>
                <Pagination
                  count={Math.ceil(promotionSize / 5)}
                  page={page}
                  onChange={(event, newPage) =>
                    handlePageChange(event, newPage)
                  }
                />
              </FlexContainer>
            </div>

            <StyledTableContainer component={Paper}>
              <StyledTable aria-label="Promotion table">
                <StyledTableHead>
                  <TableRow>
                    <StyledTableCell align="center">Code</StyledTableCell>
                    <StyledTableCell align="center">Discount</StyledTableCell>
                    <StyledTableCell align="center">Expiration</StyledTableCell>
                    <StyledTableCell align="center">Status</StyledTableCell>
                    <StyledTableCell align="center">Action</StyledTableCell>
                  </TableRow>
                </StyledTableHead>
                <TableBody>
                <TableRow>
                      <StyledTableCell align="center">
                      123
                      </StyledTableCell>
                      <StyledTableCell align="center">
                      50%
                      </StyledTableCell>
                      <StyledTableCell align="center">
                      2024-05-01
                      </StyledTableCell>
                      <StyledTableCell align="center">
                      Not use
                      </StyledTableCell>
                      <StyledTableCell align="center">
                      <IconButton aria-label="edit" onClick={() => handleEditPromotion()}>
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
                      789
                      </StyledTableCell>
                      <StyledTableCell align="center">
                      10%
                      </StyledTableCell>
                      <StyledTableCell align="center">
                      2024-06-15
                      </StyledTableCell>
                      <StyledTableCell align="center">
                      Used
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <IconButton aria-label="edit" onClick={() => handleEditPromotion()}>
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
        <StyledDialog open={openDialog} onClose={() => {setOpenDialog(false); setIsEdit(false)}}>
      <DialogTitle>{isEdit ? "Edit" : "Add New"} Promotion</DialogTitle>
      <DialogContent>
        <DialogTextField
          label="Code"
          name="code"
          value={promotion.code}
          onChange={handleInputChange}
        />
        <DialogTextField
          label="Discount"
          name="discount"
          value={promotion.discount}
          onChange={handleInputChange}
        />
        <DialogTextField
          label="Expiration"
          name="expiration"
          value={promotion.expiration}
          onChange={handleInputChange}
        />
        <DialogTextField
          label="Status"
          name="status"
          value={promotion.status}
          onChange={handleInputChange}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={() => {setOpenDialog(false); setIsEdit(false)}}>Cancel</Button>
        <Button onClick={handleAddPromotion} color="primary">
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
            <Button onClick={handleDeletePromotion} color="primary">
              Delete
            </Button>
          </DialogActions>
        </StyledDialog>
      )}
    </div>
  );
};

export default ManagePromotion;

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