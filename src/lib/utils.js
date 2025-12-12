import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(...inputs));
}

/**
 * Decode HTML entities trong chuỗi văn bản
 * Ví dụ: "Tr&#249;m" -> "Trùm", "&#244;" -> "ô"
 */
export function decodeHtmlEntities(text) {
  if (!text || typeof text !== 'string') return text;
  
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
}
