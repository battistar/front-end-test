import { test, expect, describe } from 'vitest';
import { render, screen } from '../../test-utils';
import Message from './Message';

describe('Message', () => {
  test('should render text passed from props', () => {
    render(<Message text="my text" />);

    const element = screen.getByText('my text');

    expect(element).toBeDefined();
  });
});
