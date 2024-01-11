import { useCallback, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { Thumbnail } from '../store';
import * as list from '../utils/list';
import Loader from './Loader';
import _ from 'lodash';
import IconButton from './IconButton/IconButton';
import heartFullIcon from '../assets/icon-full-heart.png';
import heartEmptyIcon from '../assets/icon-empt-heart.png';

type ThumbnailGridProps = {
  thumbnails: Thumbnail[];
  loading?: boolean;
  className?: string;
  onScrollEnd?: () => void;
  onFavoriteClick?: (id: string) => void;
};

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const Column = styled.div`
  width: 100%;

  @media (min-width: ${(props): string => `${props.theme.breakpoints.tablet}px`}) {
    width: 50%;
  }

  @media (min-width: ${(props): string => `${props.theme.breakpoints.desktop}px`}) {
    width: 25%;
  }
`;

const Cell = styled.div`
  position: relative;
  padding: 0 5px 5px;
`;

const Thumb = styled.img`
  width: 100%;
`;

const CellOverlay = styled.div`
  position: absolute;
  width: calc(100% - 10px);
  height: calc(100% - 9px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: 2rem;
  background-color: rgb(0, 0, 0, 0.8);
  opacity: 0;
  transition: opacity 0.4s;

  &:hover {
    opacity: 1;
  }
`;

const LoaderContainer = styled.div`
  height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ThumbnailGrid = ({
  className,
  thumbnails,
  loading,
  onScrollEnd,
  onFavoriteClick,
}: ThumbnailGridProps): JSX.Element => {
  const handleFavoriteClick = useCallback(
    (id: string) => () => {
      if (onFavoriteClick) {
        onFavoriteClick(id);
      }
    },
    [onFavoriteClick],
  );

  const handleScroll = useCallback((): void => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    if (onScrollEnd && scrollTop + clientHeight === scrollHeight) {
      onScrollEnd();
    }
  }, [onScrollEnd]);

  const debouncedHandleScroll = _.debounce(handleScroll, 50);

  useEffect(() => {
    window.addEventListener('scroll', debouncedHandleScroll);

    return () => {
      window.removeEventListener('scroll', debouncedHandleScroll);
    };
  }, [debouncedHandleScroll]);

  const columns = useMemo(() => {
    const chunks = list.chunkify(thumbnails, 4);

    return chunks.map((thumbnails, index) => {
      return (
        <Column key={index}>
          {thumbnails.map((thumbnail) => {
            return (
              <Cell key={thumbnail.id}>
                <CellOverlay>
                  {thumbnail.width}x{thumbnail.height}
                  <IconButton
                    icon={thumbnail.favorite ? heartFullIcon : heartEmptyIcon}
                    onClick={handleFavoriteClick(thumbnail.id)}
                  />
                </CellOverlay>
                <Thumb src={thumbnail.url} />
              </Cell>
            );
          })}
        </Column>
      );
    });
  }, [handleFavoriteClick, thumbnails]);

  return (
    <>
      <Row className={className}>{columns}</Row>
      {loading && (
        <LoaderContainer>
          <Loader size={30} />
        </LoaderContainer>
      )}
    </>
  );
};

export default ThumbnailGrid;
