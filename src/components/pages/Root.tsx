import { Outlet } from 'react-router-dom';
import GlobalStyle from '../GlobalStyle';

const Root = (): JSX.Element => {
  return (
    <>
      <GlobalStyle />
      <Outlet />
    </>
  );
};

export default Root;
