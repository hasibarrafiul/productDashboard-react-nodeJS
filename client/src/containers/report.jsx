import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories) {
  return { name, calories };
}


function Report() {

  

  const navigate = useNavigate();
  if(localStorage.getItem('loggedin') !== 'true'){
    navigate('/');
  }

    const [soldProducts, setSoldProducts] = useState([])

    useEffect(()=> {
      if(localStorage.getItem('loggedin') !== 'true'){
        navigate('/');
      }
        fetch('http://localhost:3001/api/report/')
        .then((resp) => resp.json())
        .then((resp) => setSoldProducts(resp))
        .catch((error) => console.log(error));
      }, []);

      soldProducts.sort(function(x,y){return y["soldProductQuantity"]-x["soldProductQuantity"]});

    return(
      
      <TableContainer component={Paper}>
        <h1>TOP FIVE PRODUCTS BASED ON TOTAL SELL</h1>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><h2>Product</h2></TableCell>
            <TableCell align="right"> <h2>Total Sold</h2></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {soldProducts.slice(0, 5).map((val) => (
            <TableRow
              key={val.productName}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {val.productName}
              </TableCell>
              <TableCell align="right">{val.soldProductQuantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    )

}

export default Report;