"use client";
import React, {useState, useEffect} from 'react'
import LayoutStyles from './layout.module.css';
import styles from './NavigationBar.module.css';
import detectEthereumProvider from '@metamask/detect-provider';

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
    const [provider, setProvider] = useState<any>(null);
    const [account, setAccount] = useState<string | null>(null);
    const [messages, setMessages] = useState<string[]>([]);

    const networks: {[key: string]:Network} = {
      polygon: {
        chainId: '0x${Number(137).toString(16)}',
      },
      optimism: {
        chainId: '0x${Number(10).toString(16)}',
      },
    };

    useEffect(() => {
      async function connect() {
        const detectedProvider = await detectEthereumProvider();
        setProvider(detectedProvider);

        try {
          const accounts = await provider.request({method: 'eth_requestAccounts'});
          setAccount(accounts[0]);
        } catch (error: any) {
          if (error.code === 4901) {
            setMessages((prevMessages) => [...prevMessages, "Please install MetaMask"]);
          } else {
            setMessages((prevMessages) => [...prevMessages, error.message]);
          }
        }
      }
      connect();
    }, []);

    const handleConnect = async () => {
      setMessages([]);
      try {
        const accounts = await provider.request({
          method: 'eth_requestAccounts',
          params: [{chainId: networks.optimism.chainId}],
        });
        setAccount(accounts[0]);
      } catch (error: any) {
        setMessages((prevMessages) => [...prevMessages, error.message]);
        console.error(error);

        if (error.code === 4902) {
          try {
            await provider.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0x${Number(420).toString(16)}'}],
            });
            handleConnect();
          } catch (error) {
            console.error(error);
            setMessages((prevMessages) => [...prevMessages, "Error adding Optimism Testnet"]);
          }
        }
      }
    };


  return (
<>
  <div className={LayoutStyles.header}>
  <h1>{title}</h1>
    <div className={styles.navbar}>
    <button>Dashboard</button>
    <button>Campaigns</button>
    <button>Create Campaign</button>
    <button onClick={handleConnect}>
      {account ? 'Connected (' + account.substring(0, 5) + '...)' : 'Connect Wallet'}
    </button>
    {messages.length > 0 && (
      <div className='messages'>
        {messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
    )}
    </div>
  </div>
  <div className={LayoutStyles.content}>
    {children}
  </div>
</>
  );
}