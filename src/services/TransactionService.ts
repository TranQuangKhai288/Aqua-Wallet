import axios from 'axios';
import { goerli, sepolia } from '../models/Chain';
import { ethers } from 'ethers';

export class TransactionService {

  static API_URL =  'https://deep-index.moralis.io/api/v2.2';
  static API_KEY =  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6Ijk1MGRiZTlhLWE1ODQtNDc2Yi1iN2U1LTRiMzg3OTA5NGRjYSIsIm9yZ0lkIjoiMzk3ODEzIiwidXNlcklkIjoiNDA4NzY1IiwidHlwZUlkIjoiYTgzYzM4MDAtMDRkNi00OTJlLTg1OWQtMzVjYjU3NjJmMzkwIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MTkzNDE2MTgsImV4cCI6NDg3NTEwMTYxOH0.8sX-8GOpMnp4NSfqnhf6A8pvZn69MLVxb3hBgThN4a8';

  static async getTransactions(address: string) {
    const options = {
        method: 'GET',
        url: `${TransactionService.API_URL}/${address}/erc20/transfers`,
        params: {chain: sepolia.name.toLowerCase(), order: "DESC"},
        headers: {accept: 'application/json', 'X-API-Key': TransactionService.API_KEY}
      };

    const response = await axios.request(options);
    console.log(response);
    
    return response;
  }
}