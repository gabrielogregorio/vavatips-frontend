import { MdBookmarkBorder, MdOutlineBookmark } from 'react-icons/md';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { RiAlertLine } from 'react-icons/ri';

const darkButton = 'dark:text-skin-white text-skin-gray-500';

const typeIconModel = {
  like: {
    color: darkButton,
    colorSelected: 'text-skin-secondary-regular',
    default: AiOutlineHeart,
    selected: AiFillHeart,
    text: 'Testado',
  },
  report: {
    color: darkButton,
    colorSelected: darkButton,
    default: RiAlertLine,
    selected: RiAlertLine,
    text: 'Sugerir',
  },
  save: {
    color: darkButton,
    colorSelected: 'text-skin-primary-light',
    default: MdBookmarkBorder,
    selected: MdOutlineBookmark,
    text: 'Salvar',
  },
};

type selectedLikeButton = {
  selected: boolean;
  onClick: () => void;
  variant: 'like' | 'save' | 'report';
  ariaLabel: string;
};

export const PostButton = ({ selected, onClick, variant, ariaLabel }: selectedLikeButton) => {
  const modelButton = typeIconModel[variant];
  const IconDisplayed = modelButton[selected ? 'selected' : 'default'];
  const textFromIcon = modelButton.text;
  const color = selected ? modelButton.colorSelected : modelButton.color;

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={`m-1 p-2 w-full flex items-center justify-center transition ${color}`}
      onClick={() => onClick()}>
      <IconDisplayed className={`mr-2 text-xl h-10 block ${selected ? 'animate-wiggle' : ''}`} />
      <span className={`hidden sm:block font-semibold ${selected ? 'animate-scale' : ''}`}>{textFromIcon}</span>
    </button>
  );
};
