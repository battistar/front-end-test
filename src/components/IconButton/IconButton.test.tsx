import { test, expect, describe } from 'vitest';
import { render, screen } from '../../test-utils';
import IconButton from './IconButton';
import icon from '../../assets/icon-search.png';

describe('IconButton', () => {
  test('should render button with icon passed from props', () => {
    render(<IconButton icon={icon} />);
    const element = screen.getByRole('button');
    expect(element).toBeDefined();
  });
});
