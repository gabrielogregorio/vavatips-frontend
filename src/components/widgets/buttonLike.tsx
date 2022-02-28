import Button from '@/base/button';

export interface PropsInterfaceButtonLike {
  active: boolean;
  title: string;
  styleBtn: 'testBtn' | 'likeBtn' | 'suggestionBtn';
  onClick: () => {};
}

const ButtonLike = ({ styleBtn, title, onClick, active }: PropsInterfaceButtonLike) => (
  <Button className={`${styleBtn} ${active ? 'active' : ''}`} onClick={onClick}>
    {title}
  </Button>
);
export default ButtonLike;
