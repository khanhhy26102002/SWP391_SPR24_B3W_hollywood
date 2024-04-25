import Chart from 'chart.js/auto';
import React, { useEffect, useState } from 'react';
import { Col, ListGroup, Row } from 'react-bootstrap';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { fetchReport, fetchgetTopMovies } from '../api/reportApi';
function Dashboard1() {
  const [chartData, setChartData] = useState([{}]);
  const [topmovies, setTopMovies] = useState([{}]);
  const color = ['#FF9AA2', '#FFB782', '#FFDAC1', '#E2F0CB'];
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await fetchReport(sessionStorage.getItem("jwt"));
      setChartData({ ...response.data });
      const res = await fetchgetTopMovies(sessionStorage.getItem("jwt"));
      setTopMovies([...res.data]);
    } catch (error) {
      console.error('Error fetching report', error);
    }
  };
  useEffect(() => {
    const ctx = document.getElementById('myChart');
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['', '', '', ''],
        datasets: [{
          label: 'Top 4 movies most viewed',
          data: topmovies.map(movie=>movie.ticketsSold),
          backgroundColor: ['#FF9AA2', '#FFB782', '#FFDAC1', '#E2F0CB'],
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          legend: {
            display: false,
          }
        },
      }
    });

    return () => {
      myChart.destroy();
    };
  }, [topmovies]);

  return (
    <div className="container-scroller">
      <div><Sidebar /></div>
      <div className="container-fluid page-body-wrapper">
        <Navbar />
        <div className="main-panel" style={{ backgroundColor: "whitesmoke", paddingTop: "140px", paddingLeft: "20px", paddingRight: "20px" }}>
          <Row>
            <Col lg={8}>
              <div class="content-wrapper" style={{ backgroundColor: "white", borderRadius: "10px", paddingBottom: "47px" }}>
                <div>
                   <div>
                   <h5 style={{color:"black"}}>Top 4 movies most viewed</h5>
                   </div>
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
                        {topmovies.map((a,index)=>(
                          <ListGroup variant="flush">
                          <ListGroup.Item>
                            <div className="d-flex align-items-center">
<div className="legend-color" style={{ backgroundColor: `${color[index]}`, width: "30px", height: "15px" }}></div>
                              <span style={{ marginLeft: "10px", color: "black" }}>{a.movieName}</span>
                            </div>
                          </ListGroup.Item>
                        </ListGroup>
                        ))}
                     </div>
                   </div>
                </div>
              </div>
            </Col>
          </Row>
          <div class="row" style={{ paddingTop: "20px" }}>
            <div class="col-xl-3 col-sm-6 grid-margin stretch-card">
              <div class="card" style={{ backgroundColor: "white", borderRadius: "10px" }}>
                <div class="card-body">
                  <div class="row">
                    <div class="col-9">
                      <div class="d-flex align-items-center align-self-start">
                        <h3 class="mb-0" style={{ color: "black" }}>${chartData.monthlyRevenue}</h3>
                      </div>
                    </div>
                  </div>
                  <h6 class="text-muted font-weight-normal">Monthly Revenue</h6>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-sm-6 grid-margin stretch-card">
              <div class="card" style={{ backgroundColor: "white", borderRadius: "10px" }}>
                <div class="card-body">
                  <div class="row">
                    <div class="col-9">
                      <div class="d-flex align-items-center align-self-start">
                        <h3 class="mb-0" style={{ color: "black" }}>{chartData.totalUsers}</h3>
                        <p class="text-success ml-2 mb-0 font-weight-medium"></p>
                      </div>
                    </div>
                  </div>
                  <h6 class="text-muted font-weight-normal">Total Users</h6>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-sm-6 grid-margin stretch-card">
              <div class="card" style={{ backgroundColor: "white", borderRadius: "10px" }}>
                <div class="card-body">
                  <div class="row">
                    <div class="col-9">
                      <div class="d-flex align-items-center align-self-start">
                        <h3 class="mb-0" style={{ color: "black" }}>{chartData.ticketsSoldToday}</h3>
                        <p class="text-danger ml-2 mb-0 font-weight-medium"></p>
                      </div>
                    </div>
                  </div>
                  <h6 class="text-muted font-weight-normal">Tickets Sold Today</h6>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-sm-6 grid-margin stretch-card">
              <div class="card" style={{ backgroundColor: "white", borderRadius: "10px" }}>
                <div class="card-body">
                  <div class="row">
<div class="col-9">
                      <div class="d-flex align-items-center align-self-start">
                        <h3 class="mb-0" style={{ color: "black" }}>{chartData.totalMoviesThisMonth}</h3>
                        <p class="text-success ml-2 mb-0 font-weight-medium"></p>
                      </div>
                    </div>
                  </div>
                  <h6 class="text-muted font-weight-normal">Total Movies This Month</h6>
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
