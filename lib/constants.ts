import { Address } from 'viem';

export const AURORA_TESTNET_CHAIN_ID = 1313161555;

export const AURORA_PRICE_MONITOR_ADDRESS: Address = '0x7be83c2310622ae6964626bffb4b4c16046d817d';

export const AURORA_PRICE_MONITOR_ABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_oracle',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'diaOracle',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'key',
        type: 'string',
      },
    ],
    name: 'getPrice',
    outputs: [
      {
        internalType: 'uint128',
        name: 'latestPrice',
        type: 'uint128',
      },
      {
        internalType: 'uint128',
        name: 'timestampOfLatestPrice',
        type: 'uint128',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

export const AURORA_PRICE_MONITOR_CONFIG = {
  address: AURORA_PRICE_MONITOR_ADDRESS,
  abi: AURORA_PRICE_MONITOR_ABI,
} as const;