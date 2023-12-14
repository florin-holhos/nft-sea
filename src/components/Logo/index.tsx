import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  width?: number;
  height?: number;
  className?: string;
};

const Logo: React.FC<Props> = (props) => {
  const { width = 100, height = 100, className = "" } = props;
  return (
    <Link href="/" className="leading-none">
      <Image
        src="logo.svg"
        width={width}
        height={height}
        className={`w-[200px] ${className}`}
        alt="App Logo"
      />
    </Link>
  );
};

export default Logo;
