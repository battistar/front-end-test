import React, { ReactElement } from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { ThumbnailProvider } from './store';
import { ThemeProvider } from 'styled-components';
import theme from './theme';

const AllTheProviders = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <ThumbnailProvider>{children}</ThumbnailProvider>
    </ThemeProvider>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>): RenderResult => {
  return render(ui, { wrapper: AllTheProviders, ...options });
};

export * from '@testing-library/react';
export { customRender as render };
