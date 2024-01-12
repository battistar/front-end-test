import { test, expect, describe } from 'vitest';
import { render, screen } from '../../test-utils';
import ThumbnailCell from './ThumbnailCell';
import { Thumbnail } from '../../store';

const thumbnail: Thumbnail = {
  id: '1',
  width: 140,
  height: 140,
  url: '',
  favorite: false,
};

describe('ThumbnailCell', () => {
  test('should render element', () => {
    render(<ThumbnailCell thumbnail={thumbnail} />);

    const buttonElement = screen.getByRole('button');
    const cellElementList = screen.getByText(/^[0-9]+x[0-9]+$/);
    const thumbElement = screen.getByTestId('cell');

    expect(buttonElement).toBeDefined();
    expect(cellElementList).toBeDefined();
    expect(thumbElement).toBeDefined();
  });
});
