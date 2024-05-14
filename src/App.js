import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ethers } from 'ethers';
import CountUp from 'react-countup';
import Navbar from './Components/Navbar';
import Home from './pages/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Transactions from './pages/Transactions';

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/transactions' element={<Transactions />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
