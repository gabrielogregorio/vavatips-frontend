import Button from '@/base/button';
import { propsInterfaceButtonLike } from '@/interfaces/posts';

export default function ButtonLike({ styleBtn, title, onClick, active }: propsInterfaceButtonLike) {
  return (
    <Button className={`${styleBtn} ${active ? 'active' : ''}`} onClick={onClick}>
      {title}
    </Button>
  );
}
