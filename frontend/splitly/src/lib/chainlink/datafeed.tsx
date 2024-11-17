import { useReadContract } from "wagmi";
import { AGGREGATOR_V3_INTERFACE_ABI } from "./abi";
import { Address, getAddress } from "viem";
import { arbitrum } from "wagmi/chains";
import { createConfig, http } from "wagmi";

export type DatafeedTicker = "usdc_usd" | "usdt_usd";

const USDT_USD_ADDRESS = getAddress(
  "0x3f3f5dF88dC9F13eac63DF89EC16ef6e7E25DdE7"
);

const USDC_USD_ADDRESS = getAddress(
  "0x50834F3163758fcC1Df9973b6e91f0F0F0434aD3"
);

export const useDatafeedLatestRound = (ticker: DatafeedTicker) => {
  let addr: Address;
  switch (ticker) {
    case "usdc_usd":
      addr = USDC_USD_ADDRESS;
      break;
    case "usdt_usd":
      addr = USDT_USD_ADDRESS;
      break;
    default:
      throw Error("ticker not found!");
  }

  const config = createConfig({
    chains: [arbitrum],
    transports: {
      [arbitrum.id]: http()
    }
  });

  const { data, ...props } = useReadContract({
    config: config,
    abi: AGGREGATOR_V3_INTERFACE_ABI,
    address: addr,
    functionName: "latestRoundData"
  });

  return { data: data as bigint[], ...props };
};
