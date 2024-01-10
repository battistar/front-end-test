import styled from 'styled-components';
import ThumbnailGrid from '../ThumbnailGrid';
import { useThumbnail } from '../../store';
import { useCallback } from 'react';
import Message from '../Message';

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
`;

const Title = styled.h2`
  text-transform: uppercase;
  font-size: 2rem;
`;

const StyledThumbnailGrid = styled(ThumbnailGrid)`
  max-width: 1200px;
`;

const Favorites = (): JSX.Element => {
  const { favorites, toggleFavorite } = useThumbnail();

  const handleFavoriteClick = useCallback(
    (id: string) => {
      toggleFavorite(id);
    },
    [toggleFavorite],
  );

  return (
    <Container>
      <Title>Favorites</Title>
      {favorites.length > 0 && <StyledThumbnailGrid thumbnails={favorites} onFavoriteClick={handleFavoriteClick} />}
      {favorites.length === 0 && <Message text="No favorites found" />}
    </Container>
  );
};

export default Favorites;
