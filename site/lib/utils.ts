import { clsx, type ClassValue } from "clsx";
import { Hanken_Grotesk } from "next/font/google";
import { twMerge } from "tailwind-merge";

export const font = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
