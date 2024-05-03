import Chart from 'chart.js/auto';
import React, { useEffect, useState } from 'react';
import { Col, ListGroup, Row } from 'react-bootstrap';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart, lineElementClasses } from '@mui/x-charts/LineChart';
import { fetchDay, fetchReport, fetchWeekly, fetchgetTopMovies } from '../api/reportApi';
function Dashboard1() {
  const [chartData, setChartData] = useState([{}]);
  const [topmovies, setTopMovies] = useState([{}]);
  const [weekly, setWeekly] = useState([{}]);
  const [day, setDay] = useState([{}]);
  const screeningCount = weekly.map(week => week.screeningCount);
  const totalRevenue = weekly.map(week => week.totalRevenue);
  const movieName = weekly.map(week => week.movieName);
  const paymentDay = day.map(a => a.paymentDay);
  const dailyRevenue = day.map(b => b.dailyRevenue);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await fetchReport(sessionStorage.getItem("jwt"));
      setChartData({ ...response.data });
      const res = await fetchgetTopMovies(sessionStorage.getItem("jwt"));
      setTopMovies([...res.data]);
      const res1 = await fetchWeekly(sessionStorage.getItem("jwt"));
      setWeekly([...res1.data]);
      const res2 = await fetchDay(sessionStorage.getItem("jwt"));
      setDay([...res2.data]);
    } catch (error) {
      console.error('Error fetching report', error);
    }
  };
  return (
    <div className="container-scroller" style={{ display: "block" }}>
      <Row>
        <Col lg={2}>
          <Sidebar />
        </Col>
        <Col lg={10}>
          <Row>
            <Navbar />
          </Row>
          <Row>
            <div className="main-panel" style={{ backgroundColor: "whitesmoke", paddingTop: "100px", paddingLeft: "20px", paddingRight: "20px", marginLeft: "-30px" }}>
              <h1 style={{ color: "black", fontWeight: "700" }}>ADMIN DASHBOARD</h1>
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
                          <MonetizationOnIcon style={{ width: "50px", height: "50px", color: "#33FF66" }} />
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
                          <PeopleAltIcon style={{ width: "50px", height: "50px", color: "#3333FF" }} />
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
                          <ConfirmationNumberIcon style={{ width: "50px", height: "50px", color: "#FF3333" }} />
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
                          <LocalMoviesIcon style={{ width: "50px", height: "50px", color: "#003300" }} />
                        </Col>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Row>
                <Col lg={8}>
                  <div style={{ marginLeft: "230px" }}>
                    <BarChart
                      width={900}
                      height={300}
                      series={[
                        { data: screeningCount, label: 'screeningCount' },
                        { data: totalRevenue, label: 'totalRevenue' },
                      ]}
                      xAxis={[{ data: movieName, scaleType: 'band' }]}
                    />
                  </div>
                  <div style={{ marginLeft: "230px" }}>
                    <LineChart
                      width={900}
                      height={300}
                      series={[{ data: dailyRevenue, label: 'daily Revenue', area: true, showMark: false }]}
                      xAxis={[{ scaleType: 'point', data: paymentDay }]}
                      sx={{
                        [`& .${lineElementClasses.root}`]: {
                          display: 'none',
                        },
                      }}
                    />
                  </div>
                </Col>
                <Col lg={4}>
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