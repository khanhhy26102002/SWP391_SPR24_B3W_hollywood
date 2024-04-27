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
import { fetchPaymentData } from "../api/paymentApi";

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
  }, [selectedScreen, selectedDate, selectedSeats]);

  const fetchData = async () => {
    try {
      const response = await getAllScreen();
      setAllScreen([...response.data]);
      const res = await getSeat();
      setSeats([...res.data]);
      const resp = await fetchComboData();
      setCombos([...resp.data]);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    if (location.state !== null) {
      setMovie(location.state);
    }
  }, [location.state]);

  const handleSeatClick = (seat) => {
    console.log(room);
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
          screen.movieName === movie &&
          screen.start_time.slice(11,screen.start_time.length) === e.target.value
      )[0].roomNumber
    );
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
                          .filter((screen) => screen.movieName === movie)
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
                                    screen.movieName === movie
                                )
                                .map((screen) => (
                                  <option value={screen.start_time.slice(
                                      11,
                                      screen.start_time.length
                                    )}>
                                    {screen.start_time.slice(
                                      11,
                                      screen.start_time.length
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
                      <div class="seat-selection">
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
                              {seats.filter((seat) => seat.room.roomNumber === room && seat.seatRow === "A").map((seat) => (
                                
                                <li
                                      className={`${selectedSeats.includes(seat.seatNumber) ? "selected" : ""} ${seat.seatType === "VIP" ? "vip":""} ${seat.status === "AVAILABLE" ? "available" : "unavailable"} `}
                                      onClick={() =>
                                        handleSeatClick(seat.seatNumber)
                                      }
                                    >
                                      {seat.seatNumber}
                                    </li>
                                
                              ))}
                              </ul>
                              <ul class="seat-row">
                              {seats.filter((seat) => seat.room.roomNumber === room && seat.seatRow === "B").map((seat) => (
                                <li
                                      className={`${selectedSeats.includes(seat.seatNumber) ? "selected" : ""} ${seat.seatType === "VIP" ? "vip":""} ${seat.status === "AVAILABLE" ? "available" : "unavailable"} `}
                                      onClick={() =>
                                        handleSeatClick(seat.seatNumber)
                                      }
                                    >
                                      {seat.seatNumber}
                                    </li>
                                
                              ))}
                              </ul>
                              <ul class="seat-row">
                              {seats.filter((seat) => seat.room.roomNumber === room && seat.seatRow === "C").map((seat) => (
                                
                                <li
                                      className={`${selectedSeats.includes(seat.seatNumber) ? "selected" : ""} ${seat.seatType === "VIP" ? "vip":""} ${seat.status === "AVAILABLE" ? "available" : "unavailable"} `}
                                      onClick={() =>
                                        handleSeatClick(seat.seatNumber)
                                      }
                                    >
                                      {seat.seatNumber}
                                    </li>
                                
                              ))}
                              </ul>
                              <ul class="seat-row">
                              {seats.filter((seat) => seat.room.roomNumber === room && seat.seatRow === "D").map((seat) => (
                                
                                <li
                                      className={`${selectedSeats.includes(seat.seatNumber) ? "selected" : ""} ${seat.seatType === "VIP" ? "vip":""} ${seat.status === "AVAILABLE" ? "available" : "unavailable"} `}
                                      onClick={() =>
                                        handleSeatClick(seat.seatNumber)
                                      }
                                    >
                                      {seat.seatNumber}
                                    </li>
                                
                              ))}
                              </ul>
                              <ul class="seat-row">
                              {seats.filter((seat) => seat.room.roomNumber === room && seat.seatRow === "E").map((seat) => (
                                
                                <li
                                      className={`${selectedSeats.includes(seat.seatNumber) ? "selected" : ""} ${seat.seatType === "VIP" ? "vip":""} ${seat.status === "AVAILABLE" ? "available" : "unavailable"} `}
                                      onClick={() =>
                                        handleSeatClick(seat.seatNumber)
                                      }
                                    >
                                      {seat.seatNumber}
                                    </li>
                                
                              ))}
                              </ul>
                              <ul class="seat-row">
                              {seats.filter((seat) => seat.room.roomNumber === room && seat.seatRow === "F").map((seat) => (
                                
                                <li
                                      className={`${selectedSeats.includes(seat.seatNumber) ? "selected" : ""} ${seat.seatType === "VIP" ? "vip":""} ${seat.status === "AVAILABLE" ? "available" : "unavailable"} `}
                                      onClick={() =>
                                        handleSeatClick(seat.seatNumber)
                                      }
                                    >
                                      {seat.seatNumber}
                                    </li>
                                
                              ))}
                              </ul>
                              <ul class="seat-row">
                              {seats.filter((seat) => seat.room.roomNumber === room && seat.seatRow === "G").map((seat) => (
                                
                                <li
                                      className={`${selectedSeats.includes(seat.seatNumber) ? "selected" : ""} ${seat.seatType === "VIP" ? "vip":""} ${seat.status === "AVAILABLE" ? "available" : "unavailable"} `}
                                      onClick={() =>
                                        handleSeatClick(seat.seatNumber)
                                      }
                                    >
                                      {seat.seatNumber}
                                    </li>
                                
                              ))}
                              </ul>
                              <ul class="seat-row">
                              {seats.filter((seat) => seat.room.roomNumber === room && seat.seatRow === "H").map((seat) => (
                                
                                <li
                                      className={`${selectedSeats.includes(seat.seatNumber) ? "selected" : ""} ${seat.seatType === "VIP" ? "vip":""} ${seat.status === "AVAILABLE" ? "available" : "unavailable"} `}
                                      onClick={() =>
                                        handleSeatClick(seat.seatNumber)
                                      }
                                    >
                                      {seat.seatNumber}
                                    </li>
                                
                              ))}
                              </ul>
                              <ul class="seat-row">
                              {seats.filter((seat) => seat.room.roomNumber === room && seat.seatRow === "I").map((seat) => (
                                
                                <li
                                      className={`${selectedSeats.includes(seat.seatNumber) ? "selected" : ""} ${seat.seatType === "VIP" ? "vip":""} ${seat.status === "AVAILABLE" ? "available" : "unavailable"} `}
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
                          {combos.slice((page - 1) * 5, page * 5).map((combo) => (
                            <tr class="ticketing-concession-type">
                            <td class="concession-name">
                              {combo.comboName}
                              <span class="d-none d-md-block text-muted">
                                {combo.description}
                              </span>
                            </td>
                            <td class="concession-price text-right">
                              ${combo.comboPrice}
                            </td>
                            <td class="ticketing-select text-right">
                              <div class="quantity-toggle">
                                <input
                                  type="number"
                                  min="0"
                                  max="10"
                                  step="1"
                                  value={
                                    comboQuantity[`${combo.comboId}`] > 10
                                      ? 10
                                      : comboQuantity[`${combo.comboId}`]
                                  }
                                  defaultValue={0}
                                  onChange={(e) =>
                                    setComboQuantity((prevQuantity) => {
                                        const updatedObject = { ...prevQuantity };
                                        updatedObject[`${combo.comboId}`] = e.target.value > 10 ? 10 : e.target.value;  
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
                          <strong>{movie}</strong>
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
                              <th>Ghế</th>
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
                                    ${seats.filter((seat) => seat.room.roomNumber === room && seat.seatNumber === selectedSeats[index + 1])[0].seatPrice}
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
                                {comboQuantity[combo.comboId] > 0 && (
                              <tr class="ticketing-concession-type">
                                <td class="concession-name">
                                  {" "}
                                  {combo.description} x<strong> {comboQuantity[combo.comboId]} </strong>
                                </td>
                                <td class="ticketing-select text-right">
                                  ${combo.comboPrice * comboQuantity[combo.comboId]}
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