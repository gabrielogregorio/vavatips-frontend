import React from 'react';
import { FaTimes } from 'react-icons/fa';
import Button from './button';

type buttonType = {
  onClick: () => void;
};

const ButtonCloseModal = ({ onClick }: buttonType) => (
  <Button onClick={onClick} dataTestid="closeModal" className="text-skin-textColor">
    <FaTimes />
  </Button>
);

export default ButtonCloseModal;
