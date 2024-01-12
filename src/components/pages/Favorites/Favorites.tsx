import styled from 'styled-components';
import ThumbnailGrid from '../../ThumbnailGrid/ThumbnailGrid';
import { useThumbnail } from '../../../store';
import { useCallback } from 'react';
import Message from '../../Message/Message';
import IconButton from '../../IconButton/IconButton';
import heartIcon from '../../../assets/icon-back.png';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
`;

const TopContainer = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  align-items: center;
`;

const Title = styled.h2`
  flex: 1;
  font-size: 2rem;
  text-align: center;
  padding-right: 40px;
`;

const StyledThumbnailGrid = styled(ThumbnailGrid)`
  max-width: 1200px;
`;

const Favorites = (): JSX.Element => {
  const { favorites, toggleFavorite } = useThumbnail();
  const navigate = useNavigate();

  const handleFavoriteClick = useCallback(
    (id: string) => {
      toggleFavorite(id);
    },
    [toggleFavorite],
  );

  const handleBackClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <Container>
      <TopContainer>
        <IconButton icon={heartIcon} onClick={handleBackClick} />
        <Title>Favorites</Title>
      </TopContainer>
      {favorites.length > 0 && <StyledThumbnailGrid thumbnails={favorites} onFavoriteClick={handleFavoriteClick} />}
      {favorites.length === 0 && <Message text="No favorites found" />}
    </Container>
  );
};

export default Favorites;
