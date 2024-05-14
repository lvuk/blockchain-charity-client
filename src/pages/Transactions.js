import Navbar from '../Components/Navbar';
import { useState } from 'react';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  return (
    <div className='transactions'>
      <Navbar />
      <div className='transactions-body'></div>
    </div>
  );
};
export default Transactions;
