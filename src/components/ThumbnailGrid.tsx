import { useMemo } from 'react';
import styled from 'styled-components';
import { Thumbnail } from '../store';
import * as list from '../utils/list';
import Loader from './Loader';

type ThumbnailGridProps = {
  thumbnails: Thumbnail[];
  loading?: boolean;
  className?: string;
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

const ThumbnailGrid = ({ className, thumbnails, loading }: ThumbnailGridProps): JSX.Element => {
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
