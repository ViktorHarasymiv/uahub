import { ReactNode, CSSProperties } from "react";

interface ButtonProps {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  styles?: CSSProperties;
  accent?: boolean;
  action?: () => void;
}

function Button({ children, type, styles, accent, action }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={action}
      style={styles}
      className={accent ? "accent_btn" : undefined}
    >
      {children}
    </button>
  );
}

export default Button;
