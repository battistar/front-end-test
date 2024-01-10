import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './components/pages/Home';
import Root from './components/pages/Root';
import { ThemeProvider } from 'styled-components';
import { ThumbnailProvider } from './store';

const App = (): JSX.Element => {
  const theme = {
    palette: {
      text: '#fff',
      background: '#121212',
      action: {
        hover: '#fff',
        selected: '#868686',
      },
    },
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
      <ThemeProvider theme={theme}>
        <ThumbnailProvider>
          <RouterProvider router={router} />
        </ThumbnailProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
