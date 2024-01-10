import styled from 'styled-components';
import Searchbox from '../Searchbox';
import { useThumbnail } from '../../store';
import { useCallback } from 'react';
import ThumbnailGrid from '../ThumbnailGrid';
import Message from '../Message';
import heartIcon from '../../assets/icon-full-heart.png';
import IconButton from '../IconButton';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
`;

const ActionsContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  max-width: 500px;
`;

const StyledSearchbox = styled(Searchbox)`
  flex: 1;
`;

const StyledThumbnailGrid = styled(ThumbnailGrid)`
  max-width: 1200px;
`;

const Home = (): JSX.Element => {
  const { thumbnails, fetchNext, searchText, changeSearchText, status, next, error } = useThumbnail();
  const navigate = useNavigate();

  const handleChangeSearchText = useCallback(
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

  const handleFavoritesClick = useCallback(() => {
    navigate('/favorites');
  }, [navigate]);

  return (
    <Container>
      <ActionsContainer>
        <StyledSearchbox
          placeholder="Search..."
          value={searchText}
          onChange={handleChangeSearchText}
          loading={status === 'loading'}
        />
        <IconButton icon={heartIcon} onClick={handleFavoritesClick} />
      </ActionsContainer>
      {status !== 'error' && thumbnails.length > 0 && (
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
