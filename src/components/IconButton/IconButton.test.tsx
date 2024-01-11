import { test, expect, describe, vi } from 'vitest';
import { render, screen } from '../../test-utils';
import IconButton from './IconButton';
import icon from '../../assets/icon-search.png';

const mockedOnClick = vi.fn();

describe('IconButton', () => {
  test('should render button with icon passed from props', () => {
    render(<IconButton icon={icon} />);
    const element = screen.getByRole('button');
    expect(element).toBeDefined();
  });

  test('should be able to click the button', () => {
    render(<IconButton icon={icon} />);
  });
});
