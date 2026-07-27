import { ReactNode, CSSProperties } from "react";

import style from "./Style.module.css";

interface ButtonProps {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  styles?: CSSProperties;
  accent?: boolean;
  disable?: boolean;
  action?: () => void;
}

function Button({
  children,
  type,
  disable,
  styles,
  accent,
  action,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disable}
      onClick={action}
      style={styles}
      className={accent ? style.accent : ""}
    >
      {children}
    </button>
  );
}

export default Button;
