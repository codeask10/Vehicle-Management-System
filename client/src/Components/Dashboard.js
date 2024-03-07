import React, { useState, useContext, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import img from '../Images/rsz_1desktop1.jpg';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PODetails from './PODetails';
import VehicleContex from '../Context/Vehicle/VehicleContext';
import CheckInContext from '../Context/CheckIn/CheckInContext';
import {toast } from 'react-toastify';

const defaultTheme = createTheme();
const Dashboard = () => {
  const navigate = useNavigate();
  const context = useContext(VehicleContex);
  const queryContext = useContext(CheckInContext);
  const { createVehicle } = context;
  const { getQuery,vendorData,productDetails } = queryContext;
  const myStyle = {
    background: `url(${img})`,
    backgroundSize: "100% 420px",
    backgroundPosition: "top",
    backgroundRepeat: 'no-repeat',
    height: "55vh",
    display: 'flex',
  }
  const [checkInForm, setCheckInForm] = useState({ vehicleNumber: "", dcNumber: "", poNumber: "", vehicleImageURL: "", checkInDateTime: "" })
  useEffect(()=>{
    if(localStorage.getItem('poNumber')){
      const poNumber=localStorage.getItem('poNumber')+"";
      getQuery(poNumber)
    }
  },[]);
  useEffect(()=>{

  },[]);
  // localStorage.removeItem('checkIn');
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (localStorage.getItem('token')) {
      localStorage.setItem('checkIn', true);
      createVehicle(checkInForm);
      getQuery(checkInForm.poNumber);
      setCheckInForm({ vehicleNumber: "", dcNumber: "", poNumber: "", vehicleImageURL: "", checkInDateTime: "" });
      localStorage.setItem('poNumber',checkInForm.poNumber)
      toast.success("successfully submitted");
    }
    else {
      toast.warn("Please log in to access this feature.");
      navigate('/Login');
    }
  }
  const handleChange = (e) => {
    setCheckInForm({ ...checkInForm, [e.target.name]: e.target.value });
  }
  return (
    <div style={myStyle}>
      <ThemeProvider theme={defaultTheme}>
        {(!localStorage.getItem('checkIn')) ? <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: "425px",
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <FactCheckIcon />
            </Avatar>
            <Typography component="h1" variant="h5">Check In
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} >
                  <TextField
                    name="vehicleNumber"
                    required
                    fullWidth
                    id="vehicleNumber"
                    type="text"
                    label="Vehicle Number"
                    value={checkInForm.vehicleNumber}
                    onChange={handleChange}
                    inputProps={{
                      pattern: "[A-Z]{2} [0-9]{2} [A-Z]{2} [0-9]{4}",
                      title: "Enter in this format XX 99 YY 9999"
                    }}
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
                    value={checkInForm.dcNumber}
                    onChange={handleChange}
                    inputProps={{
                      pattern: "DC[0-9]{6}",
                      title: "Enter a valid code like DC123456"
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="poNumber"
                    required
                    fullWidth
                    id="poNumber"
                    type="text"
                    label="P.O Number"
                    value={checkInForm.poNumber}
                    onChange={handleChange}
                    inputProps={{
                      pattern: "PO[0-9]{6}",
                      title: "Enter a valid code like DC123456"
                    }}
                  />
                </Grid>
                <Grid item xs={12} >
                  <TextField
                    name="vehicleImageURL"
                    required
                    fullWidth
                    id="vehicleImageURL"
                    type="file"
                    label="Vehicle Image"
                    value={checkInForm.vehicleImageURL}
                    onChange={handleChange}
                    focused
                  />
                </Grid>
                <Grid item xs={12} >
                  <TextField
                    name="checkInDateTime"
                    required
                    fullWidth
                    id="checkInDateTime"
                    type="datetime-local"
                    label="checkIn Date & Time"
                    value={checkInForm.checkInDateTime}
                    onChange={handleChange}
                    focused
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                submit
              </Button>
            </Box>
          </Box>
        </Container> :
          <Container component="main" maxWidth="lg">
            <Box sx={{
              marginTop: "425px",
              display: 'flex',
              flexDirection: 'column'
            }}>
           <PODetails vendorData ={vendorData} productDetails={productDetails} />
            </Box>
          </Container>
        }
      </ThemeProvider>
    </div >
  )
}

export default Dashboard