import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import "../styles/style.css";
import { Header } from "./Header";
import { fetchPaymentData } from "../api/paymentApi";

const Payment = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [ticketId, setTicketId] = useState(0);
  const [ticket, setTicket] = useState([{}]);

  const location = useLocation();

  useEffect(() => {
    if (location.state !== null) {
      setTicketId(location.state);
    }
  }, [location.state]);

  useEffect(() => (
    fetchPayment()
  ),[ticketId]);

  const fetchPayment = async () => {
    try{
      const response = await fetchPaymentData(ticketId, sessionStorage.getItem("jwt"));
      setTicket([...response.data]);
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
                    <span>Payment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Row>
            <Col lg={8}>
              <div class="form-ticket">
                <div class="card card-sm">
                  <div class="card-body">
                  <Row>
                    <h3>===== TICKET INFORMATION =====</h3>
                  </Row>
                    <div class="row">
                      <div class="col">
                        <p class="text-truncate mb-0">
                          <strong>{ticket.imagePath}</strong>
                        </p>
                        <p class="text-truncate mb-0">
                          Suất
                          <strong>
                            {ticket.screeningDateTime}
                          </strong>
                        </p>
                        <p class="text-truncate mb-0">
                          Phòng
                          <strong>
                            {ticket.roomNumber}
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
                            <tr class="ticketing-concession-type">
                              <td class="concession-name">
                              </td>
                              <td class="ticketing-select text-right">
                                {ticket.totalSeatsPrice}
                              </td>
                            </tr>
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
                            <tr class="ticketing-concession-type">
                                <td class="concession-name"></td>
                                <td class="ticketing-select text-right"> {ticket.totalComboPrice}</td>
                                </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card d-none d-md-block">
                        <div class="card-body">
                            <div class="row align-items-center">
                                <div class="col">
                                    <h6 class="card-title text-uppercase text-muted mb-2">Tổng đơn hàng:</h6> 
                                    <span class="h2 mb-0">${ticket.totalAmount}</span>
                                </div>
                            </div>
                        </div>
                    </div> 
                <div class="flow-actions sticky-footer-bars">
                  <div class="row" style={{ justifyContent: "center" }}>
                    {isLoading ? (<button class="btn-buy-ticket" disabled>
                        <div class="buy-ticket">
                          <span>Payment</span>
                        </div>
                    </button>):(
                        <div class="btn-buy-ticket" onClick={""}>
                        <div class="buy-ticket">
                          <span>Payment</span>
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
    </>
  );
};

export default Payment;