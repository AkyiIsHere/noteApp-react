import { config } from "@/constant/config";
import { useEffect, useState } from "react";

export default function useLocalStorage<T>(initialValue: T, key?: string) {
  const storageKey = key ?? config.STORAGE_KEY;

  const [value, setValue] = useState<T>(() => {
    const json = localStorage.getItem(storageKey);
    return json !== null ? JSON.parse(json) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(value));
  }, [storageKey, value]);

  return [value, setValue] as const;
}
