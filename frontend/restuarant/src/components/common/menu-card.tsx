import { MenuItemX } from "@/data/menu";
import { Button } from "../ui/button";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { conversionRateStore, ordersStore } from "@/store";
import { MenuItem } from "@/types";
import { convertPrice } from "@/lib/utils";
import { TokenIcon } from "@web3icons/react";

type Props = {
  data: MenuItemX;
};

export default function MenuCard({ data }: Props) {
  const conversionRate = useRecoilValue(conversionRateStore);
  const setOrders = useSetRecoilState(ordersStore);

  const addOrders = (item: MenuItem) => {
    setOrders((data) => [...data, item]);
  };

  return (
    <div className="flex flex-col w-full h-[500px] bg-gray-100 rounded-lg shadow-md">
      <div className="w-full flex-1">
        <img
          className="w-full h-full max-h-[300px] object-cover rounded-t-lg"
          src={data.img_url}
        />
        {/* </AspectRatio> */}
      </div>

      <div className="flex flex-col p-4">
        <div className="flex flex-row justify-between items-center">
          <h3 className="text-2xl font-bold">{data.name}</h3>
          <div className="flex items-center gap-1">
            <TokenIcon
              size={20}
              symbol="usdc"
              variant="branded"
            />
            <span className="text-xl font-semibold">
              {convertPrice(conversionRate, 8, data.cost).toFixed(2)}
            </span>
          </div>
        </div>

        <p className="text-sm text-gray-500 mt-4">{data.desc}</p>

        <Button
          className="mt-4"
          onClick={() => addOrders(data)}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
