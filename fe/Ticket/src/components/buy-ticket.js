import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/style.css";
import { Header } from "./Header";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { getAllScreen } from "../api/screenApi";
import { getSeat } from "../api/seatApi";
import { fetchComboData } from "../api/comboApi";
import { Pagination } from "@mui/material";
import { createBooking } from "../api/ticketApi";
import { DialogTitle, DialogContent, DialogActions, Button, styled, Dialog } from "@mui/material";
import { fetchMovieData } from "../api/movieApi";

const BuyTicket = () => {
  const [selectedScreen, setSelectedScreen] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSeats, setSelectedSeats] = useState([{}]);
  const [comboQuantity, setComboQuantity] = useState({});
  const [movie, setMovie] = useState("");
  const [step, setStep] = useState("choose-screen");
  const [isSelectedDate, setIsSelectedDate] = useState(false);
  const [room, setRoom] = useState("");
  const [allScreen, setAllScreen] = useState([{}]);
  const [seats, setSeats] = useState([{}]);
  const [combos, setCombos] = useState([{}]);
  const [seatPrice, setSeatPrice] = useState([{}]);
  const [comboPrices, setComboPrices] = useState([{}]);
  const [movieName, setMovieName] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [selectedScreen, selectedDate, selectedSeats,comboQuantity]);

  const fetchData = async () => {
    try {
      const listScreeningMovie = await getAllScreen();
      setAllScreen([...listScreeningMovie.data]);
      const listSeat = await getSeat();
      setSeats([...listSeat.data]);
      const listMovie = await fetchMovieData();
      setMovieName([...listMovie.data.filter((film) => film.id === location.state)[0].name]);
      const listCombo = await fetchComboData(sessionStorage.getItem("jwt"));
      setCombos([...listCombo.data]);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    if (location.state !== null) {
      setMovie(location.state);
    }
  }, []);

  const handleSeatClick = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(
        selectedSeats.filter((seatSelected) => seatSelected !== seat)
      );
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setIsSelectedDate(true);
  };

  const handleClickScreen = (e) => {
    setSelectedScreen(e.target.value);
    setRoom(
      allScreen.filter(
        (screen) =>
          screen.date === selectedDate &&
          screen.movieId === movie &&
          screen.startTime.slice(11,screen.startTime.length) === e.target.value
      )[0].roomId
    );
    setSeatPrice([...allScreen.filter(
      (screen) =>
        screen.date === selectedDate &&
        screen.movieId === movie &&
        screen.startTime.slice(11,screen.startTime.length) === e.target.value
    )[0].seatPrices]);
    setComboPrices([...allScreen.filter(
      (screen) =>
        screen.date === selectedDate &&
        screen.movieId === movie &&
        screen.startTime.slice(11,screen.startTime.length) === e.target.value
    )[0].comboPrices]);
    if (sessionStorage.getItem("jwt") !== null) {
      setStep("choose-seats");
    } else {
      navigate("/login");
    }
  };

  const handleBookingTicket = async () => {
    setIsLoading(true);
    try {
      const response = await createBooking(
            selectedDate,
            selectedScreen,
            [...Array(selectedSeats.length - 1).keys()].map((index) => ({seatNumber: selectedSeats[index + 1]})),
            comboQuantity,
            sessionStorage.getItem("jwt")
        );
        setOpenDialog(true);
        setIsLoading(false);
        navigate("/payment", {state: response.data.ticketId})
      } catch (error) {
        console.error("Error fetching posts:", error);
        setIsLoading(false);
      }
  }

  return (
    <>
      <Header />
      <div class="main-content">
        <div class="container">
          <div class="breadcrumb-option">
            <div class="container">
              <div class="row">
                <div class="col-lg-12">
                  <div class="breadcrumb__links">
                    <a href="#">
                      <i class="fa fa-home"></i> Home
                    </a>
                    <span>Booking</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Row>
            <Col lg={8}>
              <div class="form-ticket">
                {step === "choose-screen" && (
                  <>
                    <div className="ticket_field">
                      <Row>Ngày chiếu:</Row>
                      <Row>
                        {allScreen
                          .filter((screen) => screen.movieId === movie)
                          .map((screen) => (
                            <Col
                              lg={2}
                              style={{
                                border: "1px solid white",
                                cursor: "pointer",
                              }}
                              onClick={() => handleDateClick(screen.date)}
                            >
                              <Row
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                {screen.date}
                              </Row>
                            </Col>
                          ))}
                      </Row>

                      {isSelectedDate && (
                        <>
                          <Row></Row>
                          <Row>Suất chiếu: </Row>
                          <Row>
                            <select
                              class="choice"
                              value={selectedScreen}
                              onChange={(e) => handleClickScreen(e)}
                            >
                              <option value="">
                                -----Chọn suất chiếu-----
                              </option>
                              {allScreen
                                .filter(
                                  (screen) =>
                                    screen.date === selectedDate &&
                                    screen.movieId === movie
                                )
                                .map((screen) => (
                                  <option value={screen.startTime.slice(
                                      11,
                                      screen.startTime.length
                                    )}>
                                    {screen.startTime.slice(
                                      11,
                                      screen.startTime.length
                                    )}
                                  </option>
                                ))}
                            </select>
                          </Row>
                        </>
                      )}
                    </div>
                  </>
                )}

                {step === "choose-seats" && (
                  <>
                    <div
                      class="row ticket_field"
                      style={{ justifyContent: "center" }}
                    >
                      <div class="seat-selection" style={{width: "100%"}}>
                        <div class="legend">
                          <div>
                            <span class="unavailable"></span>
                            <p>Đã bán</p>
                          </div>
                          <div>
                            <span class="selected"></span>
                            <p>Ghế bạn chọn</p>
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
                              {seats.filter((seat) => seat.room.id === room && seat.seatRow === "A").map((seat) => (
                                
                                <li
                                      className={`${selectedSeats.includes(seat.seatNumber) ? "selected" : ""} ${seat.seatType.id === 2 ? "vip":""} ${seat.status === "AVAILABLE" ? "available" : "unavailable"} `}
                                      onClick={() =>
                                        handleSeatClick(seat.seatNumber)
                                      }
                                    >
                                      {seat.seatNumber}
                                    </li>
                                
                              ))}
                              </ul>
                              <ul class="seat-row">
                              {seats.filter((seat) => seat.room.id === room && seat.seatRow === "B").map((seat) => (
                                <li
                                      className={`${selectedSeats.includes(seat.seatNumber) ? "selected" : ""} ${seat.seatType.id === 2 ? "vip":""} ${seat.status === "AVAILABLE" ? "available" : "unavailable"} `}
                                      onClick={() =>
                                        handleSeatClick(seat.seatNumber)
                                      }
                                    >
                                      {seat.seatNumber}
                                    </li>
                                
                              ))}
                              </ul>
                              <ul class="seat-row">
                              {seats.filter((seat) => seat.room.id === room && seat.seatRow === "C").map((seat) => (
                                
                                <li
                                      className={`${selectedSeats.includes(seat.seatNumber) ? "selected" : ""} ${seat.seatType.id === 2 ? "vip":""} ${seat.status === "AVAILABLE" ? "available" : "unavailable"} `}
                                      onClick={() =>
                                        handleSeatClick(seat.seatNumber)
                                      }
                                    >
                                      {seat.seatNumber}
                                    </li>
                                
                              ))}
                              </ul>
                              <ul class="seat-row">
                              {seats.filter((seat) => seat.room.id === room && seat.seatRow === "D").map((seat) => (
                                
                                <li
                                      className={`${selectedSeats.includes(seat.seatNumber) ? "selected" : ""} ${seat.seatType.id === 2 ? "vip":""} ${seat.status === "AVAILABLE" ? "available" : "unavailable"} `}
                                      onClick={() =>
                                        handleSeatClick(seat.seatNumber)
                                      }
                                    >
                                      {seat.seatNumber}
                                    </li>
                                
                              ))}
                              </ul>
                              <ul class="seat-row">
                              {seats.filter((seat) => seat.room.id === room && seat.seatRow === "E").map((seat) => (
                                
                                <li
                                      className={`${selectedSeats.includes(seat.seatNumber) ? "selected" : ""} ${seat.seatType.id === 2 ? "vip":""} ${seat.status === "AVAILABLE" ? "available" : "unavailable"} `}
                                      onClick={() =>
                                        handleSeatClick(seat.seatNumber)
                                      }
                                    >
                                      {seat.seatNumber}
                                    </li>
                                
                              ))}
                              </ul>
                              <ul class="seat-row">
                              {seats.filter((seat) => seat.room.id === room && seat.seatRow === "F").map((seat) => (
                                
                                <li
                                      className={`${selectedSeats.includes(seat.seatNumber) ? "selected" : ""} ${seat.seatType.id === 2 ? "vip":""} ${seat.status === "AVAILABLE" ? "available" : "unavailable"} `}
                                      onClick={() =>
                                        handleSeatClick(seat.seatNumber)
                                      }
                                    >
                                      {seat.seatNumber}
                                    </li>
                                
                              ))}
                              </ul>
                              <ul class="seat-row">
                              {seats.filter((seat) => seat.room.id === room && seat.seatRow === "G").map((seat) => (
                                
                                <li
                                      className={`${selectedSeats.includes(seat.seatNumber) ? "selected" : ""} ${seat.seatType.id === 2 ? "vip":""} ${seat.status === "AVAILABLE" ? "available" : "unavailable"} `}
                                      onClick={() =>
                                        handleSeatClick(seat.seatNumber)
                                      }
                                    >
                                      {seat.seatNumber}
                                    </li>
                                
                              ))}
                              </ul>
                              <ul class="seat-row">
                              {seats.filter((seat) => seat.room.id === room && seat.seatRow === "H").map((seat) => (
                                
                                <li
                                      className={`${selectedSeats.includes(seat.seatNumber) ? "selected" : ""} ${seat.seatType.id === 2 ? "vip":""} ${seat.status === "AVAILABLE" ? "available" : "unavailable"} `}
                                      onClick={() =>
                                        handleSeatClick(seat.seatNumber)
                                      }
                                    >
                                      {seat.seatNumber}
                                    </li>
                                
                              ))}
                              </ul>
                              <ul class="seat-row">
                              {seats.filter((seat) => seat.room.id === room && seat.seatRow === "I").map((seat) => (
                                
                                <li
                                      className={`${selectedSeats.includes(seat.seatNumber) ? "selected" : ""} ${seat.seatType.id === 2 ? "vip":""} ${seat.status === "AVAILABLE" ? "available" : "unavailable"} `}
                                      onClick={() =>
                                        handleSeatClick(seat.seatNumber)
                                      }
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
                    <Row>
                      <Col lg={6}>
                        <div
                          class="row"
                          style={{ justifyContent: "left", left: "15px" }}
                        >
                          <div
                            class="btn-buy-ticket"
                            onClick={() => {
                              setStep("choose-screen");
                              setSelectedSeats([{}]);
                            }}
                          >
                            <div class="buy-ticket">
                              <span>
                                <NavigateBeforeIcon />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div
                          class="row"
                          style={{ justifyContent: "right", right: "15px" }}
                        >
                          <div
                            class="btn-buy-ticket"
                            onClick={() => {
                              selectedSeats.length > 1
                                ? setStep("choose-combo")
                                : setOpenDialog(true)
                            }}
                          >
                            <div class="buy-ticket">
                              <span>
                                <NavigateNextIcon />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </>
                )}

                {step === "choose-combo" && (
                  <>
                    <div class="row ticket_field">
                    <Row style={{display: "flex", justifyContent:"right", width: "100%"}}>
                    <Pagination
                    count={Math.ceil(combos.length / 5 )}
                    page={page}
                    onChange={(e, newPage) => setPage(newPage)}
                    style={{background: "white", borderRadius: "10px"}}
                  />
                    </Row>
                      <table class="table table-nowrap card-table">
                        <thead>
                          <tr>
                            <th>Combo</th>
                            <th class="text-right d-none d-sm-block">
                              Giá tiền
                            </th>
                            <th class="text-right">Số lượng</th>
                          </tr>
                        </thead>
                        <tbody>
                          {combos.filter((combo) => comboPrices.filter((comboPrice) => comboPrice.comboId === combo.id).length > 0).slice((page - 1) * 5, page * 5).map((combo) => (
                            <tr class="ticketing-concession-type">
                            <td class="concession-name">
                              <h5 ><strong>{combo.name}</strong></h5>
                              <span class="d-none d-md-block text-muted">
                                {combo.description}
                              </span>
                            </td>
                            <td class="concession-price text-right">
                            ${comboPrices.filter((comboTypePrice) => comboTypePrice.comboId === combo.id)[0].price}
                            </td>
                            <td class="ticketing-select text-right">
                              <div class="quantity-toggle">
                                <input
                                  type="number"
                                  min="0"
                                  max="10"
                                  step="1"
                                  value={
                                    comboQuantity[`${combo.id}`] > 10
                                      ? 10
                                      : (parseInt(comboQuantity[`${combo.id}`]) < 0 ? 0 : comboQuantity[`${combo.id}`])
                                  }
                                  defaultValue={0}
                                  onChange={(e) =>
                                    setComboQuantity((prevQuantity) => {
                                        const updatedObject = { ...prevQuantity };
                                        updatedObject[`${combo.id}`] = e.target.value > 10 ? 10 : (parseInt(e.target.value) < 0 ? 0 : e.target.value);  
                                        return updatedObject;
                                    })
                                  }
                                  class="quantity"
                                />
                              </div>
                            </td>
                          </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <Row>
                      <Col lg={6}>
                        <div
                          class="row"
                          style={{ justifyContent: "left", left: "15px" }}
                        >
                          <div
                            class="btn-buy-ticket"
                            onClick={() => setStep("choose-seats")}
                          >
                            <div class="buy-ticket">
                              <span>
                                <NavigateBeforeIcon />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </>
                )}
              </div>
            </Col>
              <Col lg={4}>
              <div class="form-ticket">
                <div class="card card-sm">
                  <div class="card-body">
                    <div class="row">
                      <div class="col">
                        <p class="text-truncate mb-0">
                          <strong>{movieName}</strong>
                        </p>
                        <p class="text-truncate mb-0">
                          Suất
                          <strong>
                            {" "}
                            {selectedScreen}, {selectedDate}{" "}
                          </strong>
                        </p>
                        <table class="table table-nowrap card-table">
                          <thead>
                            <tr>
                              <th>Ghế bạn chọn</th>
                              <th class="text-right"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {[...Array(selectedSeats.length - 1).keys()].map(
                              (index) => (
                                <tr class="ticketing-concession-type">
                                  <td class="concession-name">
                                    {selectedSeats[index + 1]}
                                  </td>
                                  <td class="ticketing-select text-right">
                                    {/*${seats.filter((seat) => seat.room.id === room && seat.seatNumber === selectedSeats[index + 1])[0].seatType.id}*/}
                                    ${seatPrice.filter((seatTypePrice) => seatTypePrice.seatTypeId === 
                                    (seats.filter((seat) => seat.room.id === room && seat.seatNumber === selectedSeats[index + 1])[0].seatType.id))[0].price}
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card card-sm">
                  <div class="card-body">
                    <div class="row">
                      <div class="col">
                        <table class="table table-nowrap card-table">
                          <thead>
                            <tr>
                              <th>Combo</th>
                              <th class="text-right"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {combos.map((combo) => (
                                <>
                                {comboQuantity[combo.id] > 0 && (
                              <tr class="ticketing-concession-type">
                                <td class="concession-name">
                                  {" "}
                                  {combo.name} x<strong> {comboQuantity[combo.id]} </strong>
                                </td>
                                <td class="ticketing-select text-right">
                                ${comboPrices.filter((comboTypePrice) => comboTypePrice.comboId === combo.id)[0].price * comboQuantity[combo.id]}
                                </td>
                              </tr>
                            )}
                                </>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flow-actions sticky-footer-bars">
                  <div class="row" style={{ justifyContent: "center" }}>
                    {isLoading ? (<button class="btn-buy-ticket" disabled>
                        <div class="buy-ticket">
                          <span>Booking</span>
                        </div>
                    </button>):(
                        <div class="btn-buy-ticket" onClick={handleBookingTicket}>
                        <div class="buy-ticket">
                          <span>Booking</span>
                        </div>
                    </div>
                    )}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      {openDialog && (
            <StyledDialog style={{paddingLeft: "25%",paddingRight: "25%"}} open={openDialog} onClose={() => setOpenDialog(false)}>
      <DialogTitle>Notification</DialogTitle>
      <DialogContent>
      {selectedSeats.length > 1 ? "Vé của bạn đã được ghi nhận" : "Vui lòng chọn ít nhất một ghế"}
      </DialogContent>

      <DialogActions>
        <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
      </DialogActions>
    </StyledDialog>
      )}
    </>
  );
};

export default BuyTicket;

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