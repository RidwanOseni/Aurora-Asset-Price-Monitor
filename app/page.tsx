import { ConnectWallet } from "@/components/ConnectWallet";
import { PriceMonitor } from "@/components/price-monitor";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8 lg:p-24">
      {/* 1. Header/Wallet Status (Top Right) */}
      <div className="z-10 w-full max-w-5xl items-center justify-end font-mono text-sm lg:flex mb-12">
        <ConnectWallet />
      </div>

      {/* 2. Main Functionality (Center) */}
      <div className="flex flex-col items-center justify-center space-y-8 w-full max-w-xl">
        <h1 className="text-4xl font-bold">Aurora Asset Price Monitor</h1>
        <p className="text-lg text-gray-500">Query DIA Oracle prices on Aurora Testnet.</p>
        
        <PriceMonitor />
      </div>

      {/* 3. Footer/Context */}
      <footer className="mt-auto w-full max-w-5xl pt-12 text-center text-xs text-gray-500">
        Operation confirmed on the Aurora chain.
      </footer>
    </main>
  );
}