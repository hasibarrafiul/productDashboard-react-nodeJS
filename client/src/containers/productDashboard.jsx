
import './App.css';
import React, { useState, useEffect } from "react";
import Axios from 'axios'
import apiService from "./apiService";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
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


function ProductDashboard() {

  const navigate = useNavigate();
  

  const [productName, setProductName] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [productList, setProductList] = useState([])
  const [newPrice, setNewPrice] = useState('')
  const [newName, setNewName] = useState('')

  

  useEffect(()=> {
    if(localStorage.getItem('loggedin') !== 'true'){
      navigate('/');
    }
    fetch('http://localhost:3001/api/get/')
    .then((resp) => resp.json())
    .then((resp) => setProductList(resp))
    .catch((error) => console.log(error));
  }, [productList]);

  //console.log(localStorage.getItem('loggedin'))



  const submitProduct = () => {
    apiService.postProducts({productName, productPrice}).then(response=>setProductList([...productList, response]))
     .then(()=>{
      alert("successfull inserted");
     });
  };

  const deleteProduct = (product) =>{
    Axios.delete(`http://localhost:3001/api/delete/${product}`);
  }

  const logout = () => {
    localStorage.removeItem('loggedin')
  }

  const sellPage = () => {
    navigate('/productsell');
  }

  const reportPage = () => {
    navigate('/report');
  }

  const updateProduct = (product) =>{
    Axios.put("http://localhost:3001/api/update/", {
      id: product,
      productName: newName,
      productPrice: newPrice,
    });
    setNewName("")
    setNewPrice("")
  };

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Button color="inherit" variant="outlined" onClick = {()=>{sellPage()}}>Product Sell</Button> &nbsp;&nbsp;&nbsp;
          <Button color="inherit" variant="outlined" onClick = {()=>{reportPage()}}>Report</Button>
          </Typography>
          <Button color="inherit" variant="outlined" onClick = {()=>{logout()}}>Logout</Button> <br></br> <br></br>
        </Toolbar>
      </AppBar>
    </Box>
    <br></br> <br></br>
      
      Add Products <br></br> <br></br>
      <div className='form'> 
      <TextField id="outlined-basic" label="Product Name" variant="outlined" type="text" name="productName" onChange={(e)=>{
        setProductName(e.target.value)
      }}/> <br></br>
      <TextField id="outlined-basic" label="Price" variant="outlined" type="number" name="productPrice" onChange={(e)=>{
        setProductPrice(e.target.value)
      }}/>
      <br></br>
      
      <Button variant="outlined" onClick = {()=>submitProduct()}>Submit</Button>
      <br></br>

      Selected Products
      <table class="centerTable" >
      
      {productList.map((val)=>{
        return <div>
          <tr>
            <td>
            <h1>{val.productName}</h1>
          <p>Price: {val.productPrice}</p>
            </td>
            
          <td>
          
          <TextField label="Update Name" variant="filled" id="filled-basic" type="text" onChange={(e)=> {
            setNewName(e.target.value)
          }}/> <br></br>
          <TextField label="Update Price" variant="filled" id="filled-basic" type="number" onChange={(e)=> {
            setNewPrice(e.target.value)
          }}/>
          <br></br>
          <br></br>
          <Button variant="outlined" onClick = {()=>{updateProduct(val.id)}}>Update Product</Button>
          </td>
          <td>
          <Button variant="outlined" onClick = {()=>{deleteProduct(val.id)}}>Delete</Button> <br></br>
          </td>

          
          </tr>
          </div>
      })}
      </table>
      </div>
    </div>
  );
}

export default ProductDashboard;
