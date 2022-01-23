import Button from './button';

type buttonType = {
  onClick: () => any;
};

export default function ButtonCloseModal({ onClick }: buttonType) {
  return (
    <Button onClick={onClick}>
      <i className="fas fa-times" />
    </Button>
  );
}
