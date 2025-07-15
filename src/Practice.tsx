import type React from "react";
import { useEffect, useRef } from "react";

type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  children: React.ReactNode;
  style: React.CSSProperties;
};

type Colors = "red" | "green" | "blue";

const arrays = ["Mg Mg", "Hla Hla", "Mya Mya"] as const;
// arrays.push("War War");
arrays.map((array) => array);

export default function Button({
  children,
  style,
  ...rest
}: ButtonProps): React.ReactElement {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const buttonColor = localStorage.getItem("color") as Colors;
  }, []);

  return (
    <button ref={ref} style={style} {...rest}>
      {children}
    </button>
  );
}

type BtnProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
};

export const Btn: React.FC<BtnProps> = ({
  label,
  ...rest
}): React.ReactElement => {
  return <button {...rest}>{label}</button>;
};

// function convertToArray<T>(value: T): T[]{
//   return [value];
// }

const convertToArray = <T,>(value: T): T[] => {
  return [value];
};

convertToArray("Hello");
convertToArray(4);
