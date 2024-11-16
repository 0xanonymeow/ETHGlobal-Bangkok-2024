import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell
} from "@/components/ui/table";
import config from "@/config";
import { SPLITLY_ABI } from "@/data";
import { conversionRateStore, ordersStore } from "@/store";
import {
  aggregatedOrdersSelector,
  totalOrdersCostSelector
} from "@/store/order";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useRecoilState, useRecoilValue } from "recoil";
import { decodeAbiParameters, getAddress, parseAbiParameters } from "viem";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { useEffect } from "react";
import { TokenIcon } from "@web3icons/react";
import { convertPrice } from "@/lib/utils";

export const Route = createLazyFileRoute("/orders")({
  component: OrdersRotue
});

function OrdersRotue() {
  const navigate = useNavigate();

  const conversionRate = useRecoilValue(conversionRateStore);
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
                <TableCell>
                  <div className="flex flex-row items-center gap-2">
                    <span>{order.name}</span>
                    <Badge
                      variant="secondary"
                      className="text-foreground"
                    >
                      <div className="flex items-center gap-1">
                        <TokenIcon
                          size={16}
                          symbol="usdc"
                          variant="branded"
                        />
                        <span>
                          {convertPrice(conversionRate, 8, order.cost).toFixed(
                            2
                          )}
                        </span>
                      </div>
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>{order.count}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <TokenIcon
                      size={16}
                      symbol="usdc"
                      variant="branded"
                    />

                    <span>
                      {convertPrice(
                        conversionRate,
                        8,
                        order.cost * order.count
                      ).toFixed(2)}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="w-full flex flex-row items-center justify-between mt-6">
        <span className="flex items-center gap-1">
          <h3 className="font-bold text-xl">Total: </h3>
          <div className="flex items-center gap-1">
            <TokenIcon
              size={20}
              symbol="usdc"
              variant="branded"
            />

            <h3 className="font-bold text-xl">
              {convertPrice(conversionRate, 8, total).toFixed(2)}
            </h3>
          </div>
        </span>
        <Button onClick={makeBilling}>💰 Make Billing</Button>
      </div>
    </div>
  );
}
