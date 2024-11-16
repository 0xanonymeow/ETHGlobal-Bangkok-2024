import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { Web3Auth } from "@web3auth/modal";
import { WEB3AUTH_NETWORK } from "@web3auth/base";
import { AuthAdapter } from "@web3auth/auth-adapter";

export default function useWeb3Auth() {

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0xaa36a7",
  rpcTarget: "https://rpc.ankr.com/eth_sepolia",
  // Avoid using public rpcTarget in production.
  // Use services like Infura, Quicknode etc
  displayName: "Sepolia",
  blockExplorerUrl: "https://sepolia.etherscan.io",
  ticker: "ETH",
  tickerName: "Ethereum",
  logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
};

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});

const web3auth = new Web3Auth({
  clientId: "BDpBuszKiVsnQnDzXigZn-1Zd-hr3EaUzx88cWnGppv96S-XEfg20fQw4ELHkn8xHB1ivILglxkOmzsTdGw6AnM", // Get your Client ID from the Web3Auth Dashboard
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  chainConfig,
  privateKeyProvider,
});

const authAdapter = new AuthAdapter({
  adapterSettings: {
    uxMode: "redirect",
    loginConfig: {
      discord: {
        verifier: "ethglobal-bangkok-2024-discord", // Pass the Verifier name here
        typeOfLogin: "discord", // Pass on the login provider of the verifier you've created
        clientId: "1307355960746053642", // Pass on the Discord `Client ID` here
      },
    },
    },
  });

  web3auth.configureAdapter(authAdapter);

  return {
    web3auth,
  }
}
