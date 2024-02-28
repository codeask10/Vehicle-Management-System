import React,{useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const defaultTheme = createTheme();


const Dashboard = () => {
  const [checkInForm,setCheckInForm]= useState({vehicleNumber:"",dcNumber:"",poNumber:"",vehicleImageURL:"",date:"",time:""})
  const handleSubmit = () => {
    console.log("Checked In");
  }
  const handleChange=(e)=>{
    setCheckInForm({...checkInForm,[e.target.name]:e.target.value});
  }
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{m:1, bgcolor: 'secondary.main' }}>
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
                    pattern:"[A-Z]{2} [0-9]{2} [A-Z]{2} [0-9]{4}",
                    title:"Enter in this format XX 99 YY 9999"
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
                    pattern:"DC[0-9]{6}",
                    title:"Enter a valid code like DC123456"
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
                    pattern:"PO[0-9]{6}",
                    title:"Enter a valid code like DC123456"
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
              <Grid item xs={12} sm={6}>
                <TextField
                  name="date"
                  required
                  fullWidth
                  id="date"
                  type="date"
                  label="Date"
                  value={checkInForm.date}
                  onChange={handleChange}
                  focused
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  name="time"
                  required
                  fullWidth
                  id="time"
                  type="time"
                  label="Time"
                  value={checkInForm.time}
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
      </Container>
    </ThemeProvider>
  )
}

export default Dashboard