import { ethers } from "ethers";
import React, { useCallback, useEffect, useState } from "react";
import { Account } from "../../models/Account";
import { goerli, sepolia } from "../../models/Chain";
import { Transaction } from "../../models/Transaction";
import { TransactionService } from "../../services/TransactionService";
import { shortenAddress } from "../../utils/AccountUtils";
import TransactionPopupInfo from "../Transaction/TransactionPopupInfo";
import { TransactionTypes } from "../../enums/enums";

type AccountTransactionsProps = {
  account: Account;
};

const AccountTransactions: React.FC<AccountTransactionsProps> = ({
  account,
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const [networkResponse, setNetworkResponse] = useState<{
    status: null | "pending" | "complete" | "error";
    message: string | React.ReactElement;
  }>({
    status: null,
    message: "",
  });
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const getTransactions = useCallback(() => {
    setNetworkResponse({
      status: "pending",
      message: "",
    });
    TransactionService.getTransactions(account.address)
      .then((response) => {
        const transactions = response.data.result.map((transaction: any) => ({
          hash: transaction.transaction_hash,
          from_address: transaction.from_address,
          to_address: transaction.to_address,
          value: transaction.value,
          block_timestamp: transaction.block_timestamp,
          token_symbol: transaction.token_symbol,
        }));
        setTransactions(transactions);
      })
      .catch((error) => {
        console.log({ error });
        setNetworkResponse({
          status: "error",
          message: JSON.stringify(error),
        });
      })
      .finally(() => {
        setNetworkResponse({
          status: "complete",
          message: "",
        });
      });
  }, [account.address]);

  useEffect(() => {
    getTransactions();
  }, [getTransactions]);

  return (
    <div className="AccountTransactions">
      <h2>Transactions</h2>
      <div className="TransactionsMetaData">
        {networkResponse.status === "complete" && transactions.length === 0 && (
          <p>No transactions found for this address</p>
        )}
        <button
          type="button"
          className="btn btn-primary"
          onClick={getTransactions}
          disabled={networkResponse.status === "pending"}
        >
          Refresh Transactions
        </button>
        {/* Show the network response status and message */}
        {networkResponse.status && (
          <>
            {networkResponse.status === "pending" && (
              <p className="text-info">Loading transactions...</p>
            )}
            {networkResponse.status === "error" && (
              <p className="text-danger">
                Error occurred while transferring tokens:{" "}
                {networkResponse.message}
              </p>
            )}
          </>
        )}
      </div>
      <div className="table">
        <table className="table table-striped overflow-auto">
          <thead>
            <tr>
              <th>Hash</th>
              <th>From</th>
              <th>To</th>
              <th>Value</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.hash}>
                <td>
                  <a
                    href={`${sepolia.blockExplorerUrl}/tx/${transaction.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {shortenAddress(transaction.hash)}
                  </a>
                </td>
                <td>
                  <a
                    href={`${sepolia.blockExplorerUrl}/address/${transaction.from_address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {shortenAddress(transaction.from_address)}
                  </a>
                  {transaction.from_address.toLowerCase() ===
                  account.address.toLowerCase() ? (
                    <span className="badge rounded-pill bg-warning">OUT</span>
                  ) : (
                    <span className="badge rounded-pill bg-success">IN</span>
                  )}
                </td>
                <td>
                  <a
                    href={`${sepolia.blockExplorerUrl}/address/${transaction.to_address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {shortenAddress(transaction.to_address)}
                  </a>
                </td>
                <td>
                  {ethers.utils.formatEther(transaction.value)}{" "}
                  {transaction.token_symbol}
                </td>
                <td>
                  {new Date(transaction.block_timestamp).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccountTransactions;
