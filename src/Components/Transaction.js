import { ethers } from 'ethers';
import ExternalLink from './ExternalLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';

const Transaction = ({ transaction }) => {
  return (
    <ExternalLink
      to={`https://sepolia.etherscan.io/tx/${transaction.hash}`}
      className='transaction transaction-link'
    >
      <div className='transaction-hash'>
        <p>{transaction.hash}</p>
        <p>
          <b>ETH:</b> {ethers.formatEther(transaction.value)}
          {transaction.from !== process.env.REACT_APP_FUND_ADDRESS ? (
            <FontAwesomeIcon icon={faArrowDown} className='arrow-icon green' />
          ) : (
            <FontAwesomeIcon icon={faArrowUp} className='arrow-icon red' />
          )}
        </p>
      </div>
      <div className='transaction-info'>
        <div className='transaction-from-to'>
          {transaction.from !== process.env.REACT_APP_FUND_ADDRESS ? (
            <p>
              <b>FROM:</b> {transaction.from}
            </p>
          ) : (
            <p>
              <b>TO:</b> {transaction.to}
            </p>
          )}
        </div>
      </div>
    </ExternalLink>
  );
};
export default Transaction;
