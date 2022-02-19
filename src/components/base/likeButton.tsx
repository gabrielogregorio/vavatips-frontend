import { MdBookmarkBorder, MdOutlineBookmark } from 'react-icons/md';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { RiAlertLine } from 'react-icons/ri';

const typeIconModel = {
  like: {
    default: AiOutlineHeart,
    selected: AiFillHeart,
    text: 'Testado',
    color: 'dark:text-skin-textColorInDarkness text-skin-textColorGray',
    colorSelected: 'text-skin-primaryExtra',
  },
  save: {
    default: MdBookmarkBorder,
    selected: MdOutlineBookmark,
    text: 'Salvar',
    color: 'dark:text-skin-textColorInDarkness text-skin-textColorGray',
    colorSelected: 'text-skin-secondary',
  },
  report: {
    default: RiAlertLine,
    selected: RiAlertLine,
    text: 'Sugerir',
    color: 'dark:text-skin-textColorInDarkness text-skin-textColorGray',
    colorSelected: 'dark:text-skin-textColorInDarkness text-skin-textColorGray',
  },
};

type selectedLikeButton = {
  selected: boolean;
  onClick: () => void;
  variant: 'like' | 'save' | 'report';
};

const PostButton = ({ selected, onClick, variant }: selectedLikeButton) => {
  const modelButton = typeIconModel[variant];
  const IconDisplayed = modelButton[selected ? 'selected' : 'default'];
  const textFromIcon = modelButton.text;
  const color = selected ? modelButton.colorSelected : modelButton.color;

  return (
    <button
      type="button"
      className={`m-1 flex items-center transition ${color}`}
      onClick={() => onClick()}>
      <IconDisplayed className={`mr-2 text-xl h-10 block ${selected ? 'animate-wiggle' : ''}`} />
      <span className={`hidden sm:block font-semibold ${selected ? 'animate-scale' : ''}`}>
        {textFromIcon}
      </span>
    </button>
  );
};

export default PostButton;