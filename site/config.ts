export const BASE_URL = process.env.BASE_URL as string;
export const VERCEL_URL = BASE_URL;

export const absoulteUrl = (path: string) => {
  if (typeof window !== "undefined") return path;
  if (VERCEL_URL) return `${VERCEL_URL}${path}`;
  return `${BASE_URL}${path}`;
};
