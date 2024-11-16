import { CommonLayout } from "@/layout";
import { useDatafeedLatestRound } from "@/lib/chainlink";
import { conversionRateStore } from "@/store";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

export const Route = createRootRoute({
  component: Root
});

function Root() {
  const setConversionRate = useSetRecoilState(conversionRateStore);
  const { data, isSuccess } = useDatafeedLatestRound("usdc_usd");

  useEffect(() => {
    if (!isSuccess) return;
    if (!data.length || data.length != 5) return;
    const quote = data[1];
    setConversionRate(Number(quote));
  }, [isSuccess]);

  return (
    <CommonLayout>
      <Outlet />
    </CommonLayout>
  );
}
