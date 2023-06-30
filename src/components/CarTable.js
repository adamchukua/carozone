import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const CARS_PER_PAGE = 10;

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

export default function CarTable() {
  const [cars, setCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);

  const [editedCar, setEditedCar] = useState({});
  const [deletedCar, setDeletedCar] = useState({});

  useEffect(() => {
    axios.get("https://myfakeapi.com/api/cars/")
      .then(response => {
        setCars(response.data.cars);
        setTotalPages(Math.ceil(response.data.cars.length / CARS_PER_PAGE));
      })
      .catch(error => {
        console.error("Error fetching cars: ", error);
      });
  }, []);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleActionSelect = (event, id) => {
    const action = event.target.value;
    const car = cars.filter(car => car.id === id)[0];
    
    switch (action) {
      case "edit":
        handleEditModalOpen();
        setEditedCar(car);
        break;
      case "delete":
        handleDeleteModalOpen();
        setDeletedCar(car);
        break;
    }
  };

  const handleEditModalOpen = () => setEditModalOpen(true);
  const handleEditModalClose = () => setEditModalOpen(false);
  const handleDeleteModalOpen = () => setDeleteModalOpen(true);
  const handleDeleteModalClose = () => setDeleteModalOpen(false);

  const handleCarChange = (event) => {
    const { name, value } = event.target;
    setEditedCar((prevCar) => ({
      ...prevCar,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Company</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>VIN</TableCell>
              <TableCell>Color</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Availability</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cars.slice((currentPage - 1) * CARS_PER_PAGE, currentPage * CARS_PER_PAGE).map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">{row.car}</TableCell>
                <TableCell>{row.car_model}</TableCell>
                <TableCell>{row.car_vin}</TableCell>
                <TableCell>{row.car_color}</TableCell>
                <TableCell>{row.car_model_year}</TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>{row.availability}</TableCell>
                <TableCell>
                  <FormControl fullWidth>
                    <InputLabel>Action</InputLabel>
                    
                    <Select
                      value={row.id}
                      label="Action"
                      defaultValue=""
                      onChange={(event) => handleActionSelect(event, row.id)}
                    >
                      <MenuItem value="edit">Edit</MenuItem>
                      <MenuItem value="delete">Delete</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack spacing={2} direction="row" justifyContent="center" sx={{ mt: 2 }}>
        <Pagination 
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
        />
      </Stack>

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

          <form onSubmit={handleSubmit}>
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
                name="color"
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
              <TextField
                name="availability"
                label="Availability"
                value={editedCar.availability}
                onChange={handleCarChange}
              />
              <Stack direction="row" spacing={2}>
                <Button type="submit" variant="contained">Save</Button>
                <Button type="button" variant="outlined" onClick={handleEditModalClose}>Cancel</Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Modal>

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
    </>
  )
}