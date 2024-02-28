"use client";
import React from 'react'
import LayoutStyles from './layout.module.css';
import styles from './NavigationBar.module.css';
import {InjectedConnector} from "@metamask/eth-providers";

interface Network {
  chainId: string;
}

interface LayoutProps 
{
  title?: string;
}

export default function RootLayout({
  children,
  title
}: Readonly<{
  children: React.ReactNode;
}> & LayoutProps){
    const networks: {[key: string]:Network} = {
      polygon: {
        chainId: '0x${Number(137).toString(16)}',
      },
      optimism: {
        chainId: '0x${Number(10).toString(16)}',
      },
    };

    const connectWallet = async () => {
      try {
        if (typeof window.ethereum !== "undefined"){
          const accounts = await window.ethereum.request()
        }
      }
    }

  return (
<>
  <div className={LayoutStyles.header}>
  <h1>{title}</h1>
    <div className={styles.navbar}>
    <button>Dashboard</button>
    <button>Campaigns</button>
    <button>Create Campaign</button>
    <button onClick={connectWallet}>Connect Wallet</button>
    </div>
  </div>
  <div className={LayoutStyles.content}>
    {children}
  </div>
</>
  );
}

const connectWallet = async () => {
    await window.ethereum.request({ method: "eth_requestAccounts"});
}

const networks = {
  polygon: {
    chainId: '0x${Number(137).toString(16)}',
  }
}