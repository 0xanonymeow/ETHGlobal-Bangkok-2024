import { atom } from "recoil";

const conversionRateStore = atom<number>({
  key: "conversion-rate",
  default: 0
});

export default conversionRateStore;
