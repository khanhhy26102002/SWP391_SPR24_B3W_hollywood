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
                        <div className="footer__logo" style={{width: "100px", height: "auto"}}>
                            <a href="/home"><img src="https://inthienha.com/wp-content/uploads/CGV-Cinemas-1536x1152.png?v=1606473529" alt=""/></a>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="footer__nav">
                            <ul>
                                <li ><a href="/home">Homepage</a></li>
                                <li onClick={() => navigate("/rule")}>Our Rules</li>
                                <li onClick={() => navigate("/contact")}>Contacts</li>
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