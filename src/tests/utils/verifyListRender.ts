import { DATA_ALT, DATA_SRC } from '@/helpers/variables';
import defaultListFromRender from '@/mock/defaultListFromRender.json';
import { screen } from '@testing-library/react';

export const verifyListRender = (listRender = defaultListFromRender) => {
  const listOfImages = screen.getAllByRole('img');

  listRender.forEach(({ title, alt, src }, index) => {
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(listOfImages[index]).toHaveAttribute(DATA_ALT, alt);
    expect(listOfImages[index]).toHaveAttribute(DATA_SRC, src);
  });
};
