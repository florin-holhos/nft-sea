"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import * as Components from "components";
import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { WagmiConfig } from "wagmi";
import { goerli } from "viem/chains";

const projectId = process.env.NEXT_PUBLIC_WALLET_PROJECT_ID!;

const chains = [goerli];
const wagmiConfig = defaultWagmiConfig({ chains, projectId });

createWeb3Modal({ wagmiConfig, projectId, chains });

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="title" content="NFT Sea" />
        <meta
          name="description"
          content="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore, qui. Error magnam possimus ullam hic ab cupiditate velit adipisci, illum sint enim quis perferendis necessitatibus veritatis vel dolores. Sunt, at"
        />
      </head>
      <body className={inter.className}>
        <div
          className="-z-10 fixed inset-0 scale-110"
          style={{
            backgroundImage: "url(app-bg.svg)",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
            backgroundColor: "#111",
            filter: "blur(5px)",
          }}
        ></div>
        <WagmiConfig config={wagmiConfig}>
          <Components.Header />
          {children}
          <Components.Footer />
        </WagmiConfig>
      </body>
    </html>
  );
}
