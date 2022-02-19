import { FaTimes } from 'react-icons/fa';
import Button from './button';

type buttonType = {
  onClick: () => void;
};

const ButtonCloseModal = ({ onClick }: buttonType) => (
  <Button
    onClick={onClick}
    dataTestid="closeModal"
    className="dark:text-skin-textColor text-skin-textColorGray">
    <FaTimes />
  </Button>
);

export default ButtonCloseModal;
