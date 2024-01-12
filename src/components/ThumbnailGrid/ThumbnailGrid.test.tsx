import { test, expect, describe } from 'vitest';
import { render, screen } from '../../test-utils';
import ThumbnailGrid from './ThumbnailGrid';
import { Thumbnail } from '../../store';

const thumbnails: Thumbnail[] = [
  {
    id: '1',
    width: 140,
    height: 140,
    url: '',
    favorite: false,
  },
  {
    id: '2',
    width: 140,
    height: 140,
    url: '',
    favorite: false,
  },
  {
    id: '3',
    width: 140,
    height: 140,
    url: '',
    favorite: false,
  },
  {
    id: '4',
    width: 140,
    height: 140,
    url: '',
    favorite: false,
  },
];

describe('ThumbnailGrid', () => {
  test('should render grid element with 4 columns and 4 cells', () => {
    render(<ThumbnailGrid thumbnails={thumbnails} />);

    const columnElementList = screen.getAllByTestId('column');
    const cellElementList = screen.getAllByTestId('cell');

    expect(columnElementList.length).toBe(4);
    expect(cellElementList.length).toBe(4);
  });

  test('should render grid element with loader', () => {
    render(<ThumbnailGrid thumbnails={thumbnails} loading />);

    const loaderElement = screen.getByTestId('loader');

    expect(loaderElement).toBeDefined();
  });
});
