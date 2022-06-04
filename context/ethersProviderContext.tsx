import React, { useEffect, useState } from "react";
import { hasMetamask } from "../utils/hasMetamask";
import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum: any;
  }
}

interface AppContextInterface {
  account: string;
  provider: any;
  setAccount(): void;
}

const EthersContext = React.createContext<AppContextInterface | any>(null);

export const EthersProvider = ({ children }: { children: React.ReactNode }) => {
  const [account, setAccount] = React.useState<string | null>(null);
  const [provider, setProvider] = React.useState<any>(null);

  useEffect(() => {
    if (hasMetamask()) {
      window.ethereum.on("chainChanged", () => {
        setAccount(null);
        setProvider(new ethers.providers.Web3Provider(window.ethereum));
      });
      window.ethereum.on("disconnect", () => {
        setAccount(null);
        setProvider(new ethers.providers.Web3Provider(window.ethereum));
      });
      window.ethereum.on("accountsChanged", () => {
        setAccount(null);
        setProvider(new ethers.providers.Web3Provider(window.ethereum));
      });
    }
  });

  useEffect(() => {
    if (hasMetamask()) {
      setProvider(new ethers.providers.Web3Provider(window.ethereum));
    }
  }, []);

  return (
    <EthersContext.Provider value={{ account, provider, setAccount }}>
      {children}
    </EthersContext.Provider>
  );
};

export default EthersContext;
