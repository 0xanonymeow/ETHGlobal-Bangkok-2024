import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import {
  AccountAbstractionProvider,
  SafeSmartAccount,
} from "@web3auth/account-abstraction-provider";
import Web3AuthBase from "@web3auth/base";
import Web3Auth, { WEB3AUTH_NETWORK } from "@web3auth/react-native-sdk";
import * as WebBrowser from "expo-web-browser";
import * as SecureStore from "expo-secure-store";

const { CHAIN_NAMESPACES } = Web3AuthBase;

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0xaa36a7",
  rpcTarget: "https://rpc.ankr.com/eth_sepolia",
  displayName: "Ethereum Sepolia Testnet",
  blockExplorerUrl: "https://sepolia.etherscan.io",
  ticker: "ETH",
  tickerName: "Ethereum",
  logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
};

const accountAbstractionProvider = new AccountAbstractionProvider({
  config: {
    chainConfig,
    smartAccountInit: new SafeSmartAccount(),
    bundlerConfig: {
      // Get the pimlico API Key from dashboard.pimlico.io
      url: `https://api.pimlico.io/v2/${chainConfig.chainId}/rpc?apikey=${process.env.PIMLICO_API_KEY}`,
      paymasterContext: {
        token: process.env.PAYMASTER_TOKEN,
      },
    },
    paymasterConfig: {
      // Get the pimlico API Key from dashboard.pimlico.io
      url: `https://api.pimlico.io/v2/${chainConfig.chainId}/rpc?apikey=${process.env.PIMLICO_API_KEY}`,
    },
  },
});

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});

const web3auth = new Web3Auth(WebBrowser, SecureStore, {
  clientId: process.env.CLIENT_ID!,
  redirectUrl: process.env.REDIRECT_URL!,
  network: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET, // or other networks
  privateKeyProvider,
  accountAbstractionProvider: accountAbstractionProvider,
});

export {
  web3auth,
}