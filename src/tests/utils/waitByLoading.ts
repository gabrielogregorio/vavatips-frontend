import { waitForElementToBeRemoved, screen } from '@testing-library/react';

export async function waitByLoading(): Promise<any> {
  let errors = '';
  try {
    await screen.findByText('Loading...');

    await waitForElementToBeRemoved(screen.queryByText('Loading...'), {
      timeout: 2000,
    });
  } catch (err) {
    errors = err;
  }

  return new Promise((resolve) => {
    resolve(errors);
  });
}
