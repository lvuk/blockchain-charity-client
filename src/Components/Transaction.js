import ExternalLink from './ExternalLink';

const Transaction = ({ transaction }) => {
  return (
    <ExternalLink
      to={`https://sepolia.etherscan.io/tx/${transaction.transactionHash}`}
      className='transaction transaction-link'
    >
      <div className='transaction-container'>
        <div className='transaction-info'>
          <p>{transaction.transactionHash}</p>
          <p>
            <b>ETH:</b> {transaction.amount}
          </p>
          {transaction.receiver === process.env.REACT_APP_FUND_ADDRESS && (
            <p>
              <b>TO:</b> {transaction.receiver}
            </p>
          )}
          <p>
            <b>DESCRIPTION: </b>
            {transaction.description}
          </p>
        </div>
        <div className='transaction-photo'>
          <div className='transaction-from-to'>
            <img
              src={transaction.imageBase64}
              alt=''
              className='transaction-image'
            />
          </div>
        </div>
      </div>
    </ExternalLink>
  );
};
export default Transaction;
