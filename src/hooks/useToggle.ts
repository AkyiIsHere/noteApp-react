import { useState } from "react";

export default function useToggle(
  initial = false
): [boolean, (mode: boolean) => void] {
  const [state, setState] = useState(initial);
  const toggle = (mode: boolean = true) => {
    if (mode) {
      setState((prev) => !prev);
    } else {
      setState(false);
      console.log("hi");
    }
  };
  return [state, toggle];
}
