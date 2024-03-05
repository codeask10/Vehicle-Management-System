import React, { useEffect, useContext, useState } from 'react'
import VehicleItems from '../Components/Items/VehicleItems'
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import VehicleContex from '../Context/Vehicle/VehicleContext';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';
const defaultTheme = createTheme();

const Vehicle = () => {
  const navigate = useNavigate();
  const context = useContext(VehicleContex);
  const [vehicle, setVehicle] = useState({ vehicleNumber: "", dcNumber: "", poNumber: "", checkInDateTime: "", driverName: "", vehicleType: "", deliveryLocation: "", vehicleImage: "", checkOutDateTime: "" })
  const { vehicleDetails, getAllVehicle, createVehicle, updateVehicle } = context;
  useEffect(() => {
    getAllVehicle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (localStorage.getItem('token')) {
      if (!localStorage.getItem('vehicleUpdate')) {
        createVehicle(vehicle);
      }
      else {
        updateVehicle(vehicle);
        localStorage.removeItem('vehicleUpdate');
      }
      setVehicle({ vehicleNumber: "", dcNumber: "", poNumber: "", checkInDateTime: "", driverName: "", vehicleType: "", deliveryLocation: "", vehicleImage: "", checkOutDateTime: "" })
      window.location.reload();
    }
    else {
      navigate('/Login');
    }
  }

  const handleChange = (e) => {
    setVehicle({ ...vehicle, [e.target.name]: e.target.value });
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: "20px",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">Add Vehicle
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="vehicleNumber"
                  required
                  fullWidth
                  id="vehicleNumber"
                  type="text"
                  label="Vehicle Number"
                  value={vehicle.vehicleNumber}
                  onChange={handleChange}
                  inputProps={{
                    pattern: "[A-Z]{2} [0-9]{2} [A-Z]{2} [0-9]{4}",
                    title: "Enter in this format XX 99 YY 9999"
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} >
                <TextField
                  name="driverName"
                  required
                  fullWidth
                  id="driverName"
                  type="text"
                  label="Driver Name"
                  value={vehicle.driverName}
                  onChange={handleChange}
                  inputProps={{
                    pattern: "^(?=.{3-20}$)[A-Za-z]+ [A-Za-z]+$",
                    title: "Enter name length within 20"
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} >
                <TextField
                  name="deliveryLocation"
                  required
                  fullWidth
                  id="deliveryLocation"
                  type="text"
                  label="City Name"
                  value={vehicle.deliveryLocation}
                  onChange={handleChange}
                  inputProps={{
                    pattern: "[A-Za-z]{3-20}",
                    title: "Enter a valid City Name"
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
                  value={vehicle.dcNumber}
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
                  value={vehicle.poNumber}
                  onChange={handleChange}
                  inputProps={{
                    pattern: "PO[0-9]{6}",
                    title: "Enter a valid code like PO123456"
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} >
                <InputLabel id="vehicleType">Vehicle Type</InputLabel>
                <Select
                  labelId="vehicleType"
                  id="vehicleType"
                  name="vehicleType"
                  type='text'
                  value={vehicle.vehicleType}
                  label="Vehicle Type"
                  fullWidth
                  onChange={handleChange}
                >
                  <MenuItem value={"Small"}>Small</MenuItem>
                  <MenuItem value={"Medium"}>Medium</MenuItem>
                  <MenuItem value={"Large"}>Large</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12} sm={6} >
                <InputLabel id="qualityCheck">Quality Check</InputLabel>
                <Select
                  labelId="qualityCheck"
                  id="qualityCheck"
                  name="qualityCheck"
                  type='text'
                  value={vehicle.qualityCheck}
                  label="Quality Check"
                  fullWidth
                  onChange={handleChange}
                >
                  <MenuItem value={"Pending"}>Pending</MenuItem>
                  <MenuItem value={"Approved"}>Approved</MenuItem>
                  <MenuItem value={"Rejected"}>Rejected</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12} sm={6} >
                <TextField
                  name="vehicleImage"
                  required
                  fullWidth
                  id="vehicleImage"
                  type="file"
                  label="Vehicle Image"
                  value={vehicle.vehicleImage}
                  onChange={handleChange}
                  focused
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="checkInDateTime"
                  required
                  fullWidth
                  id="checkInDateTime"
                  type="datetime-local"
                  label="CheckIn Time"
                  value={vehicle.checkInDateTime}
                  onChange={handleChange}
                  focused
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  name="checkOutDateTime"
                  required
                  fullWidth
                  id="checkOutDateTime"
                  type="datetime-local"
                  label="CheckOutTime"
                  value={vehicle.checkOutDateTime}
                  onChange={handleChange}
                  focused
                />
              </Grid>
            </Grid>
            {(!localStorage.getItem('vehicleUpdate')) ? <Button
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
      <Container component="main">
        <div className=" row">
          {vehicleDetails.map((data) => (
            <div className=" col-md-3" key={data._id}>
              <VehicleItems data={data} setVehicle={setVehicle} vehicle={vehicle} />
            </div>
          ))}
        </div>
      </Container>
    </ThemeProvider>

  )
}

export default Vehicle