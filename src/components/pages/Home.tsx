import styled from 'styled-components';
import Searchbox from '../Searchbox';
import { useThumbnail } from '../../store';
import { useCallback } from 'react';
import ThumbnailGrid from '../ThumbnailGrid';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

const Home = (): JSX.Element => {
  const { thumbnails, searchText, changeSearchText, status } = useThumbnail();

  const handleChange = useCallback(
    (value: string) => {
      changeSearchText(value);
    },
    [changeSearchText],
  );

  return (
    <Container>
      <Searchbox placeholder="Search..." value={searchText} onChange={handleChange} loading={status === 'loading'} />
      {thumbnails && <ThumbnailGrid thumbnails={thumbnails} />}
    </Container>
  );
};

export default Home;
