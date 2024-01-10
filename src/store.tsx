import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react';
import * as httpClient from './http/client';
import _ from 'lodash';

export type Thumbnail = {
  id: string;
  title: string;
  width: number;
  height: number;
  url: string;
};

type NetworkError = { statusCode: number; description: string };

type Status = 'idle' | 'loading' | 'completed' | 'error';

type ThumbnailState = {
  thumbnails: Thumbnail[];
  next: string | null;
  searchText: string;
  status: Status;
  error: NetworkError | null;
};

type ThumbnailActions =
  | { type: 'SET_THUMBNAILS'; payload: Thumbnail[] }
  | { type: 'SET_NEXT'; payload: string }
  | { type: 'CHANGE_SEARCH_TEXT'; payload: string }
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
  thumbnails: Thumbnail[] | null;
  searchText: string;
  changeSearchText: (text: string) => void;
  next: string | null;
  status: Status;
  error: NetworkError | null;
} => {
  const [{ thumbnails, searchText, next, status, error }, dispatch] = useReducer(
    (state: ThumbnailState, action: ThumbnailActions) => {
      switch (action.type) {
        case 'SET_THUMBNAILS':
          return { ...state, thumbnails: action.payload };
        case 'SET_NEXT':
          return { ...state, next: action.payload };
        case 'CHANGE_SEARCH_TEXT':
          return { ...state, searchText: action.payload };
        case 'SET_STATUS':
          return { ...state, status: action.payload };
        case 'SET_ERROR':
          return { ...state, error: action.payload };
      }
    },
    initialState,
  );

  const fetchData = useCallback(async (searchText: string, next?: string): Promise<void> => {
    const response = await httpClient.fetchThumbnails(searchText, next);

    if (httpClient.isError(response)) {
      dispatch({ type: 'SET_STATUS', payload: 'error' });
      dispatch({ type: 'SET_ERROR', payload: { statusCode: response.status, description: response.statusText } });
    } else {
      const thumbnails = response.data.children.map((child) => {
        return {
          id: child.data.name,
          title: child.data.title,
          width: child.data.thumbnail_width,
          height: child.data.thumbnail_height,
          url: child.data.thumbnail,
        };
      });

      dispatch({ type: 'SET_STATUS', payload: 'completed' });
      dispatch({ type: 'SET_NEXT', payload: response.data.after });
      dispatch({ type: 'SET_THUMBNAILS', payload: thumbnails });
    }
  }, []);

  const debouncedFetchThumbnails = useMemo(() => {
    return _.debounce(fetchData, 500);
  }, [fetchData]);

  useEffect(() => {
    if (searchText) {
      dispatch({ type: 'SET_STATUS', payload: 'loading' });
      debouncedFetchThumbnails(searchText);
    }
  }, [searchText, debouncedFetchThumbnails]);

  const changeSearchText = useCallback((text: string): void => {
    dispatch({ type: 'CHANGE_SEARCH_TEXT', payload: text });
  }, []);

  return { thumbnails, searchText, changeSearchText, next, status, error };
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
