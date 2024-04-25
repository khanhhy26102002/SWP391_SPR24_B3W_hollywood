import { useEffect, useState } from "react";
import "../styles/admin.css";
import Navbar from "./Navbar";
import { deleteMovie } from "../api/movieApi";
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
import { fetchMovieData } from "../api/movieApi";
import { Link } from "react-router-dom";
const ManageMovie = () => {
  const [movieSize, setMovieSize] = useState(10);
  const [page, setPage] = useState(1);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [movies, setMovies] = useState([{}]);
  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    try {
      const response = await fetchMovieData();
      setMovies([...response.data]);
      console.log(response.data);
      console.log(movies);
    } catch (error) {
      console.error("Error fetching movies!!", error)
    }
  };
  const handleDeleteMovie = async () => {
    try {
      await deleteMovie(selectedMovie);
      fetchData();
      setOpenDeleteDialog(false);
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const handleDeleteConfirmation = (id) => {
    setSelectedMovie(id);
    setOpenDeleteDialog(true)
  }
  const handleOpenConfirmationDialog = () => {
    setOpenConfirmationDialog(true);
  };

  const handleOnCloseConfirmationDialog = () => {
    setOpenConfirmationDialog(false);
    setSelectedMovie(null);
  };

  // const handleDeleteMovie = () => {
  //   handleOnCloseConfirmationDialog();
  // };

  const handleAddMovie = () => {
    setOpenDialog(false);
  }

  const [isEdit, setIsEdit] = useState(false);

  const handleEditMovie = () => {
    setOpenDialog(true);
    setIsEdit(true);
  }

  return (
    <div className="container-scroller">
      <Sidebar />
      <div className="container-fluid page-body-wrapper">
        <Navbar />
        <div className="main-panel">
          <div class="content-wrapper" style={{ backgroundColor: "white", top: "50px" }}>
            <div class="page-header">
              <TableTitle>Movie</TableTitle>
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <Button><Link to='/add'><AddIcon /></Link></Button>
              </div>
              <FlexContainer>
                <Pagination
                  count={Math.ceil(movieSize / 5)}
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
                    <StyledTableCell align="center">Tên</StyledTableCell>
                    <StyledTableCell align="center">Thể loại</StyledTableCell>
                    <StyledTableCell align="center">Thời lượng</StyledTableCell>
                    <StyledTableCell align="center">Khởi chiếu</StyledTableCell>
                    <StyledTableCell align="center">trailer</StyledTableCell>
                  </TableRow>
                </StyledTableHead>
                <TableBody>
                  {movies.map((a) => (
                    <TableRow>
                      <StyledTableCell align="center">
                        {a.name}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {a.genre}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {a.duration}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {a.premiere}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {a.trailer}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <IconButton
                          aria-label="delete"
                          onClick={
                            () => handleDeleteConfirmation(a.id)}
                        >
                          <DeleteIcon color="error" />
                        </IconButton>
                        <EditIcon />
                      </StyledTableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </StyledTable>
            </StyledTableContainer>
          </div>
        </div>
      </div>


      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Delete Movie</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this movie?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteMovie} color="primary">Delete</Button>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageMovie;

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
