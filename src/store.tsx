import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react';
import { fetchThumbnails, ClientError, ClientResponse, isClientError } from './http/client';
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
  | { type: 'SET_THUMBNAILS'; payload: { thumbnails: Thumbnail[]; append: boolean } }
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
  fetchNext: () => Promise<void>;
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
          if (action.payload.append) {
            return { ...state, thumbnails: [...state.thumbnails, ...action.payload.thumbnails] };
          } else {
            return { ...state, thumbnails: action.payload.thumbnails };
          }
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

  const mapClientResponse = useCallback((response: ClientResponse) => {
    const thumbnails = response.data.children.map((child) => {
      return {
        id: child.data.name,
        title: child.data.title,
        width: child.data.thumbnail_width,
        height: child.data.thumbnail_height,
        url: child.data.thumbnail,
      };
    });

    return { thumbnails: thumbnails, next: response.data.after };
  }, []);

  const mapClientError = useCallback((response: ClientError) => {
    return { statusCode: response.status, description: response.statusText };
  }, []);

  const fetch = useCallback(
    async (searchText: string): Promise<void> => {
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
    },
    [mapClientError, mapClientResponse],
  );

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
  }, [mapClientError, mapClientResponse, next, searchText]);

  const debouncedFetchData = useMemo(() => {
    return _.debounce(fetch, 500);
  }, [fetch]);

  useEffect(() => {
    if (searchText) {
      dispatch({ type: 'SET_STATUS', payload: 'loading' });
      debouncedFetchData(searchText);
    }
  }, [searchText, debouncedFetchData]);

  const changeSearchText = useCallback((text: string): void => {
    dispatch({ type: 'CHANGE_SEARCH_TEXT', payload: text });
  }, []);

  return { thumbnails, fetchNext, searchText, changeSearchText, next, status, error };
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
