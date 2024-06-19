import { ethers } from "ethers";
import ExternalLink from "./ExternalLink";

const Transaction = ({ transaction }) => {
    return (
        <ExternalLink
            to={`https://sepolia.etherscan.io/tx/${transaction.hash}`}
            className="transaction transaction-link"
        >
            <div className="transaction-hash">
                <p>{transaction.hash}</p>
                <p>
                    <b>ETH:</b> {ethers.formatEther(transaction.value)}
                </p>
            </div>
            <div className="transaction-info">
                <div className="transaction-from-to">
                    <p>
                        <b>FROM:</b> {transaction.from}
                    </p>
                </div>
            </div>
        </ExternalLink>
    );
};
export default Transaction;
