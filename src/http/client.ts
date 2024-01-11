import path from 'path';

const BASE_URL = 'https://www.reddit.com/';

export type ClientResponse = {
  data: {
    after: string;
    children: {
      data: {
        name: string;
        title: string;
        thumbnail_width: number;
        thumbnail_height: number;
        thumbnail: string;
      };
    }[];
  };
};

export type ClientError = {
  status: number;
  statusText: string;
};

export const fetchThumbnails = async (searchText: string, next?: string): Promise<ClientResponse | ClientError> => {
  const url = new URL(BASE_URL);

  const pathname = path.join('r', searchText, 'top.json');
  url.pathname = pathname;

  const searchParams = new URLSearchParams();
  searchParams.append('raw_json', '1');
  if (next) {
    searchParams.append('after', next);
  }
  url.search = searchParams.toString();

  const response = await fetch(url);

  if (response.status >= 200 && response.status < 300) {
    return (await response.json()) as ClientResponse;
  } else {
    return { status: response.status, statusText: response.statusText };
  }
};

export const isClientError = (response: ClientResponse | ClientError): response is ClientError => {
  return (response as ClientError).status !== undefined;
};
