import { render } from '@testing-library/react';
import { ModalComponent } from '../../components/widgets/modal';

describe('<ModalComponent />', () => {
  it('should render ModalComponent', () => {
    render(
      <ModalComponent
        _id="id item"
        title="title"
        description="description"
        image="image"
        closeModal={() => {
          return;
        }}
        saveModal={() => {
          return;
        }}
      />,
    );

    // expect(screen.getByTestId('modal')).toMatchSnapshot();
  });
});