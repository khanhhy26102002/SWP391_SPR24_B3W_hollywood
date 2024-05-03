import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, IconButton, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, styled, InputLabel, Select, MenuItem } from '@mui/material';
import { AddImage, deleteImage, fetchImage, updateImage } from '../api/imageApi'
import { fetchMovieData } from '../api/movieApi'

const ManageImage = () => {
  const [page, setPage] = useState(1);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [mess, setMess] = useState("");
  const [image, setImage] = useState([{}]);
  const [movieId, setMovieId] = useState(0);
  const [imageName, setImageName] = useState("");
  const [path, setPath] = useState("");
  const [movieList, setMovieList] = useState([{}]);
  useEffect(() => {
    fetchData();
  }, [page]);
  const fetchData = async () => {
    try {
      const response = await fetchImage();
      setImage([...response.data.reverse()]);
      const res = await fetchMovieData();
      setMovieList([...res.data]);
    } catch (error) {
      console.error("Error fetching Image", error);
    }
  }
  const handleOpenConfirmationDialog = (id) => {
    setOpenConfirmationDialog(true);
    setSelectedImage(id);
  };
  const handleOnCloseConfirmationDialog = () => {
    setOpenConfirmationDialog(false);
    setOpenDialog(false);
    setSelectedImage("");
    setMovieId(0);
    setImageName("");
    setPath("");
    setPage(1);
    setIsEdit(false);
    setMess("");
  };
  const handleOpenDialog = (image) => {
    setOpenDialog(true);
    setSelectedImage(image.imageId);
    setMovieId(image.movieId)
    setImageName(image.imageName);
    setPath(image.path);
    setIsEdit(true);
  };
  const handleDeleteImage = async () => {
    try {
      await deleteImage(selectedImage, sessionStorage.getItem("jwt"));
      setMess("Delete image successfully");
      setOpenConfirmationDialog(true);
      fetchData();
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  const handleAddImage = async () => {
    try {
      await AddImage(
        movieId,
        imageName,
        path,
        sessionStorage.getItem("jwt")
      );
      setMess("Add Image successfully");
      fetchData();
      setOpenConfirmationDialog(true);
      fetchData();
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  const handleEditImage = async () => {
    try {
await updateImage(
        selectedImage,
        movieId,
        imageName,
        path,
        sessionStorage.getItem("jwt")
      );
      setMess("Update Image successfully");
      setOpenConfirmationDialog(true);
      fetchData();
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  return (
    <div className='container-scroller' style={{ display: "block" }}>
      <Row>
        <Col lg={2}>
          <Sidebar />
        </Col>
        <Col lg={10}>
          <Row>
            <Navbar />
          </Row>
          <Row>
            <div className='main-panel' style={{ paddingLeft: "20px", paddingRight: "20px", marginLeft: "-30px" }}>
              <div className='content-wrapper' style={{ backgroundColor: "white", top: "50px" }}>
                <div className='page-header'>
                  <TableTitle>Manage Image</TableTitle>
                  <FlexContainer>
                    <IconButton aria-label="add" onClick={() => {
                      setOpenDialog(true);
                      setIsEdit(false);
                    }}>
                      <AddIcon />
                    </IconButton>
                    <Pagination count={Math.ceil(image.length / 7)} page={page} onChange={(e, newPage) => setPage(newPage)} />
                  </FlexContainer>
                </div>
                <StyledTableContainer component={Paper}>
                  <StyledTable aria-label="combo table">
                    <StyledTableHead>
                    <StyledTableCell align="center">ImageId</StyledTableCell>
                      <StyledTableCell align="center">Movie</StyledTableCell>
                      <StyledTableCell align="center">ImageName</StyledTableCell>
                      <StyledTableCell align="center">Status</StyledTableCell>
                      <StyledTableCell align="center">Actions</StyledTableCell>
                    </StyledTableHead>
                    <TableBody>
                      {image.slice((page - 1) * 7, page * 7).map((a) => (
                        <TableRow>
                        <StyledTableCell align="center" >{a.imageId}</StyledTableCell>
                          <StyledTableCell align="center">{movieList.filter((film) => film.id === a.movieId).length >0 ? movieList.filter((film) => film.id === a.movieId)[0].name : ""}</StyledTableCell>
                          <StyledTableCell align="center">{a.imageName}</StyledTableCell>
                          <StyledTableCell align="center">{a.status === "AVAILABLE" ? (
                                  <div className="badge badge-outline-success">
                                    {a.status}
                                  </div>
                                ) : (
                                  <div className="badge badge-outline-danger">
                                    {a.status}
                                  </div>
                                )}</StyledTableCell>
                          <StyledTableCell align="center">
                            <IconButton aria-label="edit" onClick={() => handleOpenDialog(a)}>
                              <EditIcon color="warning" />
                            </IconButton>
                            <IconButton aria-label='delete' onClick={() => handleOpenConfirmationDialog(a.imageId)}>
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
          </Row>
        </Col>
      </Row>
      {openDialog && (
        <>
          <StyledDialog
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            style={{ width: "100%"}}
          >
            <DialogTitle>{isEdit ? "Edit" : "Add New"} Image</DialogTitle>
            <DialogContent>
            <SelectOutlined variant="outlined" style={{ width: "50%" }}>
              <InputLabel>Select Movie</InputLabel>
              <Select
                label="Movie"
                name="movie"
                value={movieId}
                onChange={(e) => setMovieId(e.target.value)}
              >
                {movieList.map((movie) => (
                  <MenuItem value={movie.id}>{movie.name}</MenuItem>
                ))}
              </Select>
            </SelectOutlined>
        <DialogTextField
          label="Image Name"
          value={imageName}
          onChange={(e) => setImageName(e.target.value)}
        />
        <DialogTextField
          label="Image path"
          value={path}
          onChange={(e) => setPath(e.target.value)}
        />
      </DialogContent>
            <DialogActions>
              <Button onClick={handleOnCloseConfirmationDialog}>{mess === "" ? "Cancel" : "OK"}</Button>
              <Button
                onClick={isEdit ? handleEditImage : handleAddImage}
                color="primary"
              >
                {isEdit ? "Update" : "Add"}
              </Button>
            </DialogActions>
          </StyledDialog>
        </>
      )}
      {openConfirmationDialog && (
        <StyledDialog open={openConfirmationDialog} style={{ paddingLeft: "35%", paddingRight: "35%" }}>
          <DialogTitle>
            {mess === "" ? "Delete Image" : "Notification"}
          </DialogTitle>
          <DialogContent>
            {mess === "" ? "Are you sure you want to delete this image?" : mess}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleOnCloseConfirmationDialog} color="primary">
              {mess === "" ? "Cancel" : "OK"}
            </Button>
            {mess === "" && (<Button onClick={handleDeleteImage} color='primary'>
              Delete
            </Button>
            )}
          </DialogActions>
        </StyledDialog>
      )}
    </div>
  );
};
export default ManageImage;
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
  