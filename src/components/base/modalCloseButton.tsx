import { Button } from './button';

export const ButtonCloseModal = ({ ...rest }: any) => {
  return (
    <Button {...rest}>
      <i className="fas fa-times"></i>
    </Button>
  );
};
