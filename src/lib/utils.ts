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

export const getDifficultyColor = (difficulty: string) => {
  switch (difficulty.toLowerCase()) {
    case "easy":
      return "green";
    case "medium":
      return "amber";
    case "hard":
      return "red";
    default:
      return "gray";
  }
};

export const getAcceptanceColor = (acceptanceRate: string | null) => {
  if (!acceptanceRate) return "gray";
  const rate = parseFloat(acceptanceRate);
  if (rate >= 70) return "green";
  if (rate >= 40) return "amber";
  return "red";
}

export const isValidLeetCodeUrl = (input: string): boolean => {
  try {
    // Remove trailing slashes and normalize
    const normalizedInput = input.trim().replace(/\/+$/, '');
    
    // Check if it's a valid URL
    const urlObj = new URL(normalizedInput);
    
    // Check if it's a LeetCode domain
    if (!urlObj.hostname.includes('leetcode.com')) {
      return false;
    }
    
    // Check if it follows the problems path pattern
    // LeetCode URLs follow: https://leetcode.com/problems/{problem-slug}/
    const pathMatch = urlObj.pathname.match(/^\/problems\/[a-z0-9-]+\/?$/);
    
    return pathMatch !== null;
  } catch (error) {
    // Invalid URL format
    return false;
  }
};


export const normalizeLeetCodeUrl = (url: string): string => {
  return url.trim().replace(/\/+$/, '');
};
