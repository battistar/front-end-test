import { test, expect, describe, vi } from 'vitest';
import { render, screen } from '../../../test-utils';
import Favorites from './Favorites';
import * as store from '../../../store';

const thumbnails: store.Thumbnail[] = [
  {
    id: '1',
    width: 140,
    height: 140,
    url: '',
    favorite: true,
  },
  {
    id: '4',
    width: 140,
    height: 140,
    url: '',
    favorite: true,
  },
];

describe('Favorites', () => {
  test('should render page with no favorites', () => {
    render(<Favorites />);

    const titleElement = screen.getByText('Favorites');
    const notFoundElement = screen.getByText('No favorites found');

    expect(titleElement).toBeDefined();
    expect(notFoundElement).toBeDefined();
  });

  test('should render page with some favorites', () => {
    vi.spyOn(store, 'useThumbnail').mockImplementation(() => {
      return {
        thumbnails: [],
        changeSearchText: vi.fn(),
        error: null,
        fetchNext: vi.fn(),
        next: null,
        searchText: '',
        status: 'idle',
        toggleFavorite: vi.fn,
        favorites: thumbnails,
      };
    });

    render(<Favorites />);

    const thumbElementList = screen.getAllByTestId('thumb');

    expect(thumbElementList.length).toBe(2);
  });
});
