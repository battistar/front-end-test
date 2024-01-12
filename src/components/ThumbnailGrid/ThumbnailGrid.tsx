import { useCallback, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { Thumbnail } from '../../store';
import * as list from '../../utils/list';
import Loader from '../Loader/Loader';
import _ from 'lodash';
import ThumbnailCell from '../ThumbnailCell/ThumbnailCell';

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
    (id: string) => {
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
        <Column data-testid="column" key={index}>
          {thumbnails.map((thumbnail) => {
            return <ThumbnailCell key={thumbnail.id} thumbnail={thumbnail} onFavoriteClick={handleFavoriteClick} />;
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
