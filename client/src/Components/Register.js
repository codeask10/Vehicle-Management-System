import React,{useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Link} from 'react-router-dom';
const defaultTheme = createTheme();


const Register = () => {
  const [user, setUser]=useState({firstName:"",lastName:"",email:"",password:"",confirmPassword:""});
   const handleSubmit=(e)=>{
     e.preventDefault();
     if(user.password===user.confirmPassword){
      console.log(user);
     }
     else{
      alert("Does not match password");
     }
     

   }
   const handleChange=(e)=>{
    setUser({...user,[e.target.name]:e.target.value});
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  type="text"
                  label="First Name"
                  value={user.firstName}
                  onChange={handleChange}
                  inputProps={{
                    pattern:"^[A-Z][a-zA-Z]{2,15}$",
                    title:"start with a capital letter, 2-15 letters." 
                  }}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  type="text"
                  name="lastName"
                  value={user.lastName}
                  onChange={handleChange}
                  inputProps={{
                    pattern:"^[A-Z][a-zA-Z]{2,15}$",
                    title:"start with a capital letter, 2-15 letters." 
                  }}
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  type="email"
                  value={user.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={user.password}
                  onChange={handleChange}
                  inputProps={{
                    pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9!#%]).{8,}$",
                    title:"Enter 1 lowercase, 1 uppercase, 1 digit/symbol,& minimum 8 characters."
                  }}
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  value={user.confirmPassword}
                  onChange={handleChange}
                  inputProps={{
                    pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9!#%]).{8,}$",
                    title:"Enter 1 lowercase, 1 uppercase, 1 digit/symbol,& minimum 8 characters."
                  }}
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/Login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default Register