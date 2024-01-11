import { test, expect, describe } from 'vitest';
import { render, screen } from '../../../test-utils';
import Error from './Error';

describe('Error', () => {
  test('should render error page', () => {
    render(<Error />);

    const textElement = screen.getByText('Page not found');
    const memeElement = screen.getByText('¯\\_(ツ)_/¯');

    expect(textElement).toBeDefined();
    expect(memeElement).toBeDefined();
  });
});
