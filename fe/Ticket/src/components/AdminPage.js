import Chart from 'chart.js/auto';
import React, { useEffect, useState } from 'react';
import { Col, ListGroup, Row } from 'react-bootstrap';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { fetchReport, fetchgetTopMovies } from '../api/reportApi';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
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
    <div className="container-scroller" style={{display: "block"}}>
      <Row>
        <Col lg={2}>
          <Sidebar/>
        </Col>
        <Col lg={10}>
        <Row>
        <Navbar />
        </Row>
        <Row>
        <div className="main-panel" style={{ backgroundColor: "whitesmoke", paddingTop: "140px", paddingLeft: "20px", paddingRight: "20px" ,marginLeft: "-30px"}}>
        <div class="row" style={{ paddingTop: "20px" }}>
            <div class="col-xl-3 col-sm-6 grid-margin stretch-card">
              <div class="card" style={{ backgroundColor: "white", borderRadius: "10px" }}>
                <div class="card-body">
                  <div class="row">
                    <Col lg={9}>
                      <div class="d-flex align-items-center align-self-start">
                        <h3 class="mb-0" style={{ color: "black" }}>${chartData.monthlyRevenue}</h3>
                      </div>
                      <h6 class="text-muted font-weight-normal">Monthly Revenue</h6>
                    </Col>
                    <Col lg={3}>
                      <MonetizationOnIcon style={{    width: "50px", height: "50px", color: "#33FF66"}}/>
                    </Col>
                  </div>
                  
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
                      <h6 class="text-muted font-weight-normal">Total Users</h6>
                    </div>
                    <Col lg={3}>
                      <PeopleAltIcon style={{    width: "50px", height: "50px", color: "#3333FF"}}/>
                    </Col>
                  </div>
                  
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
                      <h6 class="text-muted font-weight-normal">Tickets Sold Today</h6>
                    </div>
                    <Col lg={3}>
                      <ConfirmationNumberIcon style={{    width: "50px", height: "50px", color: "#FF3333"}}/>
                    </Col>
                  </div>
                  
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
                      <h6 class="text-muted font-weight-normal">Total Movies This Month</h6>
                    </div>
                    <Col lg={3}>
                      <LocalMoviesIcon style={{    width: "50px", height: "50px", color: "#003300"}}/>
                    </Col>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>

          <Row>
            <Col lg={8}>
              <div class="content-wrapper" style={{ backgroundColor: "white", borderRadius: "10px", paddingBottom: "66px" }}>
                <div>
                   <div>
                   <h5 style={{color:"black"}}>Top 4 movies most viewed</h5>
                   </div>
                  <canvas id="myChart" width="300" height="150"></canvas>
                </div>
              </div>
            </Col>
            <Col lg={4}>
              <div className="content-wrapper" style={{ backgroundColor: "white", borderRadius: "10px", padding: "52px",height:"500px"}}>
                <h5 style={{ marginBottom: "30px", color: "black" ,marginTop:"-30px"}}>Explain</h5>
                <div className="legend">
                     <div className="card" style={{ backgroundColor: "white", borderRadius:"10px",height:"400px",marginTop:"-20px", marginLeft:"-40px", paddingBottom:"400px", marginRight:"-40px"}}>
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
          
        </div>
        </Row>
        </Col>
      </Row>
      
    </div>
  );
}

export default Dashboard1;
