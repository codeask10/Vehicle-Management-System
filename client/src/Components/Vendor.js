import React, { useEffect, useContext, useState } from 'react';
import VendorItems from './Items/VendorItems';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import VendorContex from '../Context/Vendor/VendorContext';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import {toast } from 'react-toastify';

const defaultTheme = createTheme();

const Vendor = () => {
  const navigate = useNavigate();
  const context = useContext(VendorContex);
  const [vendor, setVendor] = useState({ id: "", vendorName: "", companyName: "", phone: "", email: "", dcNumber: "", address: "" });
  const { vendorDetails, getAllVendor, createVendor, updateVendor } = context;
  useEffect(() => {
    getAllVendor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (localStorage.getItem('token')) {
      if (!localStorage.getItem('update')) {
        createVendor(vendor);
      } else {
        updateVendor(vendor);
        localStorage.removeItem('update');
      }
      setVendor({ id: "", vendorName: "", companyName: "", phone: "", email: "", dcNumber: "", address: "" });
    }
    else{
      toast.warn("Please log in to access this feature.");
      navigate('/Login');
    }
  }
  const handleChange = (e) => {
    console.log(e.target.value);
    setVendor({ ...vendor, [e.target.name]: e.target.value });
  }
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main">
        <CssBaseline />
        <Box
          sx={{
            marginTop: "20px",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">Add Vendor
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="vendorName"
                  required
                  fullWidth
                  id="vendorName"
                  type="text"
                  label="Vendor Name"
                  value={vendor.vendorName}
                  onChange={handleChange}
                  inputProps={{
                    pattern: "^(?=.{3-20}$)[A-Za-z]+ [A-Za-z]+$",
                    title: "Enter  name length within 20"
                  }}

                />
              </Grid>
              <Grid item xs={12} sm={6} >
                <TextField
                  name="companyName"
                  required
                  fullWidth
                  id="companyName"
                  type="text"
                  label="Company Name"
                  value={vendor.companyName}
                  onChange={handleChange}
                  inputProps={{
                    pattern: "^(?=.{3-40}$)[A-Za-z]+ [A-Za-z]+$",
                    title: "Enter company name length within 40"
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} >
                <TextField
                  name="id"
                  required
                  fullWidth
                  id="id"
                  type="number"
                  label="ID"
                  value={vendor.id}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} >
                <TextField
                  name="dcNumber"
                  required
                  fullWidth
                  id="dcNumber"
                  type="text"
                  label="D.C Number"
                  value={vendor.dcNumber}
                  onChange={handleChange}
                  inputProps={{
                    pattern: "DC[0-9]{6}",
                    title: "Enter a valid code like DC123456"
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="phone"
                  required
                  fullWidth
                  id="phone"
                  type="tel"
                  label="Phone Number"
                  value={vendor.phone}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} >
                <TextField
                  name="email"
                  required
                  fullWidth
                  id="email"
                  type="email"
                  label="Email"
                  value={vendor.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  name="address"
                  required
                  fullWidth
                  id="address"
                  type="text"
                  label="Address"
                  value={vendor.address}
                  onChange={handleChange}
                  inputProps={{
                    pattern: "^(?=.{3-70}$)[A-Za-z0-9]+ [A-Za-z0-9]+$",
                    title: "Enter company name length within 40"
                  }}
                />
              </Grid>

            </Grid>
            {(!localStorage.getItem('update')) ? <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ marginLeft: "30%", mt: 1, mb: 2, width: "40%" }}
            >
              submit
            </Button> : <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ marginLeft: "30%", mt: 1, mb: 2, width: "40%" }}
            >
              update
            </Button>}
          </Box>
        </Box>
      </Container>
      <Container>
        <div className="row">
          {vendorDetails.map((data) => (
            <div className=" col-md-3" key={data._id}>
              <VendorItems data={data} setVendor={setVendor} />
            </div>
          ))}
        </div>
      </Container>
    </ThemeProvider >
  )
}

export default Vendor