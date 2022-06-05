import React from "react";
import Image from "next/image";
import useEthersProvider from "../../hooks/useEthersProvider";
import { hasMetamask } from "../../utils/hasMetamask";
import { ethers } from "ethers";
import { TailSpin } from "react-loader-spinner";
import { toast } from "react-toastify";
import styles from "./connectWallet.module.scss";

const ConnectWallet: React.FC = () => {
  const { account, setAccount, provider } = useEthersProvider();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const connectWallet = async () => {
    if (!hasMetamask()) {
      toast.error("Install metamask please");
    } else {
      setIsLoading(true);
      if (provider) {
        const network = await provider.getNetwork();
        const resultAccount = await provider.send("eth_requestAccounts", []);
        setAccount(ethers.utils.getAddress(resultAccount[0]));
        setIsLoading(false);
        // if (network.chainId === 1) {
        //   const resultAccount = await provider.send("eth_requestAccounts", []);
        //   setAccount(ethers.utils.getAddress(resultAccount[0]));
        //   setIsLoading(false);
        // } else {
        //   setAccount(null);
        //   setIsLoading(false);
        //   toast.error("Please switch to main Ethereum Network on Metamask");
        // }
      }
    }
  };

  return (
    <div className={styles.connect}>
      <button onClick={() => connectWallet()}>
        <Image
          src="/metamask-logo.svg"
          height={30}
          width={30}
          alt="Metamask logo"
        />
        {isLoading ? (
          <TailSpin width={40} color="#fff" ariaLabel="loading-indicator" />
        ) : account ? (
          account.substring(0, 6) +
          "..." +
          account.substring(account.length - 4, account.length)
        ) : (
          "Connect wallet"
        )}
      </button>
    </div>
  );
};

export default ConnectWallet;
