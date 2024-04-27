import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import "../styles/style.css";
import { Header } from "./Header";
import { fetchPaymentData } from "../api/paymentApi";

const Payment = () => {
  const [isLoading,setIsLoading] = useState(false);
  const [ticket, setTicket] = useState([{}]);
  const [ticketId, setTicketId] = useState(0);

  const location = useLocation();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetchPaymentData(ticketId, sessionStorage.getItem("jwt"));
      setTicket([...response.data]);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    if (location.state) {
      console.log(location.state);
    }
  }, [location.state]);

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
                    <span>Payment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Row>
            <Col lg={8}>
              <div class="form-ticket">
              <Row style={{display: "flex", justifyContent: "center"}}>
                    <h3>===== TICKET INFORMATION =====</h3>
                  </Row>
                  <Row>
                      <Col lg={4}>
                        Phim: 
                      </Col>
                      <Col lg={8}>
                      <strong>{ticket.imagePath}</strong>
                      </Col>
                  </Row>
                  <Row>
                      <Col lg={4}>
                        Suất: 
                      </Col>
                      <Col lg={8}>
                      <strong>{ticket.screeningDateTime}</strong>
                      </Col>
                  </Row>
                  <Row>
                      <Col lg={4}>
                        Phòng: 
                      </Col>
                      <Col lg={8}>
                      <strong>
                            {ticket.roomNumber}
                          </strong>
                      </Col>
                  </Row>
                  <Row>
                      <Col lg={4}>
                        Ghế: 
                      </Col>
                      <Col lg={8}>
                      <strong>
                      {ticket.totalSeatsPrice}
                          </strong>
                      </Col>
                  </Row>
                  <Row>
                      <Col lg={4}>
                        Combo: 
                      </Col>
                      <Col lg={8}>
                      <strong>
                    {ticket.totalComboPrice}
                          </strong>
                      </Col>
                  </Row>
                  <Row>
                      <Col lg={4}>
                        Tổng: 
                      </Col>
                      <Col lg={8}>
                      <strong>
                      ${ticket.totalAmount}
                          </strong>
                      </Col>
                  </Row>
                  <Row style={{display: "flex", justifyContent:"center"}}>
                  <div class="flow-actions sticky-footer-bars">
                  <div class="row" style={{ justifyContent: "center" }}>
                    {isLoading ? (<button class="btn-buy-ticket" disabled>
                        <div class="buy-ticket">
                          <span>Pay</span>
                        </div>
                    </button>):(
                        <div class="btn-buy-ticket" onClick={""}>
                        <div class="buy-ticket">
                          <span>Pay</span>
                        </div>
                    </div>
                    )}
                  </div>
                </div>
                  </Row>
              </div>
            </Col>
              {/*<Col lg={4}>
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
                          <span>Pay</span>
                        </div>
                    </button>):(
                        <div class="btn-buy-ticket" onClick={""}>
                        <div class="buy-ticket">
                          <span>Pay</span>
                        </div>
                    </div>
                    )}
                  </div>
                </div>
              </div>
            </Col>*/}
          </Row>

        </div>
      </div>
    </>
  );
};

export default Payment;