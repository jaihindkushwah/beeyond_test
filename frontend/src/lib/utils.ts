import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { jwtDecode } from "jwt-decode";

export const getDataFromSessionStorage = (key: string) => {
  const data = sessionStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};
export const setDataToSessionStorage = (key: string, data: any) => {
  sessionStorage.setItem(key, JSON.stringify(data));
}
export const clearDataFromSessionStorage = (key: string) => {
  sessionStorage.removeItem(key);
}
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function decodeJwt(token: string) {
  if(!token) return
  return jwtDecode(token);
}