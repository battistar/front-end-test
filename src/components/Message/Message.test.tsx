import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Message from './Message';

test('should render text passed from props', () => {
  render(<Message text="my text" />);
  const element = screen.getByText('my text');
  expect(element).toBeDefined();
});
