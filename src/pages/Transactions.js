import { ethers } from 'ethers';
import Navbar from '../Components/Navbar';
import { useEffect, useState } from 'react';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const data = await fetch(
        'https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=0xb847D23fBef38DaA5c39eCD7636690B009D9b438&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=UXN5Z6BM8YKX9Y855PQ895UINCPBMXJF77'
        //`https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${process.env.REACT_APP_FUND_ADDRESS}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`
      );

      //`

      // if (data.status !== '1' || data.message !== 'OK') {
      //   throw new Error('Error fetching transaction history from Etherscan');
      // }
      const response = data.json();

      console.log(response);

      // setTransactions(data.result)
    };

    fetchTransactions();
  });

  return (
    <div className='transactions'>
      <Navbar />
      <div className='transactions-body'></div>
    </div>
  );
};
export default Transactions;
