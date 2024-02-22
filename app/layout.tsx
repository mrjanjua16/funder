import Header from './header'
import Themes from './themes'
import {ThemeProvider, createGlobalStyle} from 'styled-components'
import {useState, createContext} from 'react'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
  const [theme, setTheme] = useState('light');
  return (
    <>
    <ThemeProvider theme={Themes[theme]}>
    <Header></Header>
    {children}
    </ThemeProvider></>
  );
}