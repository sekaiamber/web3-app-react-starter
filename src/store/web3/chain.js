export const chainId = 56;
export const rpcUrls = [
  'https://bsc-dataseed1.ninicoin.io',
  'https://bsc-dataseed1.defibit.io',
  'https://nodes.pancakeswap.com/',
];

export default {
  chainId: '0x' + (chainId).toString(16),
  chainName: 'Binance Smart Chain Mainnet',
  nativeCurrency: {
    name: 'BNB',
    symbol: 'bnb',
    decimals: 18,
  },
  rpcUrls,
  blockExplorerUrls: ['https://bscscan.com/'],
};
