import styled from 'styled-components';
import Searchbox from '../Searchbox';
import { useThumbnail } from '../../store';
import { useCallback } from 'react';
import ThumbnailGrid from '../ThumbnailGrid';
import useScrolling from '../../hooks/useScrolling';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
`;

const StyledSearchbox = styled(Searchbox)`
  width: 100%;
  max-width: 500px;
`;

const StyledThumbnailGrid = styled(ThumbnailGrid)`
  max-width: 1200px;
`;

const Home = (): JSX.Element => {
  const { thumbnails, fetchNext, searchText, next, changeSearchText, status } = useThumbnail();
  const { end } = useScrolling();

  if (end && status !== 'loading') {
    fetchNext(searchText, next);
  }

  const handleChange = useCallback(
    (value: string) => {
      changeSearchText(value);
    },
    [changeSearchText],
  );

  return (
    <Container>
      <StyledSearchbox
        placeholder="Search..."
        value={searchText}
        onChange={handleChange}
        loading={status === 'loading'}
      />
      {thumbnails && <StyledThumbnailGrid thumbnails={thumbnails} loading={status === 'loading' && next !== null} />}
    </Container>
  );
};

export default Home;
