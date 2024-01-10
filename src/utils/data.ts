import { ClientError, ClientResponse } from '../http/client';
import { NetworkError, Thumbnail } from '../store';

export const mapClientResponse = (response: ClientResponse): { thumbnails: Thumbnail[]; next: string | null } => {
  const thumbnails = response.data.children.map((child) => {
    return {
      id: child.data.name,
      width: child.data.thumbnail_width,
      height: child.data.thumbnail_height,
      url: child.data.thumbnail,
      favorite: false,
    };
  });

  return { thumbnails: thumbnails, next: response.data.after };
};

export const mapClientError = (response: ClientError): NetworkError => {
  return { statusCode: response.status, description: response.statusText };
};
