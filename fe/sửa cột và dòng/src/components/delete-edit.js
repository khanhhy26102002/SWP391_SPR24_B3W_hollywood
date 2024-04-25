import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { deleteMovieById, fetchMovieData, updateMovieById } from "../api/movieApi";

const ManageMovie = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editedMovie, setEditedMovie] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetchMovieData();
      setMovies(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleDeleteConfirmation = (movieId) => {
    setSelectedMovie(movieId);
    setOpenDeleteDialog(true);
  };

  const handleDeleteMovie = async () => {
    try {
      await deleteMovieById(selectedMovie);
      fetchData();
      setOpenDeleteDialog(false);
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  const handleEditMovie = (movie) => {
    setSelectedMovie(movie.id);
    setEditedMovie({ ...movie });
    setOpenEditDialog(true);
  };

  const handleSaveEditMovie = async () => {
    try {
      await updateMovieById(selectedMovie, editedMovie);
      fetchData();
      setOpenEditDialog(false);
    } catch (error) {
      console.error("Error updating movie:", error);
    }
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="Movie table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Genre</TableCell>
              <TableCell align="center">Duration</TableCell>
              <TableCell align="center">Premiere</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movies.map((movie) => (
              <TableRow key={movie.id}>
                <TableCell align="center">{movie.name}</TableCell>
                <TableCell align="center">{movie.genre}</TableCell>
                <TableCell align="center">{movie.duration}</TableCell>
                <TableCell align="center">{movie.premiere}</TableCell>
                <TableCell align="center">
                  <IconButton aria-label="edit" onClick={() => handleEditMovie(movie)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="delete" onClick={() => handleDeleteConfirmation(movie.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Delete Movie</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this movie?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteMovie} color="primary">Delete</Button>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">Cancel</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Movie</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={editedMovie.name}
            onChange={(e) => setEditedMovie({ ...editedMovie, name: e.target.value })}
          />
          <TextField
            label="Genre"
            value={editedMovie.genre}
            onChange={(e) => setEditedMovie({ ...editedMovie, genre: e.target.value })}
          />
          <TextField
            label="Duration"
            value={editedMovie.duration}
            onChange={(e) => setEditedMovie({ ...editedMovie, duration: e.target.value })}
          />
          <TextField
            label="Premiere"
            value={editedMovie.premiere}
            onChange={(e) => setEditedMovie({ ...editedMovie, premiere: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSaveEditMovie} color="primary">Save</Button>
          <Button onClick={() => setOpenEditDialog(false)} color="primary">Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageMovie;