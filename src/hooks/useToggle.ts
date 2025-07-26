import { useCallback, useState } from "react";

export default function useToggle(
  initial = false
): [boolean, (value?: boolean | undefined) => void] {
  const [state, setState] = useState(initial);

  const toggle = useCallback((value?: boolean) => {
    setState((prev) => (typeof value === "boolean" ? value : !prev));
  }, []);
  return [state, toggle] as const;
}
