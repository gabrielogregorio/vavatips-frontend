import { render } from '@testing-library/react';
import { Modal } from '@/widgets/modal';

describe('<Modal />', () => {
  it('should render Modal', () => {
    const fnMock = jest.fn();
    render(
      <Modal
        id="id item"
        title="title"
        description="description"
        image="/image"
        closeModal={() => jest.fn()}
        saveModal={() => fnMock()}
      />,
    );
  });
});
