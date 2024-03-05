import React, { useMemo, useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MaterialReactTable } from "material-react-table";
import { useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
const PODetails = ({ vendorData, productDetails }) => {
  const [qualityCheck, setQualityCheck] = useState("");
  
  const navigate = useNavigate();
  const theme = useMemo(
    () => createTheme({
      palette: {
        mode: "dark"
      }
    }),
  )
  const columns = useMemo(
    () => [
      {
        accessorKey: 'poNumber', //access nested data with dot notation
        header: 'P.O Number',
        size: 8,
      },
      {

        accessorKey: 'productName',
        header: 'Product Name',
        size: 30,
      },
      {

        accessorKey: 'quantity', //normal accessorKey

        header: 'Quntity',
        size: 10,
      },
      {

        accessorKey: 'category',
        header: 'Category',
        size: 30,
      },
      {

        accessorKey: 'price',
        header: 'Price',
        size: 20,
      },
    ], []
  );
  const handleClick = async () => {
    const id = localStorage.getItem('vehicleID');
    if(qualityCheck.length>0){
    const response = await fetch(`http://localhost:5002/api/Query/vehicle/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ qualityCheck: qualityCheck })
    });
    setQualityCheck("");
    localStorage.setItem("checkOut", true);
  }
  else{
    alert("Select the option for Quality Check");
  }
  }
  const handleClickCheckOut = async () => {
    const id = localStorage.getItem('vehicleID');
    const checkoutDateTime = new Date();
    console.log(checkoutDateTime.toISOString());
    const response = await fetch(`http://localhost:5002/api/Query/vehicle/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ checkOutDateTime: checkoutDateTime })
    });
    localStorage.removeItem('checkOut');
    localStorage.removeItem('checkIn');
    localStorage.removeItem('vehicleID');
    localStorage.removeItem('poNumber');
    window.location.reload();
  }
  const handleChange = (e) => {
    setQualityCheck(e.target.value);
  }
  return (
    <>
      {(vendorData) && (
        <div>
          <div className='column'>
            <h2 className='mb-2'>Vendor Details</h2>
          </div>
          <div >
            <p><strong>Vendor Name:</strong> {vendorData.vendorName}</p>
            <p><strong>Company Name:</strong> {vendorData.companyName}</p>
            <p><strong>Phone:</strong> {vendorData.phone}</p>
            <p><strong>Email:</strong> {vendorData.email}</p>
            <p><strong>DC Number:</strong> {vendorData.dcNumber}</p>
            <p><strong>Address:</strong> {vendorData.address}</p>
          </div>
          <div className="product-details">
            <h2>Product Details</h2>
            <MaterialReactTable columns={columns} data={productDetails} />
          </div>
        </div>)
      }
      <Box
        sx={{
          marginTop: 8,
        }}
      >
        {(!localStorage.getItem('checkOut')) ? <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Select
              labelId="qualityCheck"
              id="qualityCheck"
              name="qualityCheck"
              type='text'
              value={qualityCheck}
              fullWidth
              onChange={handleChange}
            >
              <MenuItem value={"Pending"}>Pending</MenuItem>
              <MenuItem value={"Approved"}>Approved</MenuItem>
              <MenuItem value={"Rejected"}>Rejected</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button sx={{ mt: 1 }} variant="contained" onClick={handleClick}>QualityCheck</Button>
          </Grid>
        </Grid> :
          <Grid item xs={12} sm={6}>
            <Button sx={{ mt: 1 }} variant="contained" onClick={handleClickCheckOut}>Check Out</Button>
          </Grid>
        }
      </Box>
    </>
  )
}

export default PODetails