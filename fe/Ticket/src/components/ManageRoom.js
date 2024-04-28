import { useEffect, useState } from "react";
import "../styles/admin.css";
import Navbar from "./Navbar";
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
  TextField, Select, MenuItem, InputLabel
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from '@mui/icons-material/Edit';
import { Button, Col, Row } from "react-bootstrap";
import Sidebar from "./Sidebar";
import { createRoom, deleteRoom, fetchRoom, updateRoom } from "../api/roomApi";

const ManageRoom = () => {
  const [page, setPage] = useState(1);
  const [rooms, setRooms] = useState([]);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState();
  const [mess, setMess] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [roomNumber,setRoomNumber] = useState("");
  const [numberOfSeat,setNumberOfSeat] = useState(0);
  const [status,setStatus] = useState("INACTIVE");
  useEffect(() => {
    fetchData();
  },[])

  const fetchData = async () =>{
    try{
      const response = await fetchRoom();
      setRooms([...response.data]);
    }catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  const handleOpenConfirmationDialog = (id) => {
    setOpenConfirmationDialog(true);
    setSelectedRoom(id);
  };

  const handleOnCloseConfirmationDialog = () => {
    setOpenConfirmationDialog(false);
    setOpenDialog(false);
    setSelectedRoom("");
    setRoomNumber("");
    setNumberOfSeat("");
    setStatus("");
    setIsEdit(false);
    setMess("");
  };

  const handleOpenDialog = (room) => {
    setOpenDialog(true);
    setSelectedRoom(room.roomId);
    setRoomNumber(room.roomNumber);
    setNumberOfSeat(room.numberOfSeat);
    setStatus(room.status);
    setIsEdit(true);
  };

  const handleDeleteRoom = async () => {
    try {
      await deleteRoom(selectedRoom, sessionStorage.getItem("jwt"));
      setMess("Delete room successfully !!!");
      setOpenConfirmationDialog(true);
      fetchData();
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleAddRoom = async () =>{
    try {
        console.log(roomNumber,
            numberOfSeat,
              sessionStorage.getItem("jwt"));
      await createRoom(
        roomNumber,
      numberOfSeat,
        sessionStorage.getItem("jwt")
      );
      setMess("Add combo successfully !!!");
      fetchData();
      setOpenConfirmationDialog(true);
      fetchData();
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  const handleEditRoom = async() => {
    try {
      await updateRoom(
        selectedRoom,
        roomNumber,
      numberOfSeat,
        sessionStorage.getItem("jwt")
      );
setMess("Update room successfully !!!");
      setOpenConfirmationDialog(true);
      fetchData();
    } catch (error) {
      console.error("Error fetching posts:", error);
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
          <div class="content-wrapper" style={{backgroundColor: "white", top: "50px"}}>
            <div class="page-header">
              <TableTitle>Room</TableTitle>
              <FlexContainer>
                <IconButton aria-label="add" onClick={() => setOpenDialog(true)}>
                    <AddIcon />
                </IconButton>
                <Pagination
                  count={Math.ceil(rooms.length / 5)}
                  page={page}
                  onChange={(event, newPage) =>
                    setPage(newPage)
                  }
                />
              </FlexContainer>
            </div>

            <StyledTableContainer component={Paper}>
              <StyledTable aria-label="Combo table">
                <StyledTableHead>
                  <TableRow>
                    <StyledTableCell align="center">Room Number</StyledTableCell>
                    <StyledTableCell align="center">Number Of Seat</StyledTableCell>
                    <StyledTableCell align="center">Status</StyledTableCell>
                  </TableRow>
                </StyledTableHead>
                <TableBody>
                {rooms.slice((page - 1) * 5, page * 5).map((room) => (
                  <TableRow>
                      <StyledTableCell align="center">
                      {room.roomNumber}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                      {room.numberOfSeat}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                      {room.status}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                      <IconButton aria-label="edit" onClick={() => handleOpenDialog(room)}>
                            <EditIcon color="warning"/>
                        </IconButton>
                         <IconButton
                          aria-label="delete"
                          onClick={() => handleOpenConfirmationDialog(room.roomId)}
                        >
                          <DeleteIcon color="error" />
                        </IconButton>
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
        <StyledDialog open={openDialog} onClose={() => setOpenDialog(false)}>
      <DialogTitle>{isEdit ? "Edit" : "Add New"} Room</DialogTitle>
<DialogContent>
        <DialogTextField
          label="Room Number"
          name="roomnumber"
          value={roomNumber}
          onChange={(e) => setRoomNumber(e.target.value)}
        />
        <DialogTextField
          label="Number of seats"
          name="seats"
          value={numberOfSeat}
          onChange={(e) => setNumberOfSeat(e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleOnCloseConfirmationDialog}>Cancel</Button>
        <Button onClick={isEdit? handleEditRoom : handleAddRoom} color="primary">
          {isEdit ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </StyledDialog>
      )}


      {openConfirmationDialog && (
        <StyledDialog
          open={openConfirmationDialog}
          onClose={handleOnCloseConfirmationDialog}
          style={{paddingLeft: "35%",paddingRight:"35%"}}
        >
          <DialogTitle>
            {mess === "" ? "Delete Room" : "Notifacation"}
          </DialogTitle>
          <DialogContent>
            {mess === "" ? "Are you sure you want to delete this room?" : mess}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleOnCloseConfirmationDialog} color="primary">
              {mess === "" ? "Cancel" : "OK"}
            </Button>
            {mess === "" && (
              <Button onClick={handleDeleteRoom} color="primary">
                Delete
              </Button>
            )}
          </DialogActions>
        </StyledDialog>
      )}
    </div>
  );
};

export default ManageRoom;

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

  const SelectOutlined = styled(FormControl)({
    width: "30%",
    marginBottom: "10px",
  });