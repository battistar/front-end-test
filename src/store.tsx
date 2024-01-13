import { ReactNode, createContext, useCallback, useContext, useMemo, useReducer } from 'react';
import { fetchThumbnails, isClientError } from './http/client';
import _ from 'lodash';
import { mapClientError, mapClientResponse } from './utils/data';

export type Thumbnail = {
  id: string;
  width: number;
  height: number;
  url: string;
  favorite: boolean;
};

export type NetworkError = { statusCode: number; description: string };

type Status = 'idle' | 'loading' | 'completed' | 'error';

type ThumbnailState = {
  thumbnails: Thumbnail[];
  next: string | null;
  searchText: string;
  status: Status;
  error: NetworkError | null;
};

type ThumbnailActions =
  | { type: 'SET_THUMBNAILS'; payload: { thumbnails: Thumbnail[]; append: boolean } }
  | { type: 'SET_NEXT'; payload: string | null }
  | { type: 'CHANGE_SEARCH_TEXT'; payload: string }
  | { type: 'TOGGLE_FAVORITE'; payload: string }
  | { type: 'SET_STATUS'; payload: Status }
  | { type: 'SET_ERROR'; payload: NetworkError | null };

const initialState: ThumbnailState = {
  thumbnails: [],
  next: null,
  searchText: '',
  status: 'idle',
  error: null,
};

const useThumbnailSource = (): {
  thumbnails: Thumbnail[];
  fetchNext: () => Promise<void>;
  searchText: string;
  changeSearchText: (text: string) => void;
  next: string | null;
  favorites: Thumbnail[];
  toggleFavorite: (id: string) => void;
  status: Status;
  error: NetworkError | null;
} => {
  const [{ thumbnails, searchText, next, status, error }, dispatch] = useReducer(
    (state: ThumbnailState, action: ThumbnailActions) => {
      switch (action.type) {
        case 'SET_THUMBNAILS':
          if (action.payload.append) {
            return { ...state, thumbnails: [...state.thumbnails, ...action.payload.thumbnails] };
          } else {
            return { ...state, thumbnails: action.payload.thumbnails };
          }
        case 'SET_NEXT':
          return { ...state, next: action.payload };
        case 'CHANGE_SEARCH_TEXT':
          return { ...state, searchText: action.payload };
        case 'TOGGLE_FAVORITE': {
          const thumbIndex = state.thumbnails.findIndex((thumbnail) => {
            return thumbnail.id === action.payload;
          });
          const favorite = state.thumbnails[thumbIndex].favorite;
          const thumb = { ...state.thumbnails[thumbIndex], favorite: !favorite };

          const thumbList = [...state.thumbnails];
          thumbList[thumbIndex] = thumb;

          return { ...state, thumbnails: thumbList };
        }
        case 'SET_STATUS':
          return { ...state, status: action.payload };
        case 'SET_ERROR':
          return { ...state, error: action.payload };
      }
    },
    initialState,
  );

  const fetch = useCallback(async (searchText: string): Promise<void> => {
    dispatch({ type: 'SET_STATUS', payload: 'loading' });
    dispatch({ type: 'SET_ERROR', payload: null });

    const response = await fetchThumbnails(searchText);

    if (isClientError(response)) {
      dispatch({ type: 'SET_STATUS', payload: 'error' });
      dispatch({ type: 'SET_ERROR', payload: mapClientError(response) });
    } else {
      const mappedResponse = mapClientResponse(response);

      dispatch({ type: 'SET_STATUS', payload: 'completed' });
      dispatch({ type: 'SET_NEXT', payload: mappedResponse.next });
      dispatch({ type: 'SET_THUMBNAILS', payload: { thumbnails: mappedResponse.thumbnails, append: false } });
    }
  }, []);

  const fetchNext = useCallback(async (): Promise<void> => {
    if (!next || !searchText) {
      return;
    }

    dispatch({ type: 'SET_STATUS', payload: 'loading' });
    dispatch({ type: 'SET_ERROR', payload: null });

    const response = await fetchThumbnails(searchText, next);

    if (isClientError(response)) {
      dispatch({ type: 'SET_STATUS', payload: 'error' });
      dispatch({ type: 'SET_ERROR', payload: mapClientError(response) });
    } else {
      const mappedResponse = mapClientResponse(response);

      dispatch({ type: 'SET_STATUS', payload: 'completed' });
      dispatch({ type: 'SET_NEXT', payload: mappedResponse.next });
      dispatch({ type: 'SET_THUMBNAILS', payload: { thumbnails: mappedResponse.thumbnails, append: true } });
    }
  }, [next, searchText]);

  const debouncedFetchData = useMemo(() => {
    return _.debounce(fetch, 500);
  }, [fetch]);

  const changeSearchText = useCallback(
    (text: string): void => {
      dispatch({ type: 'CHANGE_SEARCH_TEXT', payload: text });

      if (text) {
        dispatch({ type: 'SET_STATUS', payload: 'loading' });
        debouncedFetchData(text);
      }
    },
    [debouncedFetchData],
  );

  const toggleFavorite = useCallback((id: string): void => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: id });
  }, []);

  const favorites = useMemo(() => {
    return thumbnails.filter((thumbnail) => {
      return thumbnail.favorite;
    });
  }, [thumbnails]);

  return { thumbnails, fetchNext, searchText, changeSearchText, next, favorites, toggleFavorite, status, error };
};

const ThumbnailContext = createContext<ReturnType<typeof useThumbnailSource>>(
  {} as ReturnType<typeof useThumbnailSource>,
);

export const useThumbnail = (): ReturnType<typeof useThumbnailSource> => {
  return useContext(ThumbnailContext);
};

export const ThumbnailProvider = ({ children }: { children?: ReactNode }): JSX.Element => {
  return <ThumbnailContext.Provider value={useThumbnailSource()}>{children}</ThumbnailContext.Provider>;
};
