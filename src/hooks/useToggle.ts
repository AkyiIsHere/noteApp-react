import { useState } from "react";

export default function useToggle(initial = false): [boolean, () => void] {
  const [state, setState] = useState(initial);
  const toggle = () => {
    setState((prev) => !prev);
  };
  return [state, toggle];
}
