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
  Select,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { Button, Col, Row } from "react-bootstrap";
import Sidebar from "./Sidebar";
import {
  createScreen,
  deleteScreen,
  getAllScreen,
  updateScreen,
} from "../api/screenApi";
import { fetchMovieData } from "../api/movieApi";
import moment from "moment";
import { getSeat } from "../api/seatApi";
import { fetchRoom } from "../api/roomApi";
import { fetchComboData } from "../api/comboApi";

const ManageScreening = () => {
  const [page, setPage] = useState(1);
  const [screens, setScreens] = useState([{}]);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [movieList, setMovieList] = useState([{}]);
  const [selectedScreen, setSelectedScreen] = useState();
  const [movie, setMovie] = useState("");
  const [room, setRoom] = useState("");
  const [startTime, setStartTime] = useState("");
  const [date, setDate] = useState("");
  const [search, setSearch] = useState("");
  const [screenFilter, setScreenFilter] = useState([{}]);
  const [duration, setDuration] = useState("");
  const [mess, setMess] = useState("");
  const [seats, setSeats] = useState([{}]);
  const [rooms, setRooms] = useState([{}]);
  const [combos, setCombos] = useState([{}]);
  const [seatType, setSeatType] = useState([]);
  const [combosPrice, setCombosPrice] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    search !== ""
      ? setScreenFilter([
          ...screens.filter((screen) =>
            movieList
              .filter((film) => film.id === screen.movieId)[0]
              .name.toLowerCase()
              .includes(search.toLowerCase())
          ),
        ])
      : setScreenFilter([...screens]);
  }, [search]);

  const fetchData = async () => {
    try {
      const response = await getAllScreen();
      setScreens([...response.data]);
      setScreenFilter([...response.data.reverse()]);
      const res = await fetchMovieData();
      setMovieList([...res.data]);
      const resp = await getSeat();
      setSeats([...resp.data]);
      const listRoom = await fetchRoom();
      setRooms([...listRoom.data]);
      const listCombo = await fetchComboData(sessionStorage.getItem("jwt"));
      setCombos([...listCombo.data]);
    } catch (error) {
      console.error("Error fetching:", error);
    }
  };

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
    setDate("");
    setMess("");
    setPage(1);
    setSeatType([]);
    setCombosPrice([]);
    setIsEdit(false);
    setOpenDialog(false);
  };

  const handleOpenDialog = (screen) => {
    setOpenDialog(true);
    setDuration(
      movieList.filter((film) => film.id === screen.movieId)[0].duration
    );
    setSelectedScreen(screen.screeningId);
    setMovie(screen.movieId);
    setRoom(screen.roomId);
    setStartTime(screen.startTime);
    setDate(screen.date);
    screen.seatPrices[0].seatTypeId === 1 ? setSeatType([0, screen.seatPrices[0].price, screen.seatPrices[1].price]) : setSeatType([0, screen.seatPrices[1].price, screen.seatPrices[0].price]);
    
    screen.comboPrices.map((combo) => (
      setCombosPrice((prevPrice) => {
        const updatedObject = [...prevPrice];
        updatedObject[combo.comboId] =
          parseFloat(combo.price) > 0
            ? parseFloat(combo.price)
            : "";
        return updatedObject;
      })
    ))
    setIsEdit(true);
  };

  const handleDeleteScreen = async () => {
    try {
      await deleteScreen(selectedScreen, sessionStorage.getItem("jwt"));
      handleOnCloseConfirmationDialog();
      setMess("Delete screen successfully !!!");
      setOpenConfirmationDialog(true);
      fetchData();
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleAddScreen = async () => {
    try {
      await createScreen(
        movie,
        room,
        startTime,
        moment(startTime)
                      .add(duration)
                      .format("YYYY-MM-DD HH:mm:ss"),
        date,
        [...Array(seatType.length - 1).keys()].map((index) => ({
          seatTypeId: index + 1,
          price: seatType[index + 1],
        })),
        [...Array(combosPrice.length - 1).keys()].map((index) => ({
          comboId: index + 1,
          price: combosPrice[index + 1],
        })),
        sessionStorage.getItem("jwt")
      );
      setMess("Add screen successfully !!!");
      setOpenConfirmationDialog(true);
      fetchData();
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const [isEdit, setIsEdit] = useState(false);

  const handleEditScreen = async () => {
    try {
      await updateScreen(
        selectedScreen,
        movie,
        room,
        startTime,
        moment(startTime)
                      .add(duration)
                      .format("YYYY-MM-DD HH:mm:ss"),
        date,
        [...Array(seatType.length - 1).keys()].map((index) => ({
          seatTypeId: index + 1,
          price: seatType[index + 1],
        })),
        [...Array(combosPrice.length - 1).keys()].map((index) => ({
          comboId: index + 1,
          price: combosPrice[index + 1],
        })),
        sessionStorage.getItem("jwt")
      );
      setMess("Update screen successfully !!!");
      fetchData();
      setOpenConfirmationDialog(true);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  return (
    <div className="container-scroller" style={{ display: "block" }}>
      <Row>
        <Col lg={2}>
          <Sidebar />
        </Col>
        <Col lg={10}>
          <Row>
            <Navbar />
          </Row>
          <Row>
            <div
              className="main-panel"
              style={{
                paddingLeft: "20px",
                paddingRight: "20px",
                marginLeft: "-30px",
              }}
            >
              <div
                class="content-wrapper"
                style={{ backgroundColor: "white", top: "50px" }}
              >
                <div class="page-header">
                  <TableTitle>Screening</TableTitle>
                  <div
                    style={{
                      display: "flex",
                      width: "50%",
                      justifyContent: "right",
                    }}
                  >
                    <FlexContainer>
                      <DialogTextField
                        label="Search movie"
                        name="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </FlexContainer>
                    <FlexContainer>
                      <IconButton
                        aria-label="add"
                        onClick={() => setOpenDialog(true)}
                      >
                        <AddIcon />
                      </IconButton>
                      <Pagination
                        count={Math.ceil(screenFilter.length / 7)}
                        page={page}
                        onChange={(event, newPage) => setPage(newPage)}
                      />
                    </FlexContainer>
                  </div>
                </div>

                {screenFilter.length > 0 ? (
                  <StyledTableContainer component={Paper}>
                    <StyledTable aria-label="Promotion table">
                      <StyledTableHead>
                        <TableRow>
                          <StyledTableCell align="center">
                            Screen
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Movie
                          </StyledTableCell>
                          <StyledTableCell align="center">Room</StyledTableCell>
                          <StyledTableCell align="center">
                            Status
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Action
                          </StyledTableCell>
                        </TableRow>
                      </StyledTableHead>
                      <TableBody>
                        {screenFilter
                          .slice((page - 1) * 7, page * 7)
                          .map((screen) => (
                            <TableRow key={screen.screeningId}>
                              <StyledTableCell
                                align="center"
                                onClick={() => setOpenDetailDialog(true)}
                              >
                                {screen.startTime}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {movieList.filter(
                                  (film) => film.id === screen.movieId
                                )[0]
                                  ? movieList.filter(
                                      (film) => film.id === screen.movieId
                                    )[0].name
                                  : ""}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {rooms.filter(
                                  (roomNumber) =>
                                    roomNumber.roomId === screen.roomId
                                )[0]
                                  ? rooms.filter(
                                      (roomNumber) =>
                                        roomNumber.roomId === screen.roomId
                                    )[0].roomNumber
                                  : ""}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {screen.status === "ACTIVE" ? (
                                  <div className="badge badge-outline-success">
                                    On Screening
                                  </div>
                                ) : (
                                  <div className="badge badge-outline-danger">
                                    Removed
                                  </div>
                                )}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                <IconButton
                                  aria-label="edit"
                                  onClick={() => handleOpenDialog(screen)}
                                >
                                  <EditIcon color="warning" />
                                </IconButton>
                                <IconButton
                                  aria-label="delete"
                                  onClick={() =>
                                    handleOpenConfirmationDialog(
                                      screen.screeningId
                                    )
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
                ) : (
                  <h1 style={{ color: "gray" }}>
                    Don't have any screen for this movie !!!
                  </h1>
                )}
              </div>
            </div>
          </Row>
        </Col>
      </Row>

      {openDialog && (
        <StyledDialog
          style={{ paddingLeft: "25%", paddingRight: "25%" }}
          open={openDialog}
          onClose={() => {
            setOpenDialog(false);
            setIsEdit(false);
          }}
        >
          <DialogTitle>{isEdit ? "Edit" : "Add New"} Screen</DialogTitle>
          <DialogContent>
            <SelectOutlined variant="outlined" style={{ width: "50%" }}>
              <InputLabel>Select Movie</InputLabel>
              <Select
                label="Movie"
                name="movie"
                value={movie}
                onChange={(e) => {
                  setMovie(e.target.value);
                  setDuration(
                    movieList.filter((film) => film.id === e.target.value)[0]
                      .duration
                  );
                }}
              >
                {movieList.map((movie) => (
                  <MenuItem value={movie.id}>{movie.name}</MenuItem>
                ))}
              </Select>
            </SelectOutlined>
            {movie && startTime && (
              <SelectOutlined variant="outlined" style={{ width: "50%" }}>
                <InputLabel>Select Room</InputLabel>
                {isEdit ? (
                  <Select
                    label="Room"
                    name="room"
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                  >
                    <MenuItem value={room}>
                      {rooms.filter(
                        (roomNumber) => roomNumber.roomId === room
                      )[0]
                        ? rooms.filter(
                            (roomNumber) => roomNumber.roomId === room
                          )[0].roomNumber
                        : ""}
                    </MenuItem>
                    {rooms
                      .filter(
                        (screenRoom) =>
                          screens.filter(
                            (screen) =>
                              screen.startTime === startTime &&
                              screen.date === date &&
                              screen.roomId === screenRoom.roomId
                          ).length === 0
                      )
                      .map((screeningRoom) => (
                        <MenuItem value={screeningRoom.roomId}>
                          {screeningRoom.roomNumber}
                        </MenuItem>
                      ))}
                  </Select>
                ) : (
                  <Select
                    label="Room"
                    name="room"
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                  >
                    {rooms
                      .filter(
                        (screenRoom) =>
                          screens.filter(
                            (screen) =>
                              screen.startTime === startTime &&
                              screen.date === date &&
                              screen.roomId === screenRoom.roomId
                          ).length === 0
                      )
                      .map((screeningRoom) => (
                        <MenuItem value={screeningRoom.roomId}>
                          {screeningRoom.roomNumber}
                        </MenuItem>
                      ))}
                  </Select>
                )}
              </SelectOutlined>
            )}
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
              value={
                startTime.length > 12
                  ? moment(startTime)
                      .add(duration)
                      .format("YYYY-MM-DD HH:mm:ss")
                  : ""
              }
              disabled
            />
            <DialogTextField
              label="Standard seat price"
              value={seatType[1]}
              onChange={(e) =>
                setSeatType((prevType) => {
                  const updatedObject = [...prevType];
                  updatedObject[1] =
                    parseFloat(e.target.value) > 0 ? parseFloat(e.target.value) : "";
                  return updatedObject;
                })
              }
            />
            <DialogTextField
              label="VIP seat price"
              value={seatType[2]}
              onChange={(e) =>
                setSeatType((prevType) => {
                  const updatedObject = [...prevType];
                  updatedObject[2] =
                    parseFloat(e.target.value) > 0 ? parseFloat(e.target.value) : "";
                  return updatedObject;
                })
              }
            />
            <StyledTableContainer component={Paper}>
              <StyledTable aria-label="Combo table">
                <StyledTableHead>
                  <TableRow>
                    <StyledTableCell align="center">Name</StyledTableCell>
                    <StyledTableCell align="center">Price</StyledTableCell>
                  </TableRow>
                </StyledTableHead>
                <TableBody>
                  {combos
                    .filter((combo) => combo.status === "AVAILABLE")
                    .map((combo) => (
                      <TableRow>
                        <StyledTableCell align="center">
                          {combo.name}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <DialogTextField
                            value={combosPrice[combo.id]}
                            onChange={(e) =>
                              setCombosPrice((prevPrice) => {
                                const updatedObject = [...prevPrice];
                                updatedObject[combo.id] =
                                  parseFloat(e.target.value) > 0
                                    ? parseFloat(e.target.value)
                                    : "";
                                return updatedObject;
                              })
                            }
                          />
                        </StyledTableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </StyledTable>
            </StyledTableContainer>
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
          style={{ paddingLeft: "35%", paddingRight: "35%" }}
        >
          <DialogTitle>
            {mess === "" ? "Delete Screen" : "Notifacation"}
          </DialogTitle>
          <DialogContent>
            {mess === ""
              ? "Are you sure you want to delete this screen?"
              : mess}
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

      {openDetailDialog && (
        <StyledDialog
          style={{ paddingLeft: "25%", paddingRight: "25%" }}
          open={openDetailDialog}
          onClose={() => openDetailDialog(false)}
        >
          <DialogTitle>Screening's stauts</DialogTitle>
          <DialogContent>
            <div class="row ticket_field" style={{ justifyContent: "center" }}>
              <div class="seat-selection">
                <div class="legend">
                  <div>
                    <span class="unavailable"></span>
                    <p>Đã bán</p>
                  </div>
                  <div>
                    <span></span>
                    <p>Ghế trống</p>
                  </div>
                  <div>
                    <span class="vip"></span>
                    <p>Ghế VIP</p>
                  </div>
                </div>
                <span class="front">Màn hình</span>
                <div class="seats-wrapper-parent">
                  <div class="seats-wrapper-row">
                    <div class="seats seats-map">
                      <div class="row-wrapper">
                        <ul class="seat-row">
                          {seats
                            .filter(
                              (seat) =>
                                seat.room.id === room && seat.seatRow === "A"
                            )
                            .map((seat) => (
                              <li
                                className={`${
                                  seat.seatType === "VIP" ? "vip" : ""
                                } ${
                                  seat.status === "AVAILABLE"
                                    ? "available"
                                    : "unavailable"
                                } `}
                              >
                                {seat.seatNumber}
                              </li>
                            ))}
                        </ul>
                        <ul class="seat-row">
                          {seats
                            .filter(
                              (seat) =>
                                seat.room.roomNumber === room &&
                                seat.seatRow === "B"
                            )
                            .map((seat) => (
                              <li
                                className={`${
                                  seat.seatType === "VIP" ? "vip" : ""
                                } ${
                                  seat.status === "AVAILABLE"
                                    ? "available"
                                    : "unavailable"
                                } `}
                              >
                                {seat.seatNumber}
                              </li>
                            ))}
                        </ul>
                        <ul class="seat-row">
                          {seats
                            .filter(
                              (seat) =>
                                seat.room.roomNumber === room &&
                                seat.seatRow === "C"
                            )
                            .map((seat) => (
                              <li
                                className={`${
                                  seat.seatType === "VIP" ? "vip" : ""
                                } ${
                                  seat.status === "AVAILABLE"
                                    ? "available"
                                    : "unavailable"
                                } `}
                              >
                                {seat.seatNumber}
                              </li>
                            ))}
                        </ul>
                        <ul class="seat-row">
                          {seats
                            .filter(
                              (seat) =>
                                seat.room.roomNumber === room &&
                                seat.seatRow === "D"
                            )
                            .map((seat) => (
                              <li
                                className={`${
                                  seat.seatType === "VIP" ? "vip" : ""
                                } ${
                                  seat.status === "AVAILABLE"
                                    ? "available"
                                    : "unavailable"
                                } `}
                              >
                                {seat.seatNumber}
                              </li>
                            ))}
                        </ul>
                        <ul class="seat-row">
                          {seats
                            .filter(
                              (seat) =>
                                seat.room.roomNumber === room &&
                                seat.seatRow === "E"
                            )
                            .map((seat) => (
                              <li
                                className={`${
                                  seat.seatType === "VIP" ? "vip" : ""
                                } ${
                                  seat.status === "AVAILABLE"
                                    ? "available"
                                    : "unavailable"
                                } `}
                              >
                                {seat.seatNumber}
                              </li>
                            ))}
                        </ul>
                        <ul class="seat-row">
                          {seats
                            .filter(
                              (seat) =>
                                seat.room.roomNumber === room &&
                                seat.seatRow === "F"
                            )
                            .map((seat) => (
                              <li
                                className={` ${
                                  seat.seatType === "VIP" ? "vip" : ""
                                } ${
                                  seat.status === "AVAILABLE"
                                    ? "available"
                                    : "unavailable"
                                } `}
                              >
                                {seat.seatNumber}
                              </li>
                            ))}
                        </ul>
                        <ul class="seat-row">
                          {seats
                            .filter(
                              (seat) =>
                                seat.room.roomNumber === room &&
                                seat.seatRow === "G"
                            )
                            .map((seat) => (
                              <li
                                className={`${
                                  seat.seatType === "VIP" ? "vip" : ""
                                } ${
                                  seat.status === "AVAILABLE"
                                    ? "available"
                                    : "unavailable"
                                } `}
                              >
                                {seat.seatNumber}
                              </li>
                            ))}
                        </ul>
                        <ul class="seat-row">
                          {seats
                            .filter(
                              (seat) =>
                                seat.room.roomNumber === room &&
                                seat.seatRow === "H"
                            )
                            .map((seat) => (
                              <li
                                className={`${
                                  seat.seatType === "VIP" ? "vip" : ""
                                } ${
                                  seat.status === "AVAILABLE"
                                    ? "available"
                                    : "unavailable"
                                } `}
                              >
                                {seat.seatNumber}
                              </li>
                            ))}
                        </ul>
                        <ul class="seat-row">
                          {seats
                            .filter(
                              (seat) =>
                                seat.room.roomNumber === room &&
                                seat.seatRow === "I"
                            )
                            .map((seat) => (
                              <li
                                className={` ${
                                  seat.seatType === "VIP" ? "vip" : ""
                                } ${
                                  seat.status === "AVAILABLE"
                                    ? "available"
                                    : "unavailable"
                                } `}
                              >
                                {seat.seatNumber}
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDetailDialog(false)}>Cancel</Button>
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
