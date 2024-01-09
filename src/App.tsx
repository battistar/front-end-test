import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './components/pages/Home';
import Root from './components/pages/Root';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { ThumbnailProvider } from './store';

const App = (): JSX.Element => {
  const GlobalStyle = createGlobalStyle`
    html {
      box-sizing: border-box;
      font-size: 16px;
    }

    *, *:before, *:after {
      box-sizing: inherit;
    }

    body, h1, h2, h3, h4, h5, h6, p, ol, ul {
      margin: 0;
      padding: 0;
      font-weight: normal;
    }

    ol, ul {
      list-style: none;
    }

    img {
      max-width: 100%;
      height: auto;
    }
  `;

  const theme = {
    breakpoints: {
      tablet: 576,
      desktop: 992,
    },
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [{ index: true, element: <Home /> }],
    },
  ]);

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <ThumbnailProvider>
          <RouterProvider router={router} />
        </ThumbnailProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
