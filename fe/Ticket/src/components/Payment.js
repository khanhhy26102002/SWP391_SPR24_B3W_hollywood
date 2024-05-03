import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import "../styles/style.css";
import { Header } from "./Header";
import { proccessPayment } from "../api/paymentApi";
import { Dialog, DialogActions, DialogContent, DialogTitle, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getTicketInformation } from "../api/ticketApi";

const Payment = () => {
  const [isLoading,setIsLoading] = useState(false);
  const [ticket, setTicket] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    fetchData();
    console.log(location.state, sessionStorage.getItem("jwt"));
  }, []);

  const fetchData = async () => {
    try {
      const response = await getTicketInformation(location.state, sessionStorage.getItem("jwt"));
      setTicket({...response.data});
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleProccessPayment = async () => {
    setIsLoading(true);
    try {
      await proccessPayment(location.state, sessionStorage.getItem("jwt"));
      setOpenDialog(true);
      setIsLoading(false);
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
              <Row style={{display: "flex", justifyContent: "center"}}>
                    <h3>===== TICKET INFORMATION =====</h3>
                  </Row>
                  <Row>
                      <Col lg={4} style={{display: "flex", justifyContent: "left"}}>
                        Khách hàng: 
                      </Col>
                      <Col lg={8} style={{display: "flex", justifyContent: "left"}}>
                      <strong>{ticket.userName}</strong>
                      </Col>
                  </Row>
                  <Row>
                      <Col lg={4} style={{display: "flex", justifyContent: "left"}}>
                        Phim: 
                      </Col>
                      <Col lg={8} style={{display: "flex", justifyContent: "left"}}>
                      <strong>{ticket.movieName}</strong>
                      </Col>
                  </Row>
                  <Row>
                      <Col lg={4} style={{display: "flex", justifyContent: "left"}}>
                        Suất chiếu: 
                      </Col>
                      <Col lg={8} style={{display: "flex", justifyContent: "left"}}>
                      <strong>{ticket.screeningTime}</strong>
                      </Col>
                  </Row>
                  <Row>
                      <Col lg={4} style={{display: "flex", justifyContent: "left"}}>
                        Phòng: 
                      </Col>
                      <Col lg={8} style={{display: "flex", justifyContent: "left"}}>
                      <strong>
                            {ticket.roomNumber}
                          </strong>
                      </Col>
                  </Row>
                  
                  <Row>
                      <Col lg={4} style={{display: "flex", justifyContent: "left"}}>
                        Tổng tiền ghế: 
                      </Col>
                      <Col lg={8} style={{display: "flex", justifyContent: "left"}}>
                      <strong>
                      ${ticket.totalSeatsPrice}
                          </strong>
                      </Col>
                  </Row>
                  <Row>
                      <Col lg={4} style={{display: "flex", justifyContent: "left"}}>
                        Tổng tiền combo: 
                      </Col>
                      <Col lg={8} style={{display: "flex", justifyContent: "left"}}>
                      <strong>
                    ${ticket.totalComboPrice}
                          </strong>
                      </Col>
                  </Row>
                  <Row>
                      <Col lg={4} style={{display: "flex", justifyContent: "left"}}>
                        Tổng tiền: 
                      </Col>
                      <Col lg={8} style={{display: "flex", justifyContent: "left"}}>
                      <strong>
                      ${ticket.totalPrice}
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
                        <div class="btn-buy-ticket" onClick={handleProccessPayment}>
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
          </Row>

        </div>
      </div>
      {openDialog && (
            <StyledDialog style={{paddingLeft: "25%",paddingRight: "25%"}} open={openDialog} onClose={() => setOpenDialog(false)}>
      <DialogTitle>Notification</DialogTitle>
      <DialogContent>
      Thanh toán thành công
      </DialogContent>

      <DialogActions>
        <Button onClick={() => navigate("/home")}>Cancel</Button>
      </DialogActions>
    </StyledDialog>
      )}
    </>
  );
};

export default Payment;
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