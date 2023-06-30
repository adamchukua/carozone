import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
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

export default function DeleteCarModal() {
  const { deleteModalOpen, deletedCar, handleDeleteModalClose } = useCarContext();

  return (
    <Modal
      open={deleteModalOpen}
      onClose={handleDeleteModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Do you really want to delete {deletedCar.car} {deletedCar.car_model} (VIM: {deletedCar.car_vin})?
        </Typography>

        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            This action cannot be undone!
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button type="submit" variant="contained">Delete</Button>
          <Button type="button" variant="outlined" onClick={handleDeleteModalClose}>Cancel</Button>
        </Stack>
      </Box>
    </Modal>
  );
}
