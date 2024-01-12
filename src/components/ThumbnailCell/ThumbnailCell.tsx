import styled from 'styled-components';
import { Thumbnail } from '../../store';
import IconButton from '../IconButton/IconButton';
import heartFullIcon from '../../assets/icon-full-heart.png';
import heartEmptyIcon from '../../assets/icon-empt-heart.png';

const Container = styled.div`
  position: relative;
  padding: 0 5px 5px 0;
`;

const Overlay = styled.div`
  position: absolute;
  width: calc(100% - 5px);
  height: calc(100% - 9px);

  @media (min-width: ${(props): string => `${props.theme.breakpoints.desktop}px`}) {
    opacity: 0;
    background-color: rgb(0, 0, 0, 0.8);

    &:hover {
      opacity: 1;
      transition: opacity 0.4s;
    }
  }
`;

const TextContainer = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: rgb(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  padding: 10px;

  @media (min-width: ${(props): string => `${props.theme.breakpoints.desktop}px`}) {
    background-color: transparent;
    height: auto;
    width: auto;
    padding: 0;
    display: block;
    top: 0;
    left: 0;
    bottom: auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const StyledIconButton = styled(IconButton)`
  position: absolute;
  top: 0;
  right: 0;
  margin: 10px 10px 0 0;
`;

const StyledImg = styled.img`
  width: 100%;
`;

type ThumbnailOverlayProps = {
  thumbnail: Thumbnail;
  onFavoriteClick?: (id: string) => void;
  className?: string;
};

const ThumbnailCell = ({ className, onFavoriteClick, thumbnail }: ThumbnailOverlayProps): JSX.Element => {
  const handleClick = (): void => {
    if (onFavoriteClick) {
      onFavoriteClick(thumbnail.id);
    }
  };

  return (
    <Container data-testid="cell" className={className}>
      <Overlay>
        <StyledIconButton icon={thumbnail.favorite ? heartFullIcon : heartEmptyIcon} onClick={handleClick} />
        <TextContainer>
          {thumbnail.width}x{thumbnail.height}
        </TextContainer>
      </Overlay>
      <StyledImg src={thumbnail.url} />
    </Container>
  );
};

export default ThumbnailCell;
