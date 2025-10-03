"use client";

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { Button } from '@/components/ui/button';
import { Dialog as DialogRoot, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Account } from '@/components/wallet/Account';
import { WalletOptions } from '@/components/wallet/WalletOptions';

export function ConnectWallet() {
  const { isConnected } = useAccount();
  const [isOpen, setIsOpen] = useState(false);

  if (isConnected) {
    return <Account onDisconnect={() => setIsOpen(false)} />;
  }

  const DRoot = DialogRoot as unknown as React.ComponentType<{
    open: boolean;
    onOpenChange: (open: boolean) => void;
    children?: React.ReactNode;
  }>;

  const DTrigger = DialogTrigger as unknown as React.ComponentType<{
    asChild?: boolean;
    children?: React.ReactNode;
  }>;

  const DContent = DialogContent as unknown as React.ComponentType<{
    className?: string;
    showCloseButton?: boolean;
    children?: React.ReactNode;
  }>;

  const DHeader = DialogHeader as unknown as React.ComponentType<{
    children?: React.ReactNode;
  }>;

  const DTitle = DialogTitle as unknown as React.ComponentType<{
    children?: React.ReactNode;
  }>;

  return (
    <DRoot open={isOpen} onOpenChange={setIsOpen}>
      <DTrigger asChild>
        <Button variant="outline">Connect Wallet</Button>
      </DTrigger>
      <DContent className="sm:max-w-[425px]" showCloseButton>
        <DHeader>
          <DTitle>Connect Wallet</DTitle>
        </DHeader>
        <WalletOptions />
      </DContent>
    </DRoot>
  );
}