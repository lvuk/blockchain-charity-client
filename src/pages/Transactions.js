import { ethers } from 'ethers';
import Navbar from '../Components/Navbar';
import { useEffect, useState } from 'react';
import Transaction from '../Components/Transaction';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const data = await fetch(
        //'https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=0xb847D23fBef38DaA5c39eCD7636690B009D9b438&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=UXN5Z6BM8YKX9Y855PQ895UINCPBMXJF77'
        `https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${process.env.REACT_APP_FUND_ADDRESS}&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`
      );

      const response = await data.json();

      if (response.status !== '1' || response.message !== 'OK') {
        throw new Error('Error fetching transaction history from Etherscan');
      }

      console.log(response.result);
      setTransactions(response.result);
    };

    fetchTransactions();
  }, []);

  return (
    <div className='transactions'>
      <Navbar />
      <div className='transactions-body'>
        {transactions.map((transaction) => {
          return <Transaction transaction={transaction} />;
        })}
      </div>
    </div>
  );
};
export default Transactions;
