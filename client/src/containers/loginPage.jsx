import { useState, useEffect } from "react";
import * as React from 'react';
import Axios from 'axios'
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

function LoginPage(){
    const navigate = useNavigate();
    console.log(localStorage.getItem('loggedin'))

    useEffect(()=>{
      if(localStorage.getItem('loggedin') == 'true'){
        navigate('/product');
      }
    })

    

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      console.log({
        email: data.get('email'),
        password: data.get('password'),
      });
    };

    const login = () => {
            if(userName === 'admin' && password === 'admin'){
                localStorage.setItem('loggedin', true);
                navigate('/product');
            }
    }
    

    return(

      <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="userName" 
                onChange={(e)=>{
                  setUserName(e.target.value)
                }}
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password" 
                onChange={(e)=>{
                  setPassword(e.target.value)
                }}
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              
              <Button
                type="submit"
                fullWidth
                onClick = {()=>login()}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
        
    );
}

export default LoginPage;