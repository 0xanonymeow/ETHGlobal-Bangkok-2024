import { RainbowButton } from "@/components/ui/rainbow-button";
import { CommonLayout } from "@/layout";
import { useDatafeedLatestRound } from "@/lib/chainlink";
import Web3AuthConnectorInstance from "@/lib/web3auth";
import { conversionRateStore } from "@/store";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { arbitrumSepolia } from "viem/chains";
import { useAccount, useConnect } from "wagmi";

export const Route = createRootRoute({
  component: Root
});

function Root() {
  const { isConnected } = useAccount();
  const { connect } = useConnect();
  const setConversionRate = useSetRecoilState(conversionRateStore);
  const { data, isSuccess } = useDatafeedLatestRound("usdc_usd");

  const handleConnect = () => {
    connect({ connector: Web3AuthConnectorInstance([arbitrumSepolia]) });
  };

  useEffect(() => {
    if (!isSuccess) return;
    if (!data.length || data.length != 5) return;
    const quote = data[1];
    setConversionRate(Number(quote));
  }, [isSuccess]);

  if (!isConnected)
    return (
      <div className="h-screen container mx-auto flex items-center justify-center">
        <RainbowButton onClick={handleConnect}>🔐 Login</RainbowButton>
      </div>
    );

  return (
    <CommonLayout>
      <Outlet />
    </CommonLayout>
  );
}
