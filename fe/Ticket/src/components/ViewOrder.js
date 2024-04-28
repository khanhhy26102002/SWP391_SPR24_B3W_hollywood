import React,{useEffect, useState} from 'react'
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import {
  styled,
  TableContainer,
  Pagination,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  FormControl,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from "@mui/material";
import { fetchTicketData, cancelTicket } from '../api/ticketApi';
import { Col, Row } from 'react-bootstrap';
export default function ViewOrder() {
  const [page, setPage] = useState(1);
  const [ticket, setTicket] = useState([{}]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});
  useEffect(()=>{
    fetchData();
  },[]);
  const fetchData = async () => {
    try {
      const response = await fetchTicketData(sessionStorage.getItem("jwt"));
      setTicket([...response.data.reverse()]);
    } catch (error) {
      console.error("Error fetching ticket!!", error)
    }
  };
  
  const handleCancelTicket = async (id) => {
    try{
      console.log(sessionStorage.getItem("jwt"));
      await cancelTicket(id, sessionStorage.getItem("jwt"));
    } catch (error) {
      console.error("Error fetching ticket!!", error)
    }
  }
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
        <div className="main-panel">
          <div class="content-wrapper" style={{ backgroundColor: "white", top: "50px" }}>
            <div class="page-header">
              <TableTitle>Orders</TableTitle>
               <div style={{ textAlign: 'center', marginTop: '20px' }}>
              </div>
               <FlexContainer>
                <Pagination
                  count={Math.ceil(ticket.length / 5)}
                  page={page}
                  onChange={(event, newPage) =>
                    setPage(newPage)
                  }
                />
              </FlexContainer>
            </div>
            <StyledTableContainer component={Paper}>
              <StyledTable aria-label="User table">
                <StyledTableHead>
                  <TableRow>
                    <StyledTableCell align="center">Ngày chiếu</StyledTableCell>
                    <StyledTableCell align="center">movies</StyledTableCell>
                    <StyledTableCell align="center">status</StyledTableCell>
                    <StyledTableCell align="center">Action</StyledTableCell>
                  </TableRow>
                </StyledTableHead>
                <TableBody>
                    {ticket.slice((page - 1) * 5, page*5).map((a)=>(
                      <TableRow >
                      <StyledTableCell align="center">
                         {a.screeningDate}
                      </StyledTableCell>
                      <StyledTableCell align="center" onClick={() => {setOpenDialog(true);setSelectedOrder({...a})}}>
                      <Button>{a.movieName}</Button>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <div className='badge badge-outline-success'>{a.status}</div>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Button onClick={() => handleCancelTicket(a.id)}>Cancel</Button>
                      </StyledTableCell>
                    </TableRow>
                    ))}
                </TableBody>
              </StyledTable>
            </StyledTableContainer>
          </div>
        </div>
        </Row>
        </Col>
      </Row>
      {openDialog && (
        <StyledDialog open={openDialog} onClose={() => setOpenDialog(false)} style={{ width: "30%", marginLeft:"35%" }}>
      <DialogTitle>Order detail:</DialogTitle>
      <DialogContent>
      <Row >
              <div class="form-ticket" style={{width: "100%"}}>
                  <Row>
                      <Col lg={4}>
                        Phim: 
                      </Col>
                      <Col lg={8}>
                      <strong>{selectedOrder.movieName}</strong>
                      </Col>
                  </Row>
                  <Row>
                      <Col lg={4}>
                        Suất: 
                      </Col>
                      <Col lg={8}>
                      <strong>{selectedOrder.screeningTime}</strong>
                      </Col>
                  </Row>
                  <Row>
                      <Col lg={4}>
                        Phòng: 
                      </Col>
                      <Col lg={8}>
                      <strong>
                            {selectedOrder.roomNumber}
                          </strong>
                      </Col>
                  </Row>
                  <Row>
                      <Col lg={4}>
                        Ghế: 
                      </Col>
                      <Col lg={8}>
                      <strong>
                      {selectedOrder.seatNumbers}
                          </strong>
                      </Col>
                  </Row>
                  <Row>
                      <Col lg={4}>
                        Tổng tiền ghế: 
                      </Col>
                      <Col lg={8}>
                      <strong>
                      {selectedOrder.totalSeatsPrice}
                          </strong>
                      </Col>
                  </Row>
                  <Row>
                      <Col lg={4}>
                        Tổng tiền combo: 
                      </Col>
                      <Col lg={8}>
                      <strong>
                    {selectedOrder.totalComboPrice}
                          </strong>
                      </Col>
                  </Row>
                  <Row>
                      <Col lg={4}>
                        Tổng: 
                      </Col>
                      <Col lg={8}>
                      <strong>
                      ${selectedOrder.totalPrice}
                          </strong>
                      </Col>
                  </Row>
              </div>
            </Row>
      </DialogContent>
      <DialogTextField
          label="Status"
          name="status"
          value={selectedOrder.status}
          disabled
        />
      <DialogActions>
        <Button onClick={()=> setOpenDialog(false)}>Cancel</Button>
      </DialogActions>
    </StyledDialog>
      )}
    </div>
  )
}
const TableTitle = styled("div")({
  fontWeight: "bold",
  textTransform: "uppercase",
  fontSize: "1rem",
  color: "black",
});

const FlexContainer = styled("div")({
  display: "flex",
  alignItems: "center",
});

const StyledTableContainer = styled(TableContainer)`
  margin-top: 16px;
`;

const StyledTable = styled(Table)`
  min-width: 650px;
`;

const StyledTableHead = styled(TableHead)`
  & th {
    position: relative;
    text-align: center;
    font-weight: bold;
  }

  & th::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    background-color: rgba(224, 224, 224, 1);
    width: 1px;
    height: 70%;
  }
  background-color: #f5f5f5;
`;

const StyledTableCell = styled(TableCell)`
  font-weight: 300;
  text-align: center;
`;

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

const DialogTextField = styled(TextField)({
  width: "100%",
});