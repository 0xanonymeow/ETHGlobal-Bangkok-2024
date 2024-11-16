import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { CHAIN_NAMESPACES, IProvider } from "@web3auth/base";
import { Web3Auth } from "@web3auth/modal";
import { WEB3AUTH_NETWORK } from "@web3auth/base";
import { AuthAdapter } from "@web3auth/auth-adapter";
import {
  AccountAbstractionProvider,
  SafeSmartAccount,
} from "@web3auth/account-abstraction-provider";
import { createPublicClient, createWalletClient, custom, http } from "viem";
import { sepolia } from "viem/chains";

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

const accountAbstractionProvider = new AccountAbstractionProvider({
  config: {
    chainConfig,
    smartAccountInit: new SafeSmartAccount(),
    bundlerConfig: {
      // Get the pimlico API Key from dashboard.pimlico.io
      url: `https://api.pimlico.io/v2/11155111/rpc?apikey=pim_MjKvzAhH5LJcMVu7L3jMtg`,
      paymasterContext: {
        token: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238", // USDC Sepolia
      },
    },
    paymasterConfig: {
      // Get the pimlico API Key from dashboard.pimlico.io
      url: `https://api.pimlico.io/v2/11155111/rpc?apikey=pim_MjKvzAhH5LJcMVu7L3jMtg`,
    },
  },
});

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});

const web3auth = new Web3Auth({
  clientId: "BDpBuszKiVsnQnDzXigZn-1Zd-hr3EaUzx88cWnGppv96S-XEfg20fQw4ELHkn8xHB1ivILglxkOmzsTdGw6AnM", // Get your Client ID from the Web3Auth Dashboard
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  chainConfig,
  privateKeyProvider,
  accountAbstractionProvider,
  useAAWithExternalWallet: false
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
  // const walletClient = createWalletClient({
  //   transport: custom(web3auth.provider as IProvider),
  // });

  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(),
  });

  return {
    web3auth,
    // walletClient,
    publicClient,
  }
}
