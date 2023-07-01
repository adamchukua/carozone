import React, { useEffect, useState } from "react";
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
import EditCarModal from "./EditCarModal";
import DeleteCarModal from "./DeleteCarModal";
import CheckCircle from '@mui/icons-material/CheckCircle';
import RemoveCircle from '@mui/icons-material/RemoveCircle';
import { useCarContext } from "./CarContext";
import { Button, Typography } from "@mui/material";
import AddCarModal from "./AddCarModal";

export const CARS_PER_PAGE = 10;

export default function CarTable() {
  const { handleEditModalOpen, setEditedCar, handleDeleteModalOpen, handleAddModalOpen, setDeletedCar, cars } = useCarContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setTotalPages(Math.ceil(cars.length / CARS_PER_PAGE));
  }, [cars]);

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

  return (
    <>
      <Stack spacing={2} direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography>Founded cars: {cars.length}</Typography>
        <Button onClick={() => handleAddModalOpen()} variant="contained">Add car</Button>
      </Stack>

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
              <TableCell width={80}>Actions</TableCell>
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
                <TableCell>{row.availability ? <CheckCircle/> : <RemoveCircle/>}</TableCell>
                <TableCell>
                  <FormControl fullWidth>
                    <InputLabel>Action</InputLabel>
                    
                    <Select
                      value={row.id}
                      label="Action"
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

      <EditCarModal />
      <DeleteCarModal />
      <AddCarModal />
    </>
  )
}