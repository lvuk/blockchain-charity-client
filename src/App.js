import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './pages/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Transactions from './pages/Transactions';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import ProtectedRoute from './Components/ProtectedRoute';

const App = () => {
  const [walletAddress, setWalletAddress] = useState(
    localStorage.getItem('walletAddress') || ''
  );
  const requiredAddress = process.env.REACT_APP_FUND_ADDRESS;

  return (
    <BrowserRouter>
      <Navbar walletAddress={walletAddress} requiredAddress={requiredAddress} />
      <ToastContainer />
      <Routes>
        <Route
          exact
          path='/'
          element={<Home setWalletAddress={setWalletAddress} />}
        />
        <Route exact path='/transactions' element={<Transactions />} />
        <Route exact path='/contact' element={<Contact />} />
        {localStorage.getItem('walletAddress') ===
          process.env.REACT_APP_FUND_ADDRESS && (
          <Route
            exact
            path='/admin'
            element={
              <ProtectedRoute
                component={Admin}
                walletAddress={walletAddress}
                requiredAddress={requiredAddress}
              />
            }
          />
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
