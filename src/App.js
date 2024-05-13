import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ethers } from 'ethers';
import CountUp from 'react-countup';
import Navbar from './Components/Navbar';
import Home from './Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route exact path='/' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
