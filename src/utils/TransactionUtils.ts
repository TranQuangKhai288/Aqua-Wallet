import { ethers, Wallet } from 'ethers';
import { CHAINS_CONFIG, goerli, sepolia } from '../models/Chain';
import erc20abi from '../erc20ABI.json';

export async function sendTBT(
  amount: number,
  from: string,
  to: string,
  privateKey: string,
) {

  const chain = CHAINS_CONFIG[sepolia.chainId];

  // Create a provider using the Infura RPC URL for Sepolia
  const provider = new ethers.providers.JsonRpcProvider(chain.rpcUrl);

  // Create a wallet instance from the sender's private key
  const wallet: Wallet = new ethers.Wallet(privateKey, provider);

  // Create a contract instance for the ERC-20 token
  const tokenContract = new ethers.Contract("0x1354772F995F193A437669C0de370766af98676b", erc20abi, wallet);

  // Call the transfer function of the ERC-20 token
  const transaction = await tokenContract.transfer(to, ethers.utils.parseUnits(amount.toString(), 18));

  // Wait for the transaction to be mined
  const receipt = await transaction.wait();

  return {transaction, receipt};
}
