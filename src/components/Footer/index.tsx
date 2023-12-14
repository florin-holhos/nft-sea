import React from "react";
import * as Components from "components";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black">
      <div className="text-white container flex justify-between items-center flex-col md:flex-row md:py-7 gap-8 md:gap-4 py-10">
        <Components.Logo className="w-36 sm:w-fit order-1" />

        <p className="font-light order-1 md:order-2">
          NFT Sea 2022 © All right reserved
        </p>

        <Link href="#" className="md:order-3">
          <Components.Button variant="primary">
            Explore marketplace
          </Components.Button>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
