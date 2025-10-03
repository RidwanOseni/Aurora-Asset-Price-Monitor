"use client";

import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi';
import { Button } from '@/components/ui/button';
import { shortenAddress } from '@/lib/utils';
import { LogOut } from 'lucide-react';

interface AccountProps {
  onDisconnect: () => void;
}

export function Account({ onDisconnect }: AccountProps) {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName ?? undefined });

  if (!address) return null;

  return (
    <div className="flex items-center space-x-2 p-2 border rounded-md">
      {ensAvatar && (
        <img alt="ENS Avatar" src={ensAvatar} className="w-6 h-6 rounded-full" />
      )}
      <p className="text-sm font-medium">
        {ensName ? `${ensName} (${shortenAddress(address)})` : shortenAddress(address)}
      </p>
      <Button
        onClick={() => {
          disconnect();
          onDisconnect();
        }}
        variant="ghost"
        size="sm"
        className="text-red-500 hover:bg-red-50 p-1 h-auto"
      >
        <LogOut className="w-4 h-4" />
      </Button>
    </div>
  );
}