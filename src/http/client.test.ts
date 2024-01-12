/* eslint-disable camelcase */
import { test, describe, vi, Mock, expect } from 'vitest';
import { ClientResponse } from './client';
import * as client from './client';

const thumbnails: ClientResponse = {
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
    ],
  },
};

const error: client.ClientError = {
  status: 404,
  statusText: 'not found',
};

describe('HttpClient', () => {
  test('should response with thumbnail list', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(
      vi.fn(async () =>
        Promise.resolve({ json: async () => Promise.resolve(thumbnails), ok: true, status: 200 }),
      ) as Mock,
    );

    const response = await client.fetchThumbnails('thumb');

    expect(response).toStrictEqual(thumbnails);
  });

  test('should response with error', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(
      vi.fn(async () => Promise.resolve({ ok: false, status: 404, statusText: 'not found' })) as Mock,
    );

    const response = await client.fetchThumbnails('thumb');

    expect(response).toStrictEqual(error);
  });
});
