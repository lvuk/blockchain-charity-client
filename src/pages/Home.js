import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import CountUp from 'react-countup';
import CurrencyInput from 'react-currency-input-field';
import { Bounce, toast } from 'react-toastify';

const Home = ({ setWalletAddress }) => {
  const [signer, setSigner] = useState(null);
  const [walletAddress, setLocalWalletAddress] = useState(
    localStorage.getItem('walletAddress') || ''
  );
  const [provider, setProvider] = useState(null);
  const fundAddress = process.env.REACT_APP_FUND_ADDRESS;
  const [fundBalance, setFundBalance] = useState(0);
  const [donationAmount, setDonationAmount] = useState(0);

  useEffect(() => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      setProvider(provider);

      if (walletAddress) {
        const reconnectWallet = async () => {
          try {
            await provider.send('eth_requestAccounts', []);
            const signer = await provider.getSigner();
            setSigner(signer);
          } catch (err) {
            console.error(err);
          }
        };
        reconnectWallet();
      }
    } else {
      alert('Please install MetaMask!');
    }
  }, [walletAddress]);

  useEffect(() => {
    const getFundBalance = async () => {
      if (provider) {
        setFundBalance(
          ethers.formatEther(await provider.getBalance(fundAddress))
        );
      }
    };
    getFundBalance();
  }, [provider]);

  const connectWalletHandler = async () => {
    try {
      await provider.send('eth_requestAccounts', []);
      const signer = await provider.getSigner();
      const walletAddress = await signer.getAddress();
      setSigner(signer);
      setWalletAddress(walletAddress);
      setLocalWalletAddress(walletAddress);
      localStorage.setItem('walletAddress', walletAddress);
    } catch (err) {
      console.error(err);
    }
  };

  const disconnectWalletHandler = () => {
    setSigner(null);
    setWalletAddress('');
    setLocalWalletAddress('');
    localStorage.removeItem('walletAddress');
  };

  const sendFundsHandler = async () => {
    if (!signer) return;
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
    <div className='Home'>
      <div className='counter-container'>
        <CountUp className='counter' end={100000} duration={5} />
        <p className='counter'>USDT</p>
      </div>
      <div className='connect-donate'>
        <div>Address: {walletAddress}</div>
        <button
          onClick={
            localStorage.getItem('walletAddress')
              ? disconnectWalletHandler
              : connectWalletHandler
          }
          className={`button ${
            localStorage.getItem('walletAddress')
              ? 'button-disconnect'
              : 'button-connect'
          }`}
        >
          {localStorage.getItem('walletAddress')
            ? 'Disconnect'
            : 'Connect Wallet'}
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
          <button
            onClick={sendFundsHandler}
            disabled={!walletAddress}
            className='button'
          >
            Donate
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
