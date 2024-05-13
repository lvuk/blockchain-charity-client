import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import CountUp from 'react-countup';
import Navbar from './Components/Navbar';
import CurrencyInput from 'react-currency-input-field';
import { Bounce, toast } from 'react-toastify';

const Home = () => {
  const [signer, setSigner] = useState(null);
  const [walletAddress, setWalletAddress] = useState('');
  const [provider, setProvider] = useState(null);
  const fundAddress = process.env.REACT_APP_FUND_ADDRESS;
  const [fundBalance, setFundBalance] = useState(0);
  const [donationAmount, setDonationAmount] = useState(0);

  useEffect(() => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      setProvider(provider);
    } else {
      alert('Please install MetaMask!');
    }
  }, []);

  useEffect(() => {
    const getFundBalance = async () => {
      if (provider) {
        setFundBalance(
          ethers.formatEther(await provider.getBalance(fundAddress))
        );
      }
    };
    // getFundBalance();
    // const interval = setInterval(() => {
    //     getFundBalance();
    // }, 10000);

    // return () => clearInterval(interval);
  }, [provider]);

  const connectWalletHandler = async () => {
    try {
      await provider.send('eth_requestAccounts', []);
      const signer = await provider.getSigner();
      const walletAddress = await signer.getAddress();
      setSigner(signer);
      setWalletAddress(walletAddress);
    } catch (err) {
      console.error(err);
    }
  };

  const sendFundsHandler = async () => {
    if (!signer) return;
    console.log(signer);
    // const tx = await signer.sendTransaction({
    //   to: fundAddress,
    //   value: ethers.parseEther(donationAmount),
    // });
    // console.log('Transaction:', tx);
    toast.promise(
      signer.sendTransaction({
        to: fundAddress,
        value: ethers.parseEther(donationAmount),
      }),
      {
        pending: 'Transaction is pending',
        success: 'Transaction success',
        error: 'Transaction rejected',
      },
      {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        transition: Bounce,
      }
    );
  };
  return (
    <div className='App'>
      <Navbar />
      <h1>BiteBack</h1>
      <div>Address: {walletAddress}</div>
      <div className='counter-container'>
        <CountUp className='counter' end={100} duration={5} />
        <p>USDT</p>
      </div>
      <div className='connect-donate'>
        <button onClick={connectWalletHandler}>
          {walletAddress ? 'Connected' : 'Connect Wallet'}
        </button>
        <div className='donate'>
          <CurrencyInput
            id='input-amount'
            name='input-amount'
            prefix='ETH '
            placeholder='ETH 0.5'
            allowDecimals={true}
            decimalsLimit={10}
            className='currency-input'
            disabled={!walletAddress}
            onValueChange={(amount) => {
              setDonationAmount(amount);
            }}
          />
          <button onClick={sendFundsHandler} disabled={!walletAddress}>
            Donate
          </button>
        </div>
      </div>
    </div>
  );
};
export default Home;
