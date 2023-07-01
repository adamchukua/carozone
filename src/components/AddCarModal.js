import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useCarContext } from './CarContext';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AddCarModal() {
  const { addModalOpen, handleAddModalClose, handleAddCarSubmit } = useCarContext();

  return (
    <Modal
      open={addModalOpen}
      onClose={handleAddModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add car
        </Typography>

        <form onSubmit={handleAddCarSubmit}>
            <Stack spacing={2}>
              <TextField
                name="company"
                label="Company"
              />
              <TextField
                name="model"
                label="Model"
              />
              <TextField
                name="VIN"
                label="VIN"
              />
              <TextField
                name="year"
                label="Year"
              />
              <TextField
                name="color"
                label="Color"
              />
              <TextField
                name="price"
                label="Price"
              />
              <TextField
                name="availability"
                label="Availability"
              />
              <Stack direction="row" spacing={2}>
                <Button type="submit" variant="contained">Add</Button>
                <Button type="button" variant="outlined" onClick={handleAddModalClose}>Cancel</Button>
              </Stack>
            </Stack>
          </form>
      </Box>
    </Modal>
  );
}