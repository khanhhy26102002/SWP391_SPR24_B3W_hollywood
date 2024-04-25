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
  TextField
} from "@mui/material";
import { fetchTicketData } from '../api/ticketApi';
export default function ViewOrder() {
  const [page, setPage] = useState(1);
  const [ticket, setTicket] = useState([{}]);
  useEffect(()=>{
    fetchData();
  },[]);
  const fetchData = async () => {
    try {
      const response = await fetchTicketData(sessionStorage.getItem("jwt"));
      setTicket([...response.data]);
      console.log(response.data);
      console.log(ticket);
    } catch (error) {
      console.error("Error fetching ticket!!", error)
    }
  };
  return (
    <div className='container-scroller'>
       <Sidebar/>
       <div className='container-fluid page-body-wrapper'>
        <Navbar/>
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
                    <StyledTableCell align="center">Suất chiếu</StyledTableCell>
                    <StyledTableCell align="center">Ghế</StyledTableCell>
<StyledTableCell align="center">Combo</StyledTableCell>
                    <StyledTableCell align="center">movies</StyledTableCell>
                    <StyledTableCell align="center">rated</StyledTableCell>
                    <StyledTableCell align="center">status</StyledTableCell>
                  </TableRow>
                </StyledTableHead>
                <TableBody>
                    {ticket.map((a)=>(
                      <TableRow>
                      <StyledTableCell align="center">
                         {a.screeningDate}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                         {a.screeningTime}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                         {a.seatNumbers}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                         {a.totalComboPrice}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {a.movieName}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {a.rated}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <div className='badge badge-outline-success'>Đã Trả</div>
                      </StyledTableCell>
                    </TableRow>
                    ))}
                </TableBody>
              </StyledTable>
            </StyledTableContainer>
          </div>
        </div>
       </div>
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