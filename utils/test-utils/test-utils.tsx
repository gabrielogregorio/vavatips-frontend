import { render } from '@testing-library/react';
import { queries, within, RenderOptions } from '@testing-library/react';
import * as customQueries from './custom-queries';
import { ReactElement } from 'react';
import React from 'react';

const allQueries = {
  ...queries,
  ...customQueries,
};

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    // <ThemeProvider theme="light">
    // <TranslationProvider messages={defaultStrings}>
    <div>{children}</div>
    // </TranslationProvider>
    // </ThemeProvider>
  );
};

const customScreen = within(document.body, allQueries);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const customWithin = (element: ReactElement) => within(element, allQueries);
const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'queries'>) =>
  render(ui, { wrapper: AllTheProviders, queries: allQueries, ...options });

export * from '@testing-library/react';
export { customScreen as screen, customWithin as within, customRender as render };
