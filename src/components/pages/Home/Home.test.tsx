import { test, expect, describe, vi } from 'vitest';
import { render, screen } from '../../../test-utils';
import Home from './Home';
import * as store from '../../../store';
import { MemoryRouter } from 'react-router-dom';

const thumbnails: store.Thumbnail[] = [
  {
    id: '1',
    width: 140,
    height: 140,
    url: '',
    favorite: true,
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

const Wrapper = (): JSX.Element => {
  return (
    <MemoryRouter initialEntries={['/']}>
      <Home />
    </MemoryRouter>
  );
};

describe('Home', () => {
  test('should render page with no data', () => {
    render(<Wrapper />);

    const searchElement = screen.getByPlaceholderText('Search...');
    const buttonElement = screen.getByRole('button');

    expect(searchElement).toBeDefined();
    expect(buttonElement).toBeDefined();
  });

  test('should render page with some favorites', () => {
    vi.spyOn(store, 'useThumbnail').mockImplementation(() => {
      return {
        thumbnails: thumbnails,
        changeSearchText: vi.fn(),
        error: null,
        fetchNext: vi.fn(),
        next: null,
        searchText: '',
        status: 'idle',
        toggleFavorite: vi.fn,
        favorites: [],
      };
    });

    render(<Wrapper />);

    const searchElement = screen.getByPlaceholderText('Search...');
    const buttonElementList = screen.getAllByRole('button');
    const thumbElementList = screen.getAllByTestId('thumb');

    expect(searchElement).toBeDefined();
    expect(buttonElementList.length).toBe(5);
    expect(thumbElementList.length).toBe(4);
  });
});
