import styled from 'styled-components';
import Searchbox from '../Searchbox';
import { useThumbnail } from '../../store';
import { useCallback } from 'react';
import ThumbnailGrid from '../ThumbnailGrid';
import Message from '../Message';

const Container = styled.div`
  height: 100vh;
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
  const { thumbnails, fetchNext, searchText, changeSearchText, status, next, error } = useThumbnail();

  const handleChange = useCallback(
    (value: string) => {
      changeSearchText(value);
    },
    [changeSearchText],
  );

  const handleScrollEnd = useCallback(async () => {
    if (status !== 'loading') {
      await fetchNext();
    }
  }, [fetchNext, status]);

  return (
    <Container>
      <StyledSearchbox
        placeholder="Search..."
        value={searchText}
        onChange={handleChange}
        loading={status === 'loading'}
      />
      {status !== 'error' && thumbnails && (
        <StyledThumbnailGrid
          thumbnails={thumbnails}
          onScrollEnd={handleScrollEnd}
          loading={status === 'loading' && next !== null}
        />
      )}
      {status === 'error' && (
        <Message text={error && error.statusCode === 404 ? 'Data not found' : 'Oops! Something was wrong'} />
      )}
    </Container>
  );
};

export default Home;
