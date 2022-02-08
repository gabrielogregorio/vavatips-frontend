import { waitForElementToBeRemoved, screen } from '@testing-library/react';

export default async function waitByLoading() {
  try {
    await screen.findByText('Loading...');

    await waitForElementToBeRemoved(screen.queryByText('Loading...'), {
      timeout: 2000,
    });
  } catch (error) {}
}
