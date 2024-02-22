import Header from './header';
import Themes from './themes';
import styled, {ThemeProvider, createGlobalStyle} from 'styled-components';
import {useState, createContext} from 'react';

export const useClient = () => null;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
  const [theme, setTheme] = useState('light');
  
  const GlobalStyle = createGlobalStyle`
    body {
      margin: 0;
      padding: 0;
    }
  `;

  const LayoutWrapper = styled.div`
  min--height: 100vh;
  background-color: ${(props) => props.theme.bgColor};
  background-image: ${(props) => props.theme.bgImage};
  color: ${(props) => props.color};
  `;

  const changeTheme = ()=>
  {
    setTheme(theme == "light" ? "dark": "light");
  }
  return (
    <>
    <ThemeProvider theme={Themes[theme]}>
    <LayoutWrapper onClick={changeTheme}>
    <GlobalStyle />
    <Header />
    {children}
    </LayoutWrapper>
    </ThemeProvider></>
  );
}