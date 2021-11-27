import './styles.module.css';

type styleType = 'testBtn' | 'likeBtn' | 'suggestionBtn';

interface propsInterface {
  active: boolean;
  title: string;
  styleBtn: styleType;
  onClick: (data: any) => void;
}

export const ButtonLike = (props: propsInterface) => {
  return (
    <button
      className={`${props.styleBtn} ${props.active ? 'active' : ''}`}
      onClick={props.onClick}>
      {props.title}
    </button>
  );
};
