import { render } from '@testing-library/react';
import ModalComponent from '@/widgets/modal';

describe('<ModalComponent />', () => {
  it('should render ModalComponent', () => {
    const fn = jest.fn();
    render(
      <ModalComponent
        id="id item"
        title="title"
        description="description"
        image="image"
        closeModal={() => {}}
        saveModal={() => fn()}
      />,
    );
  });
});
