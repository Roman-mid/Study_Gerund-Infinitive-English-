import React from "react";
import { ButtonProps } from "./Button.types";
import clsx from "clsx";

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  disabled,
  onClick,
}) => {
  return (
    <button
      className={clsx("btn", className)}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
