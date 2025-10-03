"use client";

import { QueryClient } from '@tanstack/react-query';
import { WagmiProvider, serialize, deserialize } from 'wagmi';
import { wagmiConfig } from '@/lib/wagmiConfig';
import React from 'react';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1_000 * 60 * 60 * 24,
    },
  },
});

const persister = createSyncStoragePersister({
  storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  serialize,
  deserialize,
});

export function WagmiProviders({ children }: { children: React.ReactNode }) {
  const WagmiProviderAny = WagmiProvider as unknown as React.ComponentType<{ config: typeof wagmiConfig; children?: React.ReactNode }>;
  
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      <WagmiProviderAny config={wagmiConfig}>
        {children}
      </WagmiProviderAny>
    </PersistQueryClientProvider>
  );
}