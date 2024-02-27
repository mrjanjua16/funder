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
        </div>
        <div className={styles.navbar}>
          <button>Connect Wallet</button>
        </div>
      </div>
      
      <div className={LayoutStyles.content}>
        {children}
      </div>
</>
  );
}