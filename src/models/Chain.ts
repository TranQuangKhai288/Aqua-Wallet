export type Chain = {
    chainId: string;
    name: string;
    blockExplorerUrl: string;
    rpcUrl: string;
  };
  
export const goerli: Chain = {
    chainId: '5',
    name: 'Goerli',
    blockExplorerUrl: 'https://goerli.etherscan.io',
    rpcUrl: 'https://eth-goerli.public.blastapi.io',
};

export const mainnet: Chain = {
    chainId: '1',
    name: 'Ethereum',
    blockExplorerUrl: 'https://etherscan.io',
    rpcUrl: 'https://mainnet.infura.io/v3/7dc9aeac40764e8ab3fab10309ef7600',
};

export const sepolia: Chain = {
    chainId: '10',
    name: 'Sepolia',
    blockExplorerUrl: 'https://sepolia.etherscan.io',
    rpcUrl: 'https://sepolia.infura.io/v3/7dc9aeac40764e8ab3fab10309ef7600',
}

export const CHAINS_CONFIG = {
    [goerli.chainId]: goerli,
    [mainnet.chainId]: mainnet,
    [sepolia.chainId]: sepolia,
};