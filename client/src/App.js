import React, { useState, useEffect } from "react";
import './App.css';
import Axios from 'axios'
import apiService from "./containers/apiService";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProductDashboard from "./containers/productDashboard";
import LoginPage from "./containers/loginPage";
import ProductSell from "./containers/productSale";
import Report from "./containers/report";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/product" element={<ProductDashboard />} />
        <Route path="/productsell" element={<ProductSell />} />
        <Route path="/report" element={<Report />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
