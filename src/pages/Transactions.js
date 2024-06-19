import { useEffect, useState } from 'react';
import Transaction from '../Components/Transaction';
import Loading from '../Components/Loading';
import { ethers } from 'ethers';
import { abi } from '../Components/ABI';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async (pageNumber) => {
    // try {
    //   const data = await fetch(
    //     `https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${process.env.REACT_APP_FUND_ADDRESS}&startblock=0&endblock=99999999&page=${pageNumber}&offset=10&sort=desc&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`
    //   );
    //   const response = await data.json();
    //   if (response.status !== '1' || response.message !== 'OK') {
    //     throw new Error('Error fetching transaction history from Etherscan');
    //   }
    //   return response.result;
    // } catch (error) {
    //   console.error(error);
    //   setLoading(false);
    //   return [];
    // }

    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
      const contract = new ethers.Contract(contractAddress, abi, provider);

      const pastEvents = await contract.queryFilter(
        'TransactionExecuted',
        0,
        'latest'
      );

      console.log('Tu sam');

      const formattedEvents = pastEvents.map((event) => ({
        tokenId: event.args.tokenId,
        amount: ethers.formatEther(event.args.amount),
        receiver: event.args.receiver,
        description: event.args.description,
        imageBase64: event.args.imageBase64,
        transactionHash: event.transactionHash,
      }));
      console.log(formattedEvents);
      formattedEvents.reverse();
      setTransactions(formattedEvents);
      setLoading(false);
    } else {
      console.error('Ethereum object not found, install Metamask.');
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   const initializeTransactions = async () => {
  //     const initialTransactions = await fetchTransactions(1);
  //     // setTransactions(initialTransactions);
  //     // setTransactions([]);
  //     setLoading(false);
  //   };
  //   initializeTransactions();
  // }, []);

  return (
    <div className='Transactions'>
      {loading ? (
        <Loading />
      ) : transactions.length !== 0 ? (
        <div className='transactions-container'>
          {transactions.map((transaction, index) => (
            <Transaction key={index} transaction={transaction} />
          ))}
        </div>
      ) : (
        <div>
          <img
            className='transactions-logo'
            src='logo.svg'
            alt='logo.svg'
          ></img>
          <h1 className=''>There are no transactions to show</h1>
        </div>
      )}
    </div>
  );
};

export default Transactions;
