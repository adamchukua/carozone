import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
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
  const { addModalOpen, handleAddModalClose, handleAddCarSubmit, handleCarAdd } = useCarContext();

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
                name="car"
                label="Company"
                onChange={handleCarAdd}
                required
              />
              <TextField
                name="car_model"
                label="Model"
                onChange={handleCarAdd}
                required
              />
              <TextField
                name="car_vin"
                label="VIN"
                onChange={handleCarAdd}
                required
              />
              <TextField
                name="car_model_year"
                label="Year"
                onChange={handleCarAdd}
                required
              />
              <TextField
                name="car_color"
                label="Color"
                onChange={handleCarAdd}
                required
              />
              <TextField
                name="price"
                label="Price"
                onChange={handleCarAdd}
                required
              />
              <FormControl fullWidth>
                <InputLabel>Availability</InputLabel>
                <Select
                  name="availability"
                  label="Availability"
                  onChange={handleCarAdd}
                  required
                >
                  <MenuItem value={1}>In Stock</MenuItem>
                  <MenuItem value={0}>Out of Stock</MenuItem>
                </Select>
              </FormControl>
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