import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import config from "@/config";
import { SPLITLY_ABI } from "@/data";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { getAddress, zeroAddress } from "viem";
import { useReadContract, useWriteContract } from "wagmi";

export const Route = createLazyFileRoute("/detail/$id")({
  component: DetailRoute
});

function DetailRoute() {
  const { id } = Route.useParams();
  const navigate = Route.useNavigate();
  const [menuIndices, setMenuIndices] = useState<number[]>([]);

  const { data } = useReadContract({
    address: getAddress(config.SPLITLY_ADDRESS!),
    abi: SPLITLY_ABI,
    functionName: "getBillDetail",
    args: [BigInt(id)]
  });

  const { writeContractAsync } = useWriteContract({
    mutation: {
      onSuccess: async () => {
        navigate({ to: "/pay/$id", params: { id } });
      }
    }
  });

  const confirmPayment = async () => {
    await writeContractAsync({
      abi: SPLITLY_ABI,
      address: getAddress(config.SPLITLY_ADDRESS!),
      functionName: "selectMenu",
      args: [BigInt(id), menuIndices.map(BigInt)]
    });
  };

  return (
    <div className="container mx-auto my-12">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No.</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Cost</TableHead>
            <TableHead>Taker</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((item, key) => (
            <TableRow key={key}>
              <TableCell>{key + 1}</TableCell>
              <TableCell>{item.owner}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.cost.toString()}</TableCell>
              <TableCell>
                {item.owner !== zeroAddress ? (
                  <span>✅</span>
                ) : menuIndices.includes(key) ? (
                  <Button
                    variant="default"
                    onClick={() =>
                      setMenuIndices(menuIndices.filter((i) => i !== key))
                    }
                  >
                    ✅
                  </Button>
                ) : (
                  <Button
                    variant="default"
                    onClick={() => setMenuIndices([...menuIndices, key])}
                  >
                    ❌
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-end mt-4">
        <Button
          variant="default"
          onClick={confirmPayment}
        >
          💳 Confirm Payment
        </Button>
      </div>
    </div>
  );
}
