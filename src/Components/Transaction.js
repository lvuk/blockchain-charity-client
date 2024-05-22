import { ethers } from 'ethers';

const Transaction = ({ transaction }) => {
  return (
    <div className='transaction'>
      <div className='transaction-hash'>{transaction.hash}</div>
      <div className='transaction-info'>
        <div className='transaction-from-to'>
          <p>
            <b>FROM:</b> {transaction.from}
          </p>
          <p>
            <b>TO:</b> {transaction.to}
          </p>
        </div>
        <p>
          <b>ETH:</b> {ethers.formatEther(transaction.value)}
        </p>
      </div>
    </div>
  );
};
export default Transaction;
