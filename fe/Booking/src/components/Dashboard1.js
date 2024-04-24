import Chart from 'chart.js/auto';
import React, { useEffect } from 'react';
import { Col, ListGroup, Row } from 'react-bootstrap';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
function Dashboard1() {
  useEffect(() => {
    const ctx = document.getElementById('myChart');
    if (!ctx) return;

    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['', '', '', ''],
        datasets: [{
          label: 'Movie Dashboard',
          data: [65, 59, 80, 81],
          backgroundColor: ['#FF9AA2','#FFB782','#FFDAC1','#E2F0CB'],
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          legend: {
            display: false, // Ẩn chú thích
          }
        },
      }
    }
);

    return () => {
      myChart.destroy(); // Clean up the chart when component unmounts
    };
  }, []);

  return (
    <div className="container-scroller">
      <div><Sidebar/></div>
      <div className="container-fluid page-body-wrapper">
        <Navbar/>
        <div className="main-panel" style={{backgroundColor:"whitesmoke", paddingTop:"140px", paddingLeft:"20px",paddingRight:"20px"}}>
          <Row>
            <Col lg={8}>
            <div class="content-wrapper" style={{ backgroundColor: "white",borderRadius:"10px", paddingBottom: "47px"}}>
            <div>
              <canvas id="myChart" width="300" height="150"></canvas>
            </div>
          </div>
            </Col>
            <Col lg={4}>
            <div className="content-wrapper" style={{ backgroundColor: "white", borderRadius: "10px", padding: "52px" }}>
                <h5 style={{ marginBottom: "20px", color: "black" }}>Explain</h5>
                <div className="legend">
                  <div className="card" style={{ backgroundColor: "white", borderRadius: "10px" }}>
                    <div className="card-body">
                      <ListGroup variant="flush">
                        <ListGroup.Item>
                          <div className="d-flex align-items-center">
                            <div className="legend-color" style={{ backgroundColor: "#FF9AA2", width: "30px", height: "15px" }}></div>
                            <span style={{ marginLeft: "10px", color: "black"}}>Monthly Revenue</span>
                          </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <div className="d-flex align-items-center">
                            <div className="legend-color" style={{ backgroundColor: "#FFB782", width: "30px", height: "15px" }}></div>
                            <span style={{ marginLeft: "10px", color: "black" }}>Total Users</span>
                          </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <div className="d-flex align-items-center">
                            <div className="legend-color" style={{ backgroundColor: "#FFDAC1", width: "30px", height: "15px" }}></div>
                            <span style={{ marginLeft: "10px", color: "black" }}>Tickets Sold Today</span>
                          </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <div className="d-flex align-items-center">
                            <div className="legend-color" style={{ backgroundColor: "#E2F0CB", width: "30px", height: "15px" }}></div>
                            <span style={{ marginLeft: "10px", color: "black" }}>Total Movies This Month</span>
                          </div>
                        </ListGroup.Item>
                      </ListGroup>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <div class="row" style={{paddingTop:"20px"}}>
              <div class="col-xl-3 col-sm-6 grid-margin stretch-card">
                <div class="card" style={{backgroundColor:"white", borderRadius:"10px"}}>
                  <div class="card-body">
                    <div class="row">
                      <div class="col-9">
                        <div class="d-flex align-items-center align-self-start">
                          <h3 class="mb-0" style={{color:"black"}}>$500000000</h3>
                          <p class="text-success ml-2 mb-0 font-weight-medium"></p>
                        </div>
                      </div>
                    </div>
                    <h6 class="text-muted font-weight-normal">Revenue</h6>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-sm-6 grid-margin stretch-card">
                <div class="card" style={{backgroundColor:"white", borderRadius:"10px"}}>
                  <div class="card-body">
                    <div class="row">
                      <div class="col-9">
                        <div class="d-flex align-items-center align-self-start">
                          <h3 class="mb-0" style={{color:"black"}}>250 movies</h3>
                          <p class="text-success ml-2 mb-0 font-weight-medium"></p>
                        </div>
                      </div>
                    </div>
                    <h6 class="text-muted font-weight-normal">Movies</h6>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-sm-6 grid-margin stretch-card">
                <div class="card" style={{backgroundColor:"white", borderRadius:"10px"}}>
                  <div class="card-body">
                    <div class="row">
                      <div class="col-9">
                        <div class="d-flex align-items-center align-self-start">
                          <h3 class="mb-0" style={{color:"black"}}>250 orders</h3>
                          <p class="text-danger ml-2 mb-0 font-weight-medium"></p>
                        </div>
                      </div>
                    </div>
                    <h6 class="text-muted font-weight-normal">Total Orders</h6>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-sm-6 grid-margin stretch-card">
                <div class="card" style={{backgroundColor:"white", borderRadius:"10px"}}>
                  <div class="card-body">
                    <div class="row">
                      <div class="col-9">
                        <div class="d-flex align-items-center align-self-start">
                          <h3 class="mb-0" style={{color:"black"}}>50 users</h3>
                          <p class="text-success ml-2 mb-0 font-weight-medium"></p>
                        </div>
                      </div>
                    </div>
                    <h6 class="text-muted font-weight-normal">Total Users</h6>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard1;