/* eslint-disable camelcase */
import { test, expect, describe, vi, beforeEach } from 'vitest';
import { fireEvent, render, screen, waitFor } from '../../../test-utils';
import Home from './Home';
import * as store from '../../../store';
import { MemoryRouter } from 'react-router-dom';
import * as client from '../../../http/client';

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

const clientResponse: client.ClientResponse = {
  data: {
    after: null,
    children: [
      {
        data: {
          name: '1',
          title: 'thumb',
          thumbnail_width: 100,
          thumbnail_height: 100,
          thumbnail: 'thumb',
        },
      },
      {
        data: {
          name: '2',
          title: 'thumb',
          thumbnail_width: 100,
          thumbnail_height: 100,
          thumbnail: 'thumb',
        },
      },
      {
        data: {
          name: '3',
          title: 'thumb',
          thumbnail_width: 100,
          thumbnail_height: 100,
          thumbnail: 'thumb',
        },
      },
      {
        data: {
          name: '4',
          title: 'thumb',
          thumbnail_width: 100,
          thumbnail_height: 100,
          thumbnail: 'thumb',
        },
      },
    ],
  },
};

const clientError: client.ClientError = {
  status: 404,
  statusText: 'not found',
};

const Wrapper = (): JSX.Element => {
  return (
    <MemoryRouter initialEntries={['/']}>
      <Home />
    </MemoryRouter>
  );
};

beforeEach(() => {
  vi.restoreAllMocks();
});

describe('Home', () => {
  test('should render page with no data', () => {
    render(<Wrapper />);

    const searchElement = screen.getByPlaceholderText('Search...');
    const buttonElement = screen.getByRole('button');

    expect(searchElement).toBeDefined();
    expect(buttonElement).toBeDefined();
  });

  test('should render page with some thumbnails', () => {
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
    const thumbElementList = screen.getAllByTestId('cell');

    expect(searchElement).toBeDefined();
    expect(buttonElementList.length).toBe(5);
    expect(thumbElementList.length).toBe(4);
  });

  test('should render page with thumbnails on text change', async () => {
    render(<Wrapper />);

    vi.spyOn(client, 'fetchThumbnails').mockImplementation(vi.fn(async () => Promise.resolve(clientResponse)));

    const searchElement = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchElement, { target: { value: 'search' } });

    await waitFor(() => {
      const buttonElementList = screen.getAllByRole('button');
      const thumbElementList = screen.getAllByTestId('cell');

      expect(searchElement).toBeDefined();
      expect(buttonElementList.length).toBe(5);
      expect(thumbElementList.length).toBe(4);
    });
  });

  test('should render page with message on client error', async () => {
    render(<Wrapper />);

    vi.spyOn(client, 'fetchThumbnails').mockImplementation(vi.fn(async () => Promise.resolve(clientError)));

    const searchElement = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchElement, { target: { value: 'wrong search' } });

    await waitFor(() => {
      const messageElement = screen.getByText('Data not found');

      expect(searchElement).toBeDefined();
      expect(messageElement).toBeDefined();
    });
  });
});
