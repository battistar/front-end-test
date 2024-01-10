import { useCallback, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { Thumbnail } from '../store';
import * as list from '../utils/list';
import Loader from './Loader';
import _ from 'lodash';

type ThumbnailGridProps = {
  thumbnails: Thumbnail[];
  loading?: boolean;
  className?: string;
  onScrollEnd?: () => void;
};

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
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

const Cell = styled.img`
  width: 100%;
  padding: 0 5px 5px;
`;

const LoaderContainer = styled.div`
  height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ThumbnailGrid = ({ className, thumbnails, loading, onScrollEnd }: ThumbnailGridProps): JSX.Element => {
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
            return <Cell key={thumbnail.id} src={thumbnail.url} />;
          })}
        </Column>
      );
    });
  }, [thumbnails]);

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
