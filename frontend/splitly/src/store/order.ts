import { MenuItem } from "@/types";
import { atom, selector } from "recoil";
import localStorageEffect from "./local-storage";

const ordersStore = atom<MenuItem[]>({
  key: "orders",
  default: [],
  effects: [localStorageEffect("orders")]
});

export const totalOrdersCostSelector = selector({
  key: "total-orders-cost",
  get: ({ get }) => {
    const orders = get(ordersStore);
    let total = 0;
    orders.forEach((item) => {
      total += item.cost;
    });

    return total;
  }
});

export const aggregatedOrdersSelector = selector({
  key: "aggregated-orders",
  get: ({ get }) => {
    const orders = get(ordersStore);
    return orders.reduce((acc: Record<string, any>, order) => {
      if (acc[order.name]) {
        acc[order.name].count += 1;
      } else {
        acc[order.name] = { ...order, count: 1 };
      }
      return acc;
    }, {});
  }
});

export default ordersStore;
