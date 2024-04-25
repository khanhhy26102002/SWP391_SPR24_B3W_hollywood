import { Alert, AlertTitle, Button, Dialog, DialogActions, DialogContentText, DialogTitle, FormControlLabel, Switch, TextField, Typography, DialogContent } from '@mui/material';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { addMovie } from '../api/movieApi';
export default function Add() {
  const [open,setOpen] = useState(false);
  const [name,setName] = useState('');
  const [description,setDescription] = useState('');
  const [duration,setDuration] = useState('');
  const [director,setDirector] = useState('');
  const [actor,setActor] = useState('');
  const [genre,setGenre] = useState('');
  const [language,setLanguage] = useState('');
  const [trailer,setTrailer] = useState('');
  const [premiere,setPremiere] = useState('');
  const [rated,setRated] = useState('');
  const handleClose = ()=>{
     setOpen(false);
  };
  const handleSubmit = async()=>{
     try{
        await addMovie(
         name,
         description,
         duration,
         director,
         actor,
         genre,
         premiere,
         language,
         rated,
         trailer,
         sessionStorage.getItem("jwt"),
    );
    setOpen(true);}
    catch (error){
        console.error("Error fetching posts:", error);
    }
  }
  return (
    <>
    <div style={{backgroundColor:'white'}}>
        <TextField autoFocus
        margin="dense"
        name='name'
        label="Name"
        type='text'
        fullWidth
        variant="standard"
        value={name}
        onChange={(e)=>setName(e.target.value)}/>
        <TextField autoFocus
        margin="dense"
        name="description"
        label="Description"
        type="text"
        fullWidth
        variant="standard"
        value={description}
        onChange={(e)=>setDescription(e.target.value)}/>
        <TextField autoFocus
        margin="dense"
        name='duration'
        label="Duration"
        type='text'
        fullWidth
        variant="standard"
        value={duration}
        onChange={(e)=>setDuration(e.target.value)}/>
        <TextField autoFocus
        margin="dense"
        name='director'
        label="Director"
        type='text'
        fullWidth
        variant="standard"
        value={director}
        onChange={(e)=>setDirector(e.target.value)}/>
        <TextField autoFocus
        margin="dense"
        name='actor'
        label="Actor"
        type='text'
        fullWidth
        variant="standard"
        value={actor}
        onChange={(e)=>setActor(e.target.value)}/>
        <TextField autoFocus
        margin="dense"
        name='genre'
        label="Genre"
        type='text'
        fullWidth
        variant="standard"
        value={genre}
        onChange={(e)=>setGenre(e.target.value)}/>
        <TextField autoFocus
        margin="dense"
        name='premiere'
        label="Premiere"
        type='date'
        fullWidth
        variant="standard"
        value={premiere}
        onChange={(e)=>setPremiere(e.target.value)}/>
        <TextField autoFocus
        margin="dense"
        name='language'
        label="Language"
        type='text'
        fullWidth
        variant="standard"
        value={language}
        onChange={(e)=>setLanguage(e.target.value)}/>
        <TextField autoFocus
        margin="dense"
        name='rated'
        label="Rated"
        type='text'
        fullWidth
        variant="standard"
        value={rated}
        onChange={(e)=>setRated(e.target.value)}/>
        <TextField autoFocus
        margin="dense"
        name='trailer'
        label="Trailer"
        type='text'
        fullWidth
        variant="standard"
        value={trailer}
        onChange={(e)=>setTrailer(e.target.value)}/>
        <Button variant="contained" size='small' onClick={handleSubmit}>Add</Button>
     { open && (
        <Dialog open={open}
     onClose={handleClose}
     aria-labelledby='alert-dialog-title'
     aria-describedby='alert-dialog-description'>
      <DialogTitle id="alert-dialog-title">
        You have added more movie
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Alert severity="success">
            <AlertTitle>Adding Successful!</AlertTitle>
          </Alert>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
      <Button><Link to='/admin' style={{textDecoration:"none"}}>Dashboard</Link></Button>
      <Button autoFocus onClick={handleClose}>Close
      </Button>
      </DialogActions>
     </Dialog>
     )

     }
     </div>
    </>
  )
}