import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import CountUp from "react-countup";

function App() {
    const [signer, setSigner] = useState(null);
    const [walletAddress, setWalletAddress] = useState("");
    const [provider, setProvider] = useState(null);
    const fundAddress = process.env.REACT_APP_FUND_ADDRESS;
    const [fundBalance, setFundBalance] = useState(0);

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
                setFundBalance(
                    ethers.formatEther(await provider.getBalance(fundAddress))
                );
            }
        };
        getFundBalance();
        const interval = setInterval(() => {
            getFundBalance();
        }, 10000);

        return () => clearInterval(interval);
    }, [provider]);

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
        console.log(signer);
        const tx = await signer.sendTransaction({
            to: fundAddress,
            value: ethers.parseEther("0.0001"),
        });
        console.log("Transaction:", tx);
    };

    return (
        <div className="App">
            <h1>BiteBack</h1>
            <img src="logo.png" alt="BiteBack Logo" />
            <button onClick={connectWalletHandler}>
                {walletAddress ? "Connected" : "Connect Wallet"}
            </button>
            <div>Address: {walletAddress}</div>

            <CountUp end={fundBalance} duration={5} />
            <button onClick={sendFundsHandler} disabled={!walletAddress}>
                Donate 0.01 ETH
            </button>
        </div>
    );
}

export default App;
