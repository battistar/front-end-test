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
  const { thumbnails, searchText, changeSearchText, status } = useThumbnail();

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
      {thumbnails && <StyledThumbnailGrid thumbnails={thumbnails} />}
    </Container>
  );
};

export default Home;
