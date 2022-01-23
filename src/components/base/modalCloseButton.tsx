import { FaTimes } from 'react-icons/fa';
import Button from './button';

type buttonType = {
  onClick: () => any;
};

export default function ButtonCloseModal({ onClick }: buttonType) {
  return (
    <Button onClick={onClick}>
      <FaTimes />
    </Button>
  );
}
