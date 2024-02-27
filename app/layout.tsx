"use client";
import React from 'react'
import LayoutStyles from './layout.module.css';
import styles from './NavigationBar.module.css';

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