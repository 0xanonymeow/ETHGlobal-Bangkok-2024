import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import "./index.css";
import { QueryClient } from "@tanstack/react-query";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import {
  WagmiProvider,
  createConfig,
  http,
  deserialize,
  serialize
} from "wagmi";
import Web3AuthConnectorInstance from "@/lib/web3auth";
import { RecoilRoot } from "recoil";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { arbitrumSepolia } from "wagmi/chains";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1_000 * 60 * 60 * 4 // 4 hours
    }
  }
});

const persister = createSyncStoragePersister({
  serialize,
  storage: window.localStorage,
  deserialize
});

const config = createConfig({
  chains: [arbitrumSepolia],
  transports: {
    [arbitrumSepolia.id]: http()
  },
  connectors: [Web3AuthConnectorInstance([arbitrumSepolia])]
});

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      <WagmiProvider config={config}>
        <RecoilRoot>
          <RouterProvider router={router} />
        </RecoilRoot>
      </WagmiProvider>
    </PersistQueryClientProvider>
  );
}
