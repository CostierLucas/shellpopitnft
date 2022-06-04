import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { EthersProvider } from "../context/ethersProviderContext";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <EthersProvider>
      <Component {...pageProps} />
    </EthersProvider>
  );
}

export default MyApp;
