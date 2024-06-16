import { useEffect, useState } from "react";
import Transaction from "../Components/Transaction";
import Pagination from "rc-pagination";
import { ethers } from "ethers";
import Loading from "../Components/Loading";

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const data = await fetch(
                    //'https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=0xb847D23fBef38DaA5c39eCD7636690B009D9b438&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=UXN5Z6BM8YKX9Y855PQ895UINCPBMXJF77'
                    `https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${process.env.REACT_APP_FUND_ADDRESS}&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`
                );
                const response = await data.json();
                if (response.status !== "1" || response.message !== "OK") {
                    throw new Error(
                        "Error fetching transaction history from Etherscan"
                    );
                }
                setTransactions(response.result);
                setLoading(false); // Set loading state to false after fetching transactions
            } catch (error) {
                console.error(error);
                setLoading(false); // Set loading state to false in case of error
            }
        };
        fetchTransactions();
    }, []);

    return (
        <div className="Transactions">
            {loading ? (
                <Loading /> // Render the LoadingComponent while loading is true
            ) : (
                transactions.map((transaction) => {
                    return (
                        <>
                            <Transaction transaction={transaction} />
                        </>
                    );
                })
            )}
        </div>
    );
};

export default Transactions;
