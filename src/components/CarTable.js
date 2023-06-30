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

export default function CarTable() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    axios.get("https://myfakeapi.com/api/cars/")
      .then(response => {
        setCars(response.data.cars);
      })
      .catch(error => {
        console.error("Error fetching cars: ", error);
      });
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Company</TableCell>
              <TableCell align="right">Model</TableCell>
              <TableCell align="right">VIN</TableCell>
              <TableCell align="right">Color</TableCell>
              <TableCell align="right">Year</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Availability</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {cars.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">{row.car}</TableCell>
                <TableCell align="right">{row.car_model}</TableCell>
                <TableCell align="right">{row.car_vin}</TableCell>
                <TableCell align="right">{row.car_color}</TableCell>
                <TableCell align="right">{row.car_model_year}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">{row.availability}</TableCell>
                <TableCell align="right">Edit Delete</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination count={10} />
    </>
  )
}