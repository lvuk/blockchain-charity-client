import { ethers } from 'ethers';
import { Link } from 'react-router-dom';
import ExternalLink from './ExternalLink';

const Transaction = ({ transaction }) => {
  return (
    <ExternalLink
      to={`https://sepolia.etherscan.io/tx/${transaction.hash}`}
      className='transaction link'
    >
      <div className='transaction-hash'>
        <p>{transaction.hash}</p>
        <p>
          <b>ETH:</b> {ethers.formatEther(transaction.value)}
        </p>
      </div>
      <div className='transaction-info'>
        <div className='transaction-from-to'>
          <p>
            <b>FROM:</b> {transaction.from}
          </p>
        </div>
      </div>
    </ExternalLink>
  );
};
export default Transaction;

// 0x0bb6556953d613d96025d091850ed0aa746ee9f819e09bf7956e88287d8a2d15
