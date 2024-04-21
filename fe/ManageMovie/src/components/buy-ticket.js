import { useEffect, useState } from "react";
import "../styles/style.css";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Row, Col } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

const BuyTicket = () => {
const [selectedScreen, setSelectedScreen] = useState("");
const [room, setRoom] = useState("");
const [selectedSeats, setSelectedSeats] = useState([]);
const [quantity, setQuantity] = useState([]);
const [movie, setMovie] = useState("");
const [day, setDay] = useState();

const seats = ([
{id: 1, status: "unavailable"},
{id: 2, status: "available"},
{id: 3, status: "available"},
{id: 4, status: "available"},
{id: 5, status: "unavailable"},
]);


const navigate = useNavigate();
const location = useLocation();

useEffect(() => {

}, [selectedScreen,room, day]);

useEffect(() => {
if (location.state !== null) {
setMovie(location.state);
}
}, [location.state]);

return (
<>
<Header/>
<div class="main-content">
    <div class="container">
        <div class="breadcrumb-option">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="breadcrumb__links">
                            <a href="#"><i class="fa fa-home"></i> Home</a>
                            <span>Booking</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Row>
            <Col lg={8}>
            <div class="form-ticket">
                <Row>
                    <Col lg={4}>
                    <div  className="product__item__pic set-bg" style={{backgroundImage:`url(url......)})`, color: "white"}}>poster ở đây</div>
                         </Col>
                         <Col lg={8}>
                         <Row><h2 style={{color:"white", textAlign: "left"}}>Tên phim</h2></Row>
                          <Row>
                              <ul class="products-grid-movie tab-showtime">
                                  <li class="item">
                                      <a href="https://www.cgv.vn/default/cinemas/booking/tickets/site/004/seq/10213846/dy/20240419">
                                          <span>15:20 PM</span>
                                      </a>
                                  </li>
                                  <li class="item">
                                      <a href="https://www.cgv.vn/default/cinemas/booking/tickets/site/004/seq/10186341/dy/20240419">
                                          <span>19:30 PM</span>
                                      </a>
                                  </li>
                                  <li class="item">
                                      <a href="https://www.cgv.vn/default/cinemas/booking/tickets/site/004/seq/10208439/dy/20240419">
                                          <span>22:00 PM</span>
                                      </a>
                                  </li>
                              </ul>
                          </Row>
                          </Col>
                      </Row>
                      <div class="row ticket_field">  
                          <div class="col-lg-6 selection">
                              <p>Suất chiếu: </p>
                              <input disabled class="choice" value={selectedScreen}/>

                          </div>
                          <div class="col-lg-6 selection">
                              <p>Phòng chiếu: </p>
                              <input disabled class="choice" value={room}/>
                          </div>
                      </div>
                      <div class="row ticket_field">
                          <div class="seat-selection">
                              <div class="legend">
                                  <div  >
                                      <span class="unavailable"></span> 
                                      <p  >Đã bán</p>
                                  </div> 
                                  <div  >
                                      <span class="selected"></span> 
                                      <p  >Ghế bạn chọn</p>
                                  </div> 
                              </div> 
                              <span class="front">Màn hình</span>
                              <div class="seats-wrapper-parent">
                                  <div class="seats-wrapper-row">
                                      <div class="seats seats-map">
                                          <div class="row-wrapper">
                                              <ul class="seat-row">

                                                  <li class="available">
                                                      A1
                                                  </li>
                                                  <li class="available">
                                                      A1
                                                  </li>
                                                  <li class="available">
                                                      A1
                                                  </li>
                                                  <li class="available">
                                                      A1
                                                  </li>
                                                  <li class="available">
                                                      A1
                                                  </li>

                                              </ul>
                                          </div>
                                      </div>
                                  </div>

                              </div>
                          </div>
                      </div>
                      <div class="row ticket_field">
                          <table  class="table table-nowrap card-table">
                              <thead  >
                                  <tr  >
                                      <th  >Combo</th> 
                                      <th  class="text-right d-none d-sm-block">Giá tiền</th> 
                                      <th  class="text-right">Số lượng</th>
                                  </tr>
                              </thead> 
                              <tbody  >
                                  <tr  class="ticketing-concession-type">
                                      <td  class="concession-name">
                                          Combo 1
                                          <span  class="d-none d-md-block text-muted">1 Bắp Ngọt 60oz + 1 Coke 32oz - V </span> 
                                          <span  class="d-block d-sm-none text-muted">84.000&nbsp;₫</span>
                                      </td> 
                                      <td  class="concession-price text-right">84.000&nbsp;₫</td> 
                                      <td  class="ticketing-select text-right">
                                          <div  class="quantity-toggle">
                                              <input  type="number" min="0" max="10" step="1" value={quantity[0]} onChange={(e) => setQuantity((prevQuantity) => 
                                              {
                                              const updatedQuantity = [...prevQuantity];
                                              updatedQuantity[0] = e.target.value;
                                              return updatedQuantity;
                                              })} class="quantity"/>
                                          </div>
                                      </td>
                                  </tr>
                                  <tr  class="ticketing-concession-type">
                                      <td  class="concession-name">
                                          Combo 2
                                          <span  class="d-none d-md-block text-muted">1 Bắp Ngọt 60oz + 2 Coke 32oz - V</span> 
                                          <span  class="d-block d-sm-none text-muted">109.000&nbsp;₫</span>
                                      </td> 
                                      <td  class="concession-price text-right">109.000&nbsp;₫</td> 
                                      <td  class="ticketing-select text-right">
                                          <div  class="quantity-toggle">
                                              <input  type="number" min="0" max="10" step="1" value={quantity[1]} onChange={(e) => setQuantity((prevQuantity) => 
                                              {
                                              const updatedQuantity = [...prevQuantity];
                                              updatedQuantity[1] = e.target.value;
                                              return updatedQuantity;
                                              })} class="quantity"/>
                                          </div>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                      </div>
                     </div>
                     </Col>
                     <Col lg={4}>
                     <div class="form-ticket">
                         <div class="card card-sm">
                             <div class="card-body">
                                 <div class="row"><div class="col">
                                         <p class="text-truncate mb-0"><strong>{movie}</strong></p> 
                                         <p class="text-truncate mb-0">Suất<strong> {selectedScreen}</strong></p> 
                                         <p class="text-truncate mb-0">Phòng chiếu<strong> {room} </strong></p>
                                         <table  class="table table-nowrap card-table">
                                             <thead  >
                                                 <tr  >
                                                     <th  >Ghế</th>
                                                     <th  class="text-right"></th>
                                                 </tr>
                                             </thead> 
                                             <tbody  >
                                                 <tr  class="ticketing-concession-type">
                                                     <td  class="concession-name"> C04</td> 
                                                     <td  class="ticketing-select text-right">
                                                         45.000&nbsp;₫
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
                                 <div class="row"><div class="col">
                                         <table  class="table table-nowrap card-table">
                                             <thead  >
                                                 <tr  >
                                                     <th  >Combo</th>
                                                     <th  class="text-right"></th>
                                                 </tr>
                                             </thead> 
                                             <tbody  >
                                                 {quantity[0] > 0 && (
                                                 <tr  class="ticketing-concession-type">
                                                     <td  class="concession-name"> Combo 1 x<strong> {quantity[0]} </strong></td> 
                                                     <td  class="ticketing-select text-right">
                                                         {84*quantity[0]}.000&nbsp;₫
                                                     </td>
                                                 </tr>
                                                 )}
                                                 {quantity[1] > 0 && (
                                                 <tr  class="ticketing-concession-type">
                                                     <td  class="concession-name"> Combo 2 x<strong> {quantity[1]} </strong></td> 
                                                     <td  class="ticketing-select text-right">
                                                         {109*quantity[1]}.000&nbsp;₫
                                                     </td>
                                                 </tr>
                                                 )}
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
                                         <span class="h2 mb-0">{(quantity[0] >0 || quantity[1]>0) ? (`${quantity[0]*84+quantity[1]*109}.000`) : (0)}&nbsp;₫</span>
                                     </div>
                                 </div>
                             </div>
                         </div> 
                         <div class="flow-actions sticky-footer-bars">
                             <div class="row"> 
                                 <div class="btn-buy-ticket">
                                     <a href="#">
                                         <div class="buy-ticket">
                                             <span>Thanh toán</span>
                                         </div>
                                     </a>
                                 </div>
                             </div>
                         </div>
                     </div>
                     </Col>
                    </Row>
                </div>
            </div>
            <Footer/>
            </>
            );
            };

            export default BuyTicket;