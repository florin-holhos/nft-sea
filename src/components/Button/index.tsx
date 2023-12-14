import React from "react";
import * as Types from "types";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: Types.ButtonVariant;
};

const variantStyles: { [key in Types.ButtonVariant]: string } = {
  primary:
    "capitalize text-white disabled:blur-sm hover:disabled:ring-0 disabled:cursor-not-allowed disabled:opacity-50 bg-gradient-to-r from-[#627EEA] from-60% to-[#EC4467] p-5 rounded drop-shadow-button hover:ring-2 ring-white transition-shadow",
  text: "text-white disabled:cursor-not-allowed disabled:opacity-50",
};

const Button: React.FC<Props> = (props) => {
  const { variant, children, className, ...restProps } = props;

  return (
    <button className={`${variantStyles[variant]} ${className}`} {...restProps}>
      {children}
    </button>
  );
};

export default Button;
