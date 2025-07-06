import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { COLORS } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getRandomColor = (word: string) => {
  // Simple but effective hash for better distribution
  let hash = 0;
  for (let i = 0; i < word.length; i++) {
    hash = word.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Use bitwise operations for better distribution
  const index = Math.abs(hash ^ (hash >>> 16)) % COLORS.length;
  return COLORS[index];
};
