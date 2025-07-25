import { useEffect, useState } from "react";
import { config } from "../constant/config";

export default function useIsSmallScreen(
  breakpoint = config.SMALL_SCREEN_BREAKPOINT
) {
  const [isSmallScreen, setIsSmallScreen] = useState(
    typeof window !== "undefined" ? window.innerWidth <= breakpoint : false
  );

  useEffect(() => {
    const resizeHandler = () => {
      const matches = window.innerWidth <= breakpoint;
      setIsSmallScreen((prev) => {
        if (prev !== matches) {
          return matches;
        }
        return prev; // no state update
      });
    };

    window.addEventListener("resize", resizeHandler);
    resizeHandler(); // to make sure even when the user resize window before component mount
    return () => window.removeEventListener("resize", resizeHandler);
  }, [breakpoint]);

  return isSmallScreen;
}
