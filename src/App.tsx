import { RouterProvider, createHashRouter } from 'react-router-dom';
import Home from './components/pages/Home/Home';
import Root from './components/pages/Root';
import { ThemeProvider } from 'styled-components';
import { ThumbnailProvider } from './store';
import Error from './components/pages/Error/Error';
import Favorites from './components/pages/Favorites/Favorites';
import theme from './theme';

const App = (): JSX.Element => {
  const router = createHashRouter([
    {
      path: '/',
      element: <Root />,
      errorElement: <Error />,
      children: [
        { index: true, element: <Home /> },
        { path: 'favorites', element: <Favorites /> },
      ],
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
