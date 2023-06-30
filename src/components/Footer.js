import React from "react";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function Footer() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', m: 3 }}>
      <Typography variant="p" sx={{ textAlign: 'center' }}>
        © Ivan Adamchuk 2023
      </Typography>
    </Box>
  )
}