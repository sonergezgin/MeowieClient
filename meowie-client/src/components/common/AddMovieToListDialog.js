import React, { useState, useEffect, useContext } from 'react'
import {
    Button,
    IconButton,
    Icon,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
 } from '@mui/material'
import MovieListContext from '../../context/MovieListContext'

const AddMovieToListDialog = ({movieId, fontsize = 30}) => {
    const [movieLists, setMovieLists] = useState([])
    const [open, setOpen] = useState(false)
    const {getUserMovieLists, addMovieToList} = useContext(MovieListContext)

    useEffect(() => {
        if (open) {
            getUserMovieLists().then((movieList)=>{
                setMovieLists(movieList)
            })
        }
    }, [open])

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const addToList = async (movieListId) => {
        await addMovieToList(movieId, movieListId)
        setOpen(false)
    }

    return (
        <div>
            <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
            />

            <IconButton variant="outlined" onClick={handleClickOpen}>
                <Icon sx={{color: '#ff6473', fontSize: `${fontsize}px !important`, width: `${fontsize}px !important`, height: `${fontsize}px !important` }}>add_circle</Icon>
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Movie to List</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {movieLists ? 
                        movieLists.map((movieList) => (
                            <div key={movieList.id} onClick={()=>addToList(movieList.id)} className='p-4 bg-gray-100 rounded-md mb-1 cursor-pointer'>
                                {movieList.title}
                            </div>
                        )) : "Please first login"
                        }
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AddMovieToListDialog
