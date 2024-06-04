import React, { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import MovieListContext from '../../context/MovieListContext';

const CreateMovieListDialog = ({afterCreated}) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const {createMovieList} = useContext(MovieListContext)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = () => {
    if(title.length > 0){
        createMovieList(title).then(()=> afterCreated())
    }
    setOpen(false);
    setTitle('');
  }

  return (
    <div>
      <div className='w-48 h-24 bg-gray-700 shadow-md rounded-md relative items-center flex justify-center text-5xl cursor-pointer' onClick={handleClickOpen}>
        <span>+</span>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Bir Başlık Girin</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Lütfen oluşturmak istediğiniz başlığı girin.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Başlık"
            type="text"
            fullWidth
            variant="standard"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>İptal</Button>
          <Button onClick={handleCreate}>Oluştur</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreateMovieListDialog;
