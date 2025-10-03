"use client";

import React, { useState } from 'react';
import { useReadContract } from 'wagmi';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from "lucide-react";
import {
  AURORA_PRICE_MONITOR_CONFIG,
  AURORA_TESTNET_CHAIN_ID,
} from '@/lib/constants';

// Prices are denominated in a fix comma format with 5 decimals [3, 4].
const DECIMAL_DIVISOR = 100000;

export function PriceMonitor() {
  // State for user input
  const [assetSymbol, setAssetSymbol] = useState('');
  // State for contract query (triggered on button click)
  const [keyToQuery, setKeyToQuery] = useState('');

  // Use useReadContract to call the getPrice function on the wrapper contract [3, 5].
  const { data, isError, isLoading, isFetched } = useReadContract({
    ...AURORA_PRICE_MONITOR_CONFIG,
    functionName: 'getPrice',
    args: [keyToQuery],
    chainId: AURORA_TESTNET_CHAIN_ID,
    query: {
      // Only run the query if keyToQuery is set
      enabled: !!keyToQuery,
    },
  });

  const handleFetchPrice = () => {
    // The query string is case-sensitive [4].
    setKeyToQuery(assetSymbol.trim());
  };

  // Destructure the returned tuple [5, 6]
  const [latestPrice, timestampOfLatestPrice] = (data as [bigint, bigint] | undefined) || [undefined, undefined];

  // Format the price (divide by 100000) [3, 5].
  const formattedPrice = latestPrice
    ? (Number(latestPrice) / DECIMAL_DIVISOR).toFixed(5)
    : null;

  // Convert Unix timestamp (seconds) to UTC date string [7]
  const formattedTimestamp = timestampOfLatestPrice
    ? new Date(Number(timestampOfLatestPrice) * 1000).toUTCString()
    : null;

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-6 h-6 text-primary" />
          <CardTitle className="text-2xl font-bold">Real-Time Asset Prices</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Monitor cryptocurrency prices directly from the Aurora blockchain
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Input Card */}
        <div className="space-y-3 p-4 border rounded-md">
          <label htmlFor="asset-input" className="font-semibold block">
            Asset Symbol
          </label>
          <Input
            id="asset-input"
            type="text"
            placeholder="Enter asset symbol (e.g., BTC, ETH, AURORA)"
            value={assetSymbol}
            onChange={(e) => setAssetSymbol(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleFetchPrice()}
            className="h-12 text-base bg-background"
          />
          <Button
            onClick={handleFetchPrice}
            disabled={isLoading || !assetSymbol.trim()}
            className="w-full h-12 text-base font-semibold"
            size="lg"
          >
            {isLoading ? (
              'Fetching Price...'
            ) : (
              'Fetch Price on Aurora'
            )}
          </Button>
        </div>

        {/* Results Card */}
        {isError && (
          <p className="text-red-500 font-medium p-4 border border-red-200 bg-red-50 rounded-md">
            Error fetching price. Ensure you are on the Aurora Testnet and the asset symbol is correct (case-sensitive).
          </p>
        )}

        {isFetched && keyToQuery && !isError && (
          <div className="space-y-4 p-4 border rounded-md bg-secondary/10">
            <h3 className="text-lg font-semibold border-b pb-2">Live Data</h3>
            {formattedPrice && formattedTimestamp ? (
              <div className="space-y-2">
                <p>
                  <strong className="w-32 inline-block">Asset:</strong> {keyToQuery}
                </p>
                <p className="text-xl font-bold text-green-600">
                  <strong className="w-32 inline-block font-normal text-gray-700">Price (USD):</strong> ${formattedPrice}
                </p>
                <p className="text-sm text-gray-500">
                  <strong className="w-32 inline-block text-gray-700">Last Updated:</strong> {formattedTimestamp} (UTC)
                </p>
              </div>
            ) : (
              <p className="text-gray-500">No data found for the requested asset symbol.</p>
            )}
          </div>
        )}

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground pt-2">
          All queries are executed on the Aurora blockchain network
        </p>
      </CardContent>
    </Card>
  );
}