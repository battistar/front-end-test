import { ReactNode, createContext, useCallback, useContext, useReducer } from 'react';
import * as httpClient from './http/client';
import _ from 'lodash';

type Thumbnail = {
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
  | { type: 'SET_THUMBNAIL_LIST'; payload: Thumbnail[] }
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
  fetchThumbnails: (searchText: string, next?: string) => void;
  searchText: string;
  changeSearchText: (text: string) => void;
  next: string | null;
  status: Status;
  error: NetworkError | null;
} => {
  const [{ thumbnails, searchText, next, status, error }, dispatch] = useReducer(
    (state: ThumbnailState, action: ThumbnailActions) => {
      switch (action.type) {
        case 'SET_THUMBNAIL_LIST':
          return { ...state, thumbnailList: action.payload };
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

  const fetchThumbnails = useCallback(async (searchText: string, next?: string, debounce?: boolean): Promise<void> => {
    const fetchData = async (): Promise<void> => {
      let response;
      if (next) {
        response = await httpClient.fetchThumbnails(searchText);
      } else {
        response = await httpClient.fetchThumbnails(searchText, next);
      }

      if (httpClient.isError(response)) {
        dispatch({ type: 'SET_STATUS', payload: 'error' });
        dispatch({ type: 'SET_ERROR', payload: { statusCode: response.status, description: response.statusText } });
      } else {
        const thumbnails = response.data.children.map((child) => {
          return {
            title: child.data.title,
            width: child.data.thumbnail_width,
            height: child.data.thumbnail_height,
            url: child.data.thumbnail,
          };
        });

        dispatch({ type: 'SET_STATUS', payload: 'completed' });
        dispatch({ type: 'SET_NEXT', payload: response.data.after });
        dispatch({ type: 'SET_THUMBNAIL_LIST', payload: thumbnails });
      }
    };

    const debouncedFetchData = _.debounce(fetchData, debounce ? 0 : 500);

    dispatch({ type: 'SET_STATUS', payload: 'loading' });
    debouncedFetchData();
  }, []);

  const changeSearchText = useCallback((text: string): void => {
    dispatch({ type: 'CHANGE_SEARCH_TEXT', payload: text });
  }, []);

  return { thumbnails, fetchThumbnails, searchText, changeSearchText, next, status, error };
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
