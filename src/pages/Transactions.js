import { useEffect, useState } from 'react';
import Transaction from '../Components/Transaction';
import Loading from '../Components/Loading';
import InfiniteScroll from 'react-infinite-scroll-component';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchTransactions = async (pageNumber) => {
    try {
      const data = await fetch(
        `https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${process.env.REACT_APP_FUND_ADDRESS}&startblock=0&endblock=99999999&page=${pageNumber}&offset=10&sort=desc&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`
      );
      const response = await data.json();
      if (response.status !== '1' || response.message !== 'OK') {
        throw new Error('Error fetching transaction history from Etherscan');
      }
      return response.result;
    } catch (error) {
      console.error(error);
      setLoading(false);
      return [];
    }
  };

  const loadMoreTransactions = async () => {
    const newPage = page + 1;
    const newTransactions = await fetchTransactions(newPage);
    setTransactions((prevTransactions) => [
      ...prevTransactions,
      ...newTransactions,
    ]);
    setPage(newPage);
    if (newTransactions.length === 0) {
      setHasMore(false);
    }
  };

  useEffect(() => {
    const initializeTransactions = async () => {
      const initialTransactions = await fetchTransactions(1);
      setTransactions(initialTransactions);
      setLoading(false);
    };
    initializeTransactions();
  }, []);

  return (
    <div className='Transactions'>
      {loading ? (
        <Loading />
      ) : (
        <InfiniteScroll
          dataLength={transactions.length}
          next={loadMoreTransactions}
          hasMore={hasMore}
          loader={
            <div className='infinite-scroll-component__loader'>
              <Loading />
            </div>
          }
          endMessage={<p>No more transactions</p>}
          className='infinite-scroll-component'
        >
          {transactions.map((transaction, index) => (
            <Transaction key={index} transaction={transaction} />
          ))}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default Transactions;
