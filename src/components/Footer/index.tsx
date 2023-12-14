import React from "react";
import * as Components from "components";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black">
      <div className="text-white container flex justify-between items-center py-7">
        <Components.Logo />

        <p className="font-light">NFT Sea 2022 © All right reserved </p>

        <Link href="#">
          <Components.Button variant="primary">
            Explore marketplace
          </Components.Button>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
