import {
  CHAIN_NAMESPACES,
  CustomChainConfig,
  WALLET_ADAPTERS,
  WALLET_ADAPTER_TYPE,
  WEB3AUTH_NETWORK
} from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { ModalConfig, Web3Auth } from "@web3auth/modal";
import { WalletServicesPlugin } from "@web3auth/wallet-services-plugin";
import { Web3AuthConnector } from "@web3auth/web3auth-wagmi-connector";
import { Chain } from "wagmi/chains";

export default function Web3AuthConnectorInstance(chains: Chain[]) {
  // Create Web3Auth Instance
  const name = "Restuarant";
  const chainConfig: CustomChainConfig = {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x" + chains[0].id.toString(16),
    rpcTarget: chains[0].rpcUrls.default.http[0], // This is the public RPC we have added, please pass on your own endpoint while creating an app
    displayName: chains[0].name,
    tickerName: chains[0].nativeCurrency?.name,
    ticker: chains[0].nativeCurrency?.symbol,
    blockExplorerUrl: chains[0].blockExplorers?.default.url[0] as string,
    logo: "https://cryptologos.cc/logos/arbitrum-arb-logo.png"
  };

  const privateKeyProvider = new EthereumPrivateKeyProvider({
    config: { chainConfig }
  });

  const web3AuthInstance = new Web3Auth({
    clientId:
      "BDCV6MvobnRBYhG_Pa6GPu5FaKQQyUTYcNX-IHr4NM4Y_n1HwjyR7urx2vzoemIe5Q9SN9aoTvDRLbOdFJllIzE",
    chainConfig,
    privateKeyProvider,
    uiConfig: {
      appName: name,
      loginMethodsOrder: ["email_passwordless", "google", "facebook", "line"],
      defaultLanguage: "en",
      modalZIndex: "2147483647",
      logoLight: "https://web3auth.io/images/web3authlog.png",
      logoDark: "https://web3auth.io/images/web3authlogodark.png",
      uxMode: "redirect",
      mode: "light"
    },
    web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
    enableLogging: true
  });

  const walletServicesPlugin = new WalletServicesPlugin({
    walletInitOptions: {
      whiteLabel: {
        showWidgetButton: true
      }
    }
  });

  web3AuthInstance.addPlugin(walletServicesPlugin);

  const modalConfig: Record<WALLET_ADAPTER_TYPE, ModalConfig> = {
    [WALLET_ADAPTERS.AUTH]: {
      label: "openlogin",
      showOnModal: true,
      loginMethods: {
        reddit: {
          name: "reddit",
          showOnModal: false
        },
        discord: {
          name: "discord",
          showOnModal: false
        },
        twitch: {
          name: "twitch",
          showOnModal: false
        },
        github: {
          name: "twitch",
          showOnModal: false
        },
        apple: {
          name: "apple",
          showOnModal: false
        },
        linkedin: {
          name: "linkedin",
          showOnModal: false
        },
        weibo: {
          name: "weibo",
          showOnModal: false
        },
        farcaster: {
          name: "farcaster",
          showOnModal: false
        },
        kakao: {
          name: "kakao",
          showOnModal: false
        },
        twitter: {
          name: "twitter",
          showOnModal: false
        },
        talk: {
          name: "talk",
          showOnModal: false
        },
        wechat: {
          name: "wechat",
          showOnModal: false
        }
      }
    },
    [WALLET_ADAPTERS.WALLET_CONNECT_V2]: {
      label: "wallet_connect_v2",
      showOnModal: true
    }
  };

  return Web3AuthConnector({
    web3AuthInstance,
    modalConfig
  });
}
