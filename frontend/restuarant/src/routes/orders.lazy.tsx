import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import config from "@/config";
import { SPLITLY_ABI } from "@/data";
import { ordersStore } from "@/store";
import {
  aggregatedOrdersSelector,
  totalOrdersCostSelector
} from "@/store/order";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useRecoilState, useRecoilValue } from "recoil";
import { decodeAbiParameters, getAddress, parseAbiParameters } from "viem";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { useEffect } from "react";

export const Route = createLazyFileRoute("/orders")({
  component: OrdersRotue
});

function OrdersRotue() {
  const navigate = useNavigate();

  const [orders, setOrders] = useRecoilState(ordersStore);
  const aggregatedOrders = useRecoilValue(aggregatedOrdersSelector);
  const total = useRecoilValue(totalOrdersCostSelector);

  const { data: hash, writeContractAsync } = useWriteContract({
    mutation: {
      onSuccess: (data) => {
        console.log("result: ", data);
      }
    }
  });

  const { data, isSuccess } = useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    if (!isSuccess) return;
    if (!data.logs.length) return;

    // decoding the event `MenuAdded` from `Splitly` smart contract.
    const log = data.logs[data.logs.length - 1];
    const decoded = decodeAbiParameters(
      parseAbiParameters(
        "uint256 billId, uint256 menuCount, address restaurant"
      ),
      log.data
    );

    navigate({ to: "/bills/$id", params: { id: decoded[0].toString() } });
  }, [isSuccess]);

  const makeBilling = async () => {
    try {
      const data = orders.map((order) => {
        return {
          name: order.name,
          cost: BigInt(order.cost),
          owner: order.owner
        };
      });

      await writeContractAsync({
        abi: SPLITLY_ABI,
        address: getAddress(config.SPLITLY_ADDRESS!),
        functionName: "createBill",
        args: [data]
      });

      setOrders([]);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="container w-full mx-auto mt-12">
      <div className="w-full min-h-[60vh] h-full px-2 py-4 rounded-md shadow-md overflow-y-auto">
        <Table className="h-full">
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Cost</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {Object.values(aggregatedOrders).map((order, idx) => (
              <TableRow key={idx}>
                <TableHead>{idx + 1}</TableHead>
                <TableHead>
                  <div className="flex flex-row items-center gap-2">
                    <span>{order.name}</span>
                    <Badge
                      variant="secondary"
                      className="text-foreground"
                    >
                      ${order.cost}
                    </Badge>
                  </div>
                </TableHead>
                <TableHead>{order.count}</TableHead>
                <TableHead>${order.cost * order.count}</TableHead>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="w-full flex flex-row items-center justify-between mt-6">
        <span>
          <h3 className="font-bold text-xl">Total: ${total}</h3>
        </span>
        <Button onClick={makeBilling}>💰 Make Billing</Button>
      </div>
    </div>
  );
}
