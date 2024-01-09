import path from 'path';

const BASE_URL = 'https://www.reddit.com/';

type Thumbnails = {
  data: {
    after: string;
    children: {
      data: {
        title: string;
        thumbnail_width: number;
        thumbnail_height: number;
        thumbnail: string;
      };
    }[];
  };
};

type Error = {
  status: number;
  statusText: string;
};

export const fetchThumbnails = async (searchText: string, next?: string): Promise<Thumbnails | Error> => {
  const url = new URL(BASE_URL);
  const pathname = path.join('r', searchText, 'top.json');
  url.pathname = pathname;

  if (next) {
    url.search = new URLSearchParams({ after: next }).toString();
  }

  const response = await fetch(url);

  if (response.status >= 200 && response.status < 300) {
    return (await response.json()) as Thumbnails;
  } else {
    return { status: response.status, statusText: response.statusText };
  }
};

export const isError = (response: Thumbnails | Error): response is Error => {
  return (response as Error).status !== undefined;
};
