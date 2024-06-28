import { TransactionTypes } from "../enums/enums";

export interface Transaction {
    hash: string,
    from_address: string,
    to_address: string,
    value: string,
    block_timestamp: string,
    token_symbol: string,
    transaction_type: TransactionTypes,
    transaction_fee: string
};