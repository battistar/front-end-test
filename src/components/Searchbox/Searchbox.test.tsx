import { test, expect, describe } from 'vitest';
import { fireEvent, render, screen, within } from '../../test-utils';
import Searchbox from './Searchbox';
import { useState } from 'react';

describe('Searchbox', () => {
  test('should render input element with placeholder', () => {
    render(<Searchbox placeholder="search" />);

    const element = screen.getByPlaceholderText('search');

    expect(element).toBeDefined();
  });

  test('should be able to type in input', () => {
    const Wrapper = (): JSX.Element => {
      const [input, setInput] = useState('');

      const handleChange = (text: string): void => {
        setInput(text);
      };

      return <Searchbox value={input} onChange={handleChange} />;
    };

    render(<Wrapper />);
    const element = screen.getByRole('textbox') as HTMLInputElement;

    const inputText = 'input text';

    fireEvent.change(element, { target: { value: inputText } });
    expect(element.value).toBe(inputText);
  });

  test('should render input element with loader', () => {
    const { container } = render(<Searchbox placeholder="search" loading />);

    const loaderElement = within(container).getByTestId('loader');

    expect(loaderElement).toBeDefined();
  });
});
