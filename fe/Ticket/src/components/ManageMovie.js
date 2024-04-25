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
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { Button, Col, Row } from "react-bootstrap";
import Sidebar from "./Sidebar";
import {
  addMovie,
  deleteMovie,
  fetchMovieData,
  updateMovie,
} from "../api/movieApi";

const ManageMovie = () => {
  const [page, setPage] = useState(1);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState("");
  const [name, setName] = useState("");
  const [description, setDesciption] = useState("");
  const [duration, setDuration] = useState("");
  const [director, setDirector] = useState("");
  const [actor, setActor] = useState("");
  const [genre, setGenre] = useState("");
  const [language, setLanguage] = useState("");
  const [trailer, setTrailer] = useState("");
  const [premiere, setPremiere] = useState("");
  const [rated, setRated] = useState("");
  const [poster, setPoster] = useState("");
  const [mess, setMess] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const [movie, setMovie] = useState([{}]);
  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    try {
      const response = await fetchMovieData();
      setMovie([...response.data]);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleDeleteMovie = async () => {
    try {
      await deleteMovie(selectedMovie, sessionStorage.getItem("jwt"));
      setMess("Delete movie successfully !!!");
      setOpenConfirmationDialog(true);
      fetchData();
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleOpenConfirmationDialog = (id) => {
    setOpenConfirmationDialog(true);
    setSelectedMovie(id);
  };

  const handleOnCloseConfirmationDialog = () => {
    setOpenConfirmationDialog(false);
    setOpenDialog(false);
    setSelectedMovie("");
    setName("");
    setDesciption("");
    setDuration("");
    setDirector("");
    setActor("");
    setGenre("");
    setLanguage("");
    setTrailer("");
    setPremiere("");
    setRated("");
    setPoster("");
    setIsEdit(false);
    setMess("");
  };

  const handleOpenDialog = (movie) => {
    setOpenDialog(true);
    setSelectedMovie(movie.id);
    setName(movie.name);
    setDesciption(movie.description);
    setDuration(movie.duration);
    setDirector(movie.director);
    setActor(movie.actor);
    setGenre(movie.genre);
    setLanguage(movie.language);
    setTrailer(movie.trailer);
    setPremiere(movie.premiere);
    setRated(movie.rated);
    setPoster(movie.imageUrls);
    setIsEdit(true);
  };

  const handleEditMovie = async () => {
    try {
      await updateMovie(
        selectedMovie,
        name,
        description,
        duration,
        director,
        actor,
        genre,
        premiere,
        language,
        rated,
        trailer,
        sessionStorage.getItem("jwt")
      );
      setMess("Update movie successfully !!!");
      setOpenConfirmationDialog(true);
      fetchData();
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleAddMovie = async () => {
    try {
      await addMovie(
        name,
        description,
        duration,
        director,
        actor,
        genre,
        premiere,
        language,
        rated,
        trailer,
        sessionStorage.getItem("jwt")
      );
      setMess("Add movie successfully !!!");
      fetchData();
      setOpenConfirmationDialog(true);
      fetchData();
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  return (
    <div className="container-scroller" style={{background: "#070720"}}>
      <Sidebar />
      <div className="container-fluid page-body-wrapper">
        <Navbar />
        <div style={{ padding: "50px 0", width: "100%" }}>
          <div className="main-panel">
            <div
              class="content-wrapper"
              style={{ backgroundColor: "white", top: "50px" }}
            >
              <div class="page-header">
                <TableTitle>Manage Movie</TableTitle>
                <FlexContainer>
                  <IconButton
                    aria-label="add"
                    onClick={() => {
                      setOpenDialog(true);
                      setIsEdit(false);
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                  <Pagination
                    count={Math.ceil(movie.length / 5 )}
                    page={page}
                    onChange={(e, newPage) => setPage(newPage)}
                  />
                </FlexContainer>
              </div>

              <StyledTableContainer component={Paper}>
                <StyledTable aria-label="Combo table">
                  <StyledTableHead>
                    <TableRow>
                      <StyledTableCell align="center">Name</StyledTableCell>
                      <StyledTableCell align="center">Genre</StyledTableCell>
                      <StyledTableCell align="center">Duration</StyledTableCell>
                      <StyledTableCell align="center">Premiere</StyledTableCell>
                      <StyledTableCell align="center">Action</StyledTableCell>
                    </TableRow>
                  </StyledTableHead>
                  <TableBody>
                    {movie.slice((page - 1) * 5, page * 5).map((film) => (
                      <TableRow key={film.id}>
                        <StyledTableCell align="center">
                          {film.name}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {film.genre}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {film.duration}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {film.premiere}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <IconButton
                            aria-label="edit"
                            onClick={() => handleOpenDialog(film)}
                          >
                            <EditIcon color="warning" />
                          </IconButton>
                          <IconButton
                            aria-label="delete"
                            onClick={() =>
                              handleOpenConfirmationDialog(film.id)
                            }
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
      </div>

      {openDialog && (
        <StyledDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          style={{ width: "100%" }}
        >
          <DialogTitle>{isEdit ? "Edit" : "Add New"} Movie</DialogTitle>
          <DialogContent style={{ background: "black" }}>
            <div class="anime-details spad">
              <div class="container">
              <div class="row">
                    <div class="col-lg-4">
                      <div
                        class="anime__details__pic set-bg"
                        style={{ backgroundImage: `url(${poster})` }}
                      ></div>
                    </div>
                    <div class="col-lg-8">
                      <div class="anime__details__text">
                        <div class="anime__details__title">
                          <DialogTextField
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                        <p></p>
                        <div class="anime__details__widget">
                          <div class="row">
                            <ul style={{ width: "100%" }}>
                              <li style={{ display: "flex" }}>
                                <Row style={{ width: "100%" }}>
                                  <Col lg={4}>
                                    <strong>Đạo diễn:</strong>
                                  </Col>
                                  <Col lg={8}>
                                    <DialogTextField
                                      value={director}
                                      onChange={(e) =>
                                        setDirector(e.target.value)
                                      }
                                    />
                                  </Col>
                                </Row>
                              </li>
                              <li style={{ display: "flex" }}>
                                <Row style={{ width: "100%" }}>
                                  <Col lg={4}>
                                    <strong>Diễn viên:</strong>
                                  </Col>
                                  <Col lg={8}>
                                    <DialogTextField
                                      value={actor}
                                      onChange={(e) =>
                                        setActor(e.target.value)
                                      }
                                    />
                                  </Col>
                                </Row>
                              </li>
                              <li style={{ display: "flex" }}>
                                <Row style={{ width: "100%" }}>
                                  <Col lg={4}>
                                    <strong>Thể loại: </strong>
                                  </Col>
                                  <Col lg={8}>
                                    <DialogTextField
                                      value={genre}
                                      onChange={(e) =>
                                        setGenre(e.target.value)
                                      }
                                    />
                                  </Col>
                                </Row>
                              </li>
                              <li style={{ display: "flex" }}>
                                <Row style={{ width: "100%" }}>
                                  <Col lg={4}>
                                    <strong>Khởi chiếu:</strong>
                                  </Col>
                                  <Col lg={8}>
                                    <DialogTextField
                                      value={premiere}
                                      onChange={(e) =>
                                        setPremiere(e.target.value)
                                      }
                                      type="date"
                                    />
                                  </Col>
                                </Row>
                              </li>
                              <li style={{ display: "flex" }}>
                                <Row style={{ width: "100%" }}>
                                  <Col lg={4}>
                                    <strong>Thời lượng:</strong>
                                  </Col>
                                  <Col lg={8}>
                                    <DialogTextField
                                      value={duration}
                                      onChange={(e) =>
                                        setDuration(e.target.value)
                                      }
                                    />
                                  </Col>
                                </Row>
                              </li>
                              <li style={{ display: "flex" }}>
                                <Row style={{ width: "100%" }}>
                                  <Col lg={4}>
                                    <strong>Ngôn ngữ:</strong>
                                  </Col>
                                  <Col lg={8}>
                                    <DialogTextField
                                      value={language}
                                      onChange={(e) =>
                                        setLanguage(e.target.value)
                                      }
                                    />
                                  </Col>
                                </Row>
                              </li>
                              <li style={{ display: "flex" }}>
                                <Row style={{ width: "100%" }}>
                                  <Col lg={4}>
                                    <strong>Rated:</strong>
                                  </Col>
                                  <Col lg={8}>
                                    <DialogTextField
                                      value={rated}
                                      onChange={(e) =>
                                        setRated(e.target.value)
                                      }
                                    />
                                  </Col>
                                </Row>
                              </li>
                              <li style={{ display: "flex" }}>
                                <Row style={{ width: "100%" }}>
                                  <Col lg={4}>
                                    <strong>Trailer: </strong>
                                  </Col>
                                  <Col lg={8}>
                                    <DialogTextField
                                      value={director}
                                      onChange={(e) =>
                                        setTrailer(e.target.value)
                                      }
                                    />
                                  </Col>
                                </Row>
                              </li>
                              <li style={{ display: "flex" }}>
                                <Row style={{ width: "100%" }}>
                                  <Col lg={4}>
                                    <strong>Mô tả: </strong>
                                  </Col>
                                  <Col lg={8}>
                                    <DialogTextField
                                      value={description}
                                      onChange={(e) =>
                                        setDesciption(e.target.value)
                                      }
                                      rows={5}
                                      multiline
                                    />
                                  </Col>
                                </Row>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleOnCloseConfirmationDialog}>{mess === "" ? "Cancel" : "OK"}</Button>
            <Button
              onClick={isEdit ? handleEditMovie : handleAddMovie}
              color="primary"
            >
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
              <Button onClick={handleDeleteMovie} color="primary">
                Delete
              </Button>
            )}
          </DialogActions>
        </StyledDialog>
      )}
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
  background: "white",
});

const SelectOutlined = styled(FormControl)({
  width: "30%",
  marginBottom: "10px",
});
