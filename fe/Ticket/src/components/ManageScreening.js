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
  TextField,
  InputLabel,
  MenuItem,
  Select
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from '@mui/icons-material/Edit';
import { Button, Col, Row } from "react-bootstrap";
import Sidebar from "./Sidebar";
import { createScreen, deleteScreen, getAllScreen, updateScreen } from "../api/screenApi";
import { fetchMovieData } from "../api/movieApi";
import moment from 'moment';

const ManageScreening = () => {
  const [page, setPage] = useState(1);
  const [screens, setScreens] = useState([{}]);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [movieList,setMovieList] = useState([{}]);
  const [selectedScreen, setSelectedScreen] = useState();
  const [movie,setMovie] = useState("");
  const [room, setRoom] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [date, setDate] = useState("");
  const [search, setSearch] = useState("");
  const [screenFilter, setScreenFilter] = useState([{}]);
  const [duration, setDuration] = useState("");
  const [mess, setMess] = useState("");


  useEffect(() => {
    fetchData();
},[])

useEffect(() => {
  search !== "" ? setScreenFilter([...screens.filter((screen) => screen.movieName.toLowerCase().includes(search.toLowerCase()))]) : setScreenFilter([...screens]);
},[search]);

useEffect(() => {
  setEndTime(`${date} ${moment(startTime).add(duration).format("HH:mm:ss")}`);
},[moment(startTime).add(duration).format("HH:mm:ss")]);

  const fetchData = async () => {
    try {
        const response = await getAllScreen();
        setScreens([...response.data]);
        setScreenFilter([...response.data.reverse()]);
        const res = await fetchMovieData();
        setMovieList([...res.data]);
      } catch (error) {
        console.error("Error fetching:", error);
      }
}

  const handleOpenConfirmationDialog = (id) => {
    setOpenConfirmationDialog(true);
    setSelectedScreen(id);
  };

  const handleOnCloseConfirmationDialog = () => {
    setOpenConfirmationDialog(false);
    setDuration("");
    setSelectedScreen("");
    setMovie("");
    setRoom("");
    setStartTime("");
    setEndTime("");
    setDate("");
    setMess("");
    setPage(1);
    setIsEdit(false);
    setOpenDialog(false);
  };

  const handleOpenDialog = (screen) => {
    setOpenDialog(true);
    setDuration(movieList.filter((film) => film.name === screen.movieName)[0].duration)
    setSelectedScreen(screen.screeningId);
    setMovie(screen.movieName);
    setRoom(screen.roomNumber);
    setStartTime(screen.start_time);
    setEndTime(screen.end_time);
    setDate(screen.date);
    setIsEdit(true);
  }

  const handleDeleteScreen = async () => {
    try {
      await deleteScreen(selectedScreen, sessionStorage.getItem("jwt"));
      handleOnCloseConfirmationDialog();
      fetchData();
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleAddScreen = async () =>{
    try {
      await createScreen(
        movie,
        room,
        sessionStorage.getItem("userName"),
        startTime,
        endTime,
        date,
        sessionStorage.getItem("jwt"),
      );
      setMess("Add screen successfully !!!");
      setOpenConfirmationDialog(true);
      fetchData();
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  const [isEdit, setIsEdit] = useState(false);

  const handleEditScreen = async () => {
    try {
      await updateScreen(
        selectedScreen,
        movie,
        room,
        sessionStorage.getItem("userName"),
        startTime,
        endTime,
        date,
        sessionStorage.getItem("jwt")
      );
      setMess("Update screen successfully !!!");
      fetchData();
      setOpenConfirmationDialog(true);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  return (
    <div className="container-scroller" style={{display: "block"}}>
      <Row>
        <Col lg={2}>
          <Sidebar/>
        </Col>
        <Col lg={10}>
        <Row>
        <Navbar />
        </Row>
        <Row>
        <div className="main-panel" style={{ paddingLeft: "20px", paddingRight: "20px" ,marginLeft: "-30px"}}>
          <div class="content-wrapper" style={{backgroundColor: "white", top: "50px"}}>
            <div class="page-header">
              <TableTitle>Screening</TableTitle>
              <div style={{display:"flex", width: "50%", justifyContent:"right"}}>
              <FlexContainer>
              <DialogTextField
          label="Search movie"
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
              </FlexContainer>
              <FlexContainer>
                <IconButton aria-label="add" onClick={() => setOpenDialog(true)}>
                    <AddIcon />
                </IconButton>
                <Pagination
                  count={Math.ceil(screenFilter.length / 7)}
                  page={page}
                  onChange={(event, newPage) =>
                    setPage( newPage)
                  }
                />
              </FlexContainer>
              </div>
            </div>

            {screenFilter.length > 0 ? (
              <StyledTableContainer component={Paper}>
              <StyledTable aria-label="Promotion table">
                <StyledTableHead>
                  <TableRow>
                    <StyledTableCell align="center">Movie</StyledTableCell>
                    <StyledTableCell align="center">Room</StyledTableCell>
                    <StyledTableCell align="center">Screen</StyledTableCell>
                    <StyledTableCell align="center">Date</StyledTableCell>
                    <StyledTableCell align="center">Status</StyledTableCell>
                    <StyledTableCell align="center">Action</StyledTableCell>
                  </TableRow>
                </StyledTableHead>
                <TableBody>
                 {screenFilter.slice((page - 1) * 7, page * 7).map((screen) => (
                  <TableRow key={screen.screeningId}>
                      <StyledTableCell align="center">
                      {screen.movieName}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                      {screen.roomNumber}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                      {screen.start_time}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                      {screen.date}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                      {screen.status === 1 ? (<div className='badge badge-outline-success'>On Screening</div>): <div className='badge badge-outline-danger'>Removed</div>}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                      <IconButton aria-label="edit" onClick={() => handleOpenDialog(screen)}>
                            <EditIcon color="warning"/>
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          onClick={() => handleOpenConfirmationDialog(screen.screeningId)}
                        >
                          <DeleteIcon color="error" />
                        </IconButton>
                      </StyledTableCell>
                    </TableRow>
                 ))}
                </TableBody>
              </StyledTable>
            </StyledTableContainer>
            ) : (
              <h1 style={{color:"gray"}}>Don't have any screen for this movie !!!</h1>
            ) }
          </div>
        </div>
        </Row>
        </Col>
      </Row>

      {openDialog && (
        <StyledDialog style={{paddingLeft: "25%",paddingRight: "25%"}} open={openDialog} onClose={() => {setOpenDialog(false); setIsEdit(false)}}>
      <DialogTitle>{isEdit ? "Edit" : "Add New"} Screen</DialogTitle>
      <DialogContent>
      <SelectOutlined variant="outlined" style={{ width: "50%" }}>
          <InputLabel>Select Movie</InputLabel>
          <Select
            label="Movie"
            name="movie"
            value={movie}
            onChange={(e) => {setMovie(e.target.value);setDuration(movieList.filter((film) => film.name === e.target.value)[0].duration)}}
          >
            {movieList.map((movie) => (
              <MenuItem value={movie.name}>{movie.name}</MenuItem>
            ))}
          </Select>
        </SelectOutlined>
        <SelectOutlined variant="outlined" style={{ width: "50%" }}>
          <InputLabel>Select Room</InputLabel>
          <Select
            label="Room"
            name="room"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          >
              <MenuItem value="Room1">Room1</MenuItem>
              <MenuItem value="Room2">Room2</MenuItem>
              <MenuItem value="Room3">Room3</MenuItem>
              <MenuItem value="Room4">Room4</MenuItem>
              <MenuItem value="Room5">Room5</MenuItem>
          </Select>
        </SelectOutlined>
        <DialogTextField
          label="Date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          type="date"
        />
        <DialogTextField
          label="Start Time"
          name="start-time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <DialogTextField
          label="End Time"
          name="end-time"
          value={moment(startTime).add(duration).format("HH:mm:ss")}
            disabled
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleOnCloseConfirmationDialog}>Cancel</Button>
        <Button
              onClick={isEdit ? handleEditScreen : handleAddScreen}
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
          <DialogTitle>{mess === "" ? "Delete Screen" : "Notifacation"}</DialogTitle>
          <DialogContent>
          {mess === "" ? "Are you sure you want to delete this screen?" : mess}
          </DialogContent>
          <DialogActions>
          <Button onClick={handleOnCloseConfirmationDialog} color="primary">
              {mess === "" ? "Cancel" : "OK"}
            </Button>
            {mess === "" && (
              <Button onClick={handleDeleteScreen} color="primary">
                Delete
              </Button>
            )}
          </DialogActions>
        </StyledDialog>
      )}
    </div>
  );
};

export default ManageScreening;

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