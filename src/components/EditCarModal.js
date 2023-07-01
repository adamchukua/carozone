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

export default function EditCarModal() {
  const { editModalOpen, editedCar, handleEditModalClose, handleCarChange, handleEditCarSubmit } = useCarContext();

  return (
    <Modal
      open={editModalOpen}
      onClose={handleEditModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Edit {editedCar.car} {editedCar.car_model}
        </Typography>

        <form onSubmit={handleEditCarSubmit}>
            <Stack spacing={2}>
              <TextField
                name="company"
                label="Company"
                value={editedCar.car}
                onChange={handleCarChange}
                disabled
              />
              <TextField
                name="model"
                label="Model"
                value={editedCar.car_model}
                onChange={handleCarChange}
                disabled
              />
              <TextField
                name="VIN"
                label="VIN"
                value={editedCar.car_vin}
                onChange={handleCarChange}
                disabled
              />
              <TextField
                name="year"
                label="Year"
                value={editedCar.car_model_year}
                onChange={handleCarChange}
                disabled
              />
              <TextField
                name="car_color"
                label="Color"
                value={editedCar.car_color}
                onChange={handleCarChange}
              />
              <TextField
                name="price"
                label="Price"
                value={editedCar.price}
                onChange={handleCarChange}
              />
              <FormControl fullWidth>
                <InputLabel>Availability</InputLabel>
                <Select
                  name="availability"
                  onChange={handleCarChange}
                  label="Availability"
                  defaultValue={editedCar.availability ? 1 : 0}
                >
                  <MenuItem value={1}>In Stock</MenuItem>
                  <MenuItem value={0}>Out of Stock</MenuItem>
                </Select>
              </FormControl>
              <Stack direction="row" spacing={2}>
                <Button type="submit" variant="contained">Save</Button>
                <Button type="button" variant="outlined" onClick={handleEditModalClose}>Cancel</Button>
              </Stack>
            </Stack>
          </form>
      </Box>
    </Modal>
  );
}