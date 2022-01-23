import Button from '../base/button';

type styleType = 'testBtn' | 'likeBtn' | 'suggestionBtn';

interface propsInterface {
  active: boolean;
  title: string;
  styleBtn: styleType;
  onClick: () => {};
}

export default function ButtonLike({ styleBtn, title, onClick, active }: propsInterface) {
  return (
    <Button className={`${styleBtn} ${active ? 'active' : ''}`} onClick={onClick}>
      {title}
    </Button>
  );
}
