import { http, createConfig } from 'wagmi';
import { mainnet, base } from 'wagmi/chains';
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors';
import { defineChain } from 'viem';

/**
 * Aurora Testnet chain configuration
 */
export const auroraTestnetChain = defineChain({
  id: 1313161555,
  name: 'Aurora Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['https://testnet.aurora.dev/'],
      webSocket: ['wss://testnet.aurora.dev/'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Aurora Explorer',
      url: 'https://explorer.testnet.aurora.dev/',
    },
  },
});

/**
 * Get WalletConnect project ID from environment variables
 * Fallback to demo project ID for development
 */
const getProjectId = (): string => {
  const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;
  
  if (!projectId) {
    console.warn(
      'NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID not found in environment variables. ' +
      'Using demo project ID. For production, please set your own Project ID.'
    );
    return '1b27e888c828d3b95aab1d14123e47a8';
  }
  
  return projectId;
};

/**
 * Main Wagmi configuration
 */
export const wagmiConfig = createConfig({
  chains: [auroraTestnetChain, mainnet, base],
  connectors: [
    injected(),
    walletConnect({ projectId: getProjectId() }),
    metaMask(),
    safe(),
  ],
  transports: {
    [auroraTestnetChain.id]: http(),
    [mainnet.id]: http(),
    [base.id]: http(),
  },
});