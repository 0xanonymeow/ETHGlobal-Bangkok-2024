import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertPrice(quote: number, decimal: number, amount: number) {
  /*
  quote/base = toQuote/toBase
  0.9/1 = toQuote/10
  toQuote = 0.9 * 10
  */

  const mul = quote / 10 ** decimal;
  return amount * mul;
}
