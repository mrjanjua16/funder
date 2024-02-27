"use client";
import React from 'react'
import NavigationBar from './navigationBar';
import LayoutStyles from './layout.module.css';

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
        <NavigationBar />
      </div>
      
      <div className={LayoutStyles.content}>
        {children}
      </div>
</>
  );
}