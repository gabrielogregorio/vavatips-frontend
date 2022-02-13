import Button from '@/base/button';

export interface propsInterfaceButtonLike {
  active: boolean;
  title: string;
  styleBtn: 'testBtn' | 'likeBtn' | 'suggestionBtn';
  onClick: () => {};
}

export default function ButtonLike({ styleBtn, title, onClick, active }: propsInterfaceButtonLike) {
  return (
    <Button className={`${styleBtn} ${active ? 'active' : ''}`} onClick={onClick}>
      {title}
    </Button>
  );
}
