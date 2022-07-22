import { useState, useEffect } from "react";
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import apiService from "./apiService";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



function SellProduct(){

    const navigate = useNavigate();
    const [productList, setProductList] = useState([])
    const [selectedProductList, setSelectedProductList] = useState([])
    const [selectedItemID, setSelectedItem] = useState([]);

    const [itemToSend, setItemToSend] = useState('')

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };


    useEffect(()=> {
        if(localStorage.getItem('loggedin') !== 'true'){
          navigate('/');
        }
        fetch('http://localhost:3001/api/get/')
        .then((resp) => resp.json())
        .then((resp) => setProductList(resp))
        .catch((error) => console.log(error));
      }, []);

      const [selects, setselects] = useState();
      if(!isNaN(selects)){
        selectedItemID.push(parseInt(selects))
        
      }
      
      const unique = [...new Set(selectedItemID)];
      
      selectedItemID.length =0;
      selectedItemID.push.apply(selectedItemID, unique);

      console.log(selectedItemID)

      const remove = (id) => {
        
        const index = selectedItemID.indexOf(id);
        console.log(index)
        if(index !=0){
          const b = selectedItemID[0];
          selectedItemID[0] = selectedItemID[index];
          selectedItemID[index] = b; 
        }
        selectedItemID.shift()
        console.log(selectedItemID)
        setSelectedProductList([])
      }

      const sell = () => {
        selectedItemID.map((val)=>{
          console.log(val)
          apiService.postSold({val}).then(()=>{
    
        });
        })
        handleClickOpen()
        setSelectedItem([])
      }

      
      
    return(
        <div className="App">
          <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-filled-label">Select Item</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={selects}
          onChange={e=>setselects(e.target.value)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {productList.map((result)=>(<MenuItem value={result.id}>{result.productName}</MenuItem>))}
        </Select>
      </FormControl>
          <h1>Selected Item</h1>
            <table class="center">
          {productList.map((val)=>{
              if(selectedItemID.includes(val.id)){
              return <div>
                <tr>
                  <td>
                    {val.productName} Price: {val.productPrice} 
                  </td>
                  <td>
                    <Button color="inherit" variant="outlined" onClick = {()=>{remove(val.id)}}>Remove</Button>
                  </td>
                     </tr>
              </div>
            }
      })}
      </table>
        

          <br></br> <br></br>
          <Button variant="outlined" onClick = {()=>{sell()}}>Sell</Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Item Sold
          </DialogContentText>
        </DialogContent>
        
      </Dialog>
        </div>
    );
}
export default SellProduct;