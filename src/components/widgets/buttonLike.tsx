import { Button } from '@/base/button';

type TPropsButtonLike = {
  active: boolean;
  title: string;
  styleBtn: 'testBtn' | 'likeBtn' | 'suggestionBtn';
  onClick: () => {};
};

export const ButtonLike = ({ styleBtn, title, onClick, active }: TPropsButtonLike) => (
  <Button className={`${styleBtn} ${active ? 'active' : ''}`} onClick={onClick}>
    {title}
  </Button>
);
