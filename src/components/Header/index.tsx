import Image from "next/image";
import Link from "next/link";
import React from "react";
import * as Components from "components";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";

const Header: React.FC = () => {
  const { open } = useWeb3Modal();
  const { isConnected, isReconnecting } = useAccount();

  return (
    <header>
      <nav className="text-white container my-4 flex justify-between items-center py-4">
        <Components.Logo />
        <ul className="flex gap-5 items-center">
          <li>
            <Link href="#">Explore Marketplace</Link>
          </li>
          <li>
            <Components.Button
              id="wallet-btn"
              variant="text"
              className="align-middle hover:ring-2 ring-white rounded relative flex items-center scale-1 transition-all"
              onClick={() => open()}
            >
              <Image
                src="wallet.svg"
                width={100}
                height={100}
                className="w-7"
                alt="Wallet Connect"
              />
              {isConnected && !isReconnecting && (
                <span className="w-3 h-3 bg-green-500 absolute -right-1 -top-1 rounded-full"></span>
              )}
            </Components.Button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
