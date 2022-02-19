import Button from '@/base/button';

export interface propsInterfaceButtonLike {
  active: boolean;
  title: string;
  styleBtn: 'testBtn' | 'likeBtn' | 'suggestionBtn';
  onClick: () => {};
}

const ButtonLike = ({ styleBtn, title, onClick, active }: propsInterfaceButtonLike) => (
  <Button className={`${styleBtn} ${active ? 'active' : ''}`} onClick={onClick}>
    {title}
  </Button>
);
export default ButtonLike;
