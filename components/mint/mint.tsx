import React from "react";
import { ethers } from "ethers";
import useEthersProvider from "../../hooks/useEthersProvider";
import Contract from "../../contracts/Shell.json";
import { ToastContainer, toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";
import styles from "./mint.module.scss";

const Mint: React.FC = () => {
  const [isMintLoading, setMintIsLoading] = React.useState<boolean>(false);
  const [count, setCounter] = React.useState<number>(1);
  const { account, provider } = useEthersProvider();
  const contractAddress: string = "0x5b4B42d78C96C55171F6bCaF2886bb43676170bb";

  const mint = async () => {
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, Contract.abi, signer);

    try {
      let transaction = await contract.publicMint(account, count);
      setMintIsLoading(true);
      await transaction.wait();
      setMintIsLoading(false);
      toast.success("Congratulations ! You have minted your NFT !");
    } catch (e) {
      toast.error("Oops... an error occured");
      setMintIsLoading(false);
    }
  };

  const addOne = () => {
    if (count < 10) {
      setCounter(count + 1);
    }
  };

  const removeOne = () => {
    if (count > 1) {
      setCounter(count - 1);
    }
  };

  return (
    <div className={styles.mint}>
      <ToastContainer position="top-left" />
      <div>
        <div className={styles.mintCount}>
          <button onClick={() => removeOne()}>-</button>
          <div>{count}</div>
          <button onClick={() => addOne()}>+</button>
        </div>
      </div>
      <div className={styles.btn}>
        {account ? (
          <>
            <button onClick={() => mint()}>
              {isMintLoading ? <TailSpin width={20} color="#000" /> : "Mint"}
            </button>
            <p style={{ marginTop: "10px" }}>10 NFTs per wallet</p>
          </>
        ) : (
          "Connect first"
        )}
      </div>
    </div>
  );
};

export default Mint;
