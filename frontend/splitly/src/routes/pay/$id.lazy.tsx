import { RainbowButton } from "@/components/ui/rainbow-button";
import config from "@/config";
import { SPLITLY_ABI } from "@/data";
import { createLazyFileRoute } from "@tanstack/react-router";
import { getAddress } from "viem";
import { useAccount, useReadContract, useWriteContract } from "wagmi";

export const Route = createLazyFileRoute("/pay/$id")({
  component: PayRoute
});

function PayRoute() {
  const { id } = Route.useParams();
  const { address } = useAccount();
  const { data } = useReadContract({
    address: getAddress(config.SPLITLY_ADDRESS!),
    abi: SPLITLY_ABI,
    functionName: "getBillDetail",
    args: [BigInt(id)]
  });

  const total = !data?.length
    ? 0
    : data
        .filter((item) => item.owner === address)
        .reduce((acc, item) => acc + Number(item.cost), 0);

  const navigate = Route.useNavigate();
  const { writeContractAsync } = useWriteContract({
    mutation: {
      onSuccess: async () => {
        navigate({ to: "/" });
      }
    }
  });

  const pay = async () => {
    await writeContractAsync({
      abi: SPLITLY_ABI,
      address: getAddress(config.SPLITLY_ADDRESS!),
      functionName: "pay",
      args: [
        BigInt(id),
        getAddress("0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d")
      ] // usdc address in arb-sep
    });
  };

  return (
    <div className="container mx-auto flex flex-col items-center justify-center h-[60vh]">
      <RainbowButton onClick={pay}>Pay {total}</RainbowButton>
    </div>
  );
}
