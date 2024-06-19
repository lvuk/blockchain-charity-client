import React, { useEffect, useState, useReducer } from "react";
import { ethers } from "ethers";
import CountUp from "react-countup";
import CurrencyInput from "react-currency-input-field";
import { Bounce, toast } from "react-toastify";

const initialState = {
    fundBalance: 0,
    lastFundBalance: 0,
    decimals: 5,
};

function reducer(state, action) {
    switch (action.type) {
        case "SET_BALANCE":
            return {
                ...state,
                lastFundBalance: state.fundBalance,
                fundBalance: parseFloat(action.balance),
                decimals: Math.max(
                    5 -
                        action.balance.toString().split(".")[0].replace("-", "")
                            .length,
                    0
                ),
            };
        default:
            return state;
    }
}

const Home = () => {
    const [signer, setSigner] = useState(null);
    const [walletAddress, setWalletAddress] = useState("");
    const [provider, setProvider] = useState(null);
    const fundAddress = process.env.REACT_APP_FUND_ADDRESS;
    const [donationAmount, setDonationAmount] = useState(0);
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        if (window.ethereum) {
            const provider = new ethers.BrowserProvider(window.ethereum);
            setProvider(provider);
        } else {
            alert("Please install MetaMask!");
        }
    }, []);

    useEffect(() => {
        const getFundBalance = async () => {
            if (provider) {
                const balance = ethers.formatEther(
                    await provider.getBalance(fundAddress)
                );
                dispatch({ type: "SET_BALANCE", balance });
            }
        };
        getFundBalance();
        const interval = setInterval(() => {
            getFundBalance();
        }, 10000);
        return () => clearInterval(interval);
    }, [provider, fundAddress]);

    const connectWalletHandler = async () => {
        try {
            await provider.send("eth_requestAccounts", []);
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
                pending: "Transaction is pending",
                success: "Transaction success",
                error: "Transaction rejected",
            },
            {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                pauseOnFocusLoss: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            }
        );
    };
    return (
        <div className="Home">
            {/* <h1>BiteBack</h1> */}
            {/* <img src='logo-text-nobg.png' alt='' className='heading' /> */}
            <img className="home-logo" src="logo.svg" alt="logo.svg"></img>
            <div className="counter-container">
                <CountUp
                    key={state.fundBalance}
                    className="counter"
                    start={state.lastFundBalance}
                    end={state.fundBalance}
                    duration={1}
                    decimals={state.decimals}
                />
                {/* <img src='logo.svg' alt='' className='home-logo' /> */}
                <p className="counter">ETH</p>
            </div>
            <div className="connect-donate">
                <div>Address: {walletAddress}</div>

                <button onClick={connectWalletHandler}>
                    {walletAddress ? "Connected" : "Connect Wallet"}
                </button>
                <div className="donate">
                    <CurrencyInput
                        id="input-amount"
                        name="input-amount"
                        prefix="ETH "
                        placeholder="ETH 0.5"
                        allowDecimals={true}
                        decimalsLimit={10}
                        className="currency-input"
                        disabled={!walletAddress}
                        onValueChange={(amount) => {
                            setDonationAmount(amount);
                        }}
                    />
                    <button
                        onClick={sendFundsHandler}
                        disabled={!walletAddress}
                    >
                        Donate
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Home;
