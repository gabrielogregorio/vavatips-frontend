import { waitForElementToBeRemoved, screen } from '@testing-library/react';

export default async function waitByLoading() {
  try {
    await screen.findByText(/Loading.../i);

    await waitForElementToBeRemoved(screen.queryByText('Loading...'), {
      timeout: 2000,
    });
    // eslint-disable-next-line no-empty
  } catch (error) {}
}
