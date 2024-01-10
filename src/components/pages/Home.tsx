import styled from 'styled-components';
import Searchbox from '../Searchbox';
import { useThumbnail } from '../../store';
import { useCallback } from 'react';
import ThumbnailGrid from '../ThumbnailGrid';

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
  const { thumbnails, fetchNext, searchText, changeSearchText, status, next } = useThumbnail();

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
      {thumbnails && (
        <StyledThumbnailGrid
          thumbnails={thumbnails}
          onScrollEnd={handleScrollEnd}
          loading={status === 'loading' && next !== null}
        />
      )}
    </Container>
  );
};

export default Home;
