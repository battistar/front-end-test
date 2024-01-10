import { Outlet } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 16px;
    font-family: Helvetica, sans-serif;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body, h1, h2, h3, h4, h5, h6, p, ol, ul {
    margin: 0;
    padding: 0;
    font-weight: normal;
    color: ${(props): string => props.theme.palette.text};
    background-color: ${(props): string => props.theme.palette.background};
  }

  ol, ul {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  input {
    color: inherit;
    background-color: inherit;
  }
`;

const Root = (): JSX.Element => {
  return (
    <>
      <GlobalStyle />
      <Outlet />
    </>
  );
};

export default Root;
