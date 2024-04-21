import React from "react";
import "../plugins/OwlCarousel2-2.2.1/owl.carousel.css";
import "../plugins/OwlCarousel2-2.2.1/owl.theme.default.css";
import "../plugins/OwlCarousel2-2.2.1/animate.css";
import "../styles/main_styles.css";
import "../styles/responsive.css";
import "../styles/bootstrap4/bootstrap.min.css";
import "../plugins/font-awesome-4.7.0/css/font-awesome.min.css";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Footer = () => {
    const navigate = useNavigate();
    return (
        <footer className="footer">
          <div className="container">
                <Row>
                    <Col lg={3}>
                        <div className="footer__logo">
                            <a href="#"><img src="img/logo.png" alt=""/></a>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="footer__nav">
                            <ul>
                                <li className="active"><a href="#">Homepage</a></li>
                                <li><a href="#">Categories</a></li>
                                <li onClick={() => navigate("/contact")}><a href="#">Contacts</a></li>
                            </ul>
                        </div>
                    </Col>
                  </Row>
                  <Row className="footer-contact">
                    <p>
                      Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i className="fa fa-heart" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Nhom5</a>
                    </p>

                  </Row>
              </div>
          </footer>
    );
}