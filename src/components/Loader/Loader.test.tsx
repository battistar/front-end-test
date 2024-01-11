import { test, expect, describe } from 'vitest';
import { render } from '../../test-utils';
import Loader from './Loader';

describe('Loader', () => {
  test('should render element', () => {
    const { container } = render(<Loader />);

    expect(container).toBeDefined();
  });
});
