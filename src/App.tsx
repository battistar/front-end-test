import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './components/pages/Home';
import Root from './components/pages/Root';

const App = (): JSX.Element => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [{ index: true, element: <Home /> }],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
