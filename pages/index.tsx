import type { NextPage } from "next";
import Image from "next/image";
import Head from "next/head";
import ConnectWallet from "../components/connectWallet/connectWallet";
import Mint from "../components/mint/mint";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Shell poop it nft</title>
        <meta name="description" content="Shell poop it nft " />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <div>
          <h1>Shell pop it NFT 💩</h1>
          <Image src="/nft.gif" alt="gif" width={350} height={350} />
          <Mint />
        </div>
      </div>
      <ConnectWallet />
    </div>
  );
};

export default Home;
