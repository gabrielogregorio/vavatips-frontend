import { ReactNode } from 'react';
import { mergeClasses } from '../../libs/mergeClasses';

export enum TextAsEnum {
  'h1' = 'h1',
  'h2' = 'h2',
  'p' = 'p',
  'span' = 'span',
}

export enum TextVariantEnum {
  '4xl' = '4xl',
  'h1' = 'h1',
  'h2' = 'h2',
  'h2Highlight' = 'h2Highlight',
  'text' = 'text',
  'textUnderline' = 'textUnderline',
  'textBold' = 'textBold',
  'subtext' = 'subtext',
  'button' = 'button',
  'link' = 'link',
}

type TextProps = {
  variant?: TextVariantEnum;
  as?: TextAsEnum;
  className?: string;
  children?: ReactNode;
};

const variants: { [key in TextVariantEnum]: { as: TextAsEnum; classNames: string } } = {
  [TextVariantEnum['4xl']]: {
    as: TextAsEnum.span,
    classNames: 'font-poppins font-bold text-[36px] leading-[36px] tracking-[0%]',
  },

  [TextVariantEnum.h1]: {
    as: TextAsEnum.h1,
    classNames: 'font-poppins font-medium text-[24px] leading-[36px] tracking-[0%]',
  },

  [TextVariantEnum.h2]: {
    as: TextAsEnum.h2,
    classNames: 'font-poppins font-normal text-[20px] leading-[24px] tracking-[0%]',
  },

  [TextVariantEnum.h2Highlight]: {
    as: TextAsEnum.h2,
    classNames: 'font-poppins font-semibold text-[20px] leading-[24px] tracking-[0%]',
  },

  [TextVariantEnum.text]: {
    as: TextAsEnum.p,
    classNames: 'font-poppins font-normal text-[16px] leading-[24px] tracking-[0%]',
  },

  [TextVariantEnum.textUnderline]: {
    as: TextAsEnum.p,
    classNames: 'font-poppins font-normal text-[16px] leading-[24px] tracking-[0%] underline',
  },

  [TextVariantEnum.textBold]: {
    as: TextAsEnum.p,
    classNames: 'font-poppins font-semibold text-[16px] leading-[24px] tracking-[0%]',
  },

  [TextVariantEnum.button]: {
    as: TextAsEnum.span,
    classNames: 'font-poppins font-medium text-[16px] leading-[24px] tracking-[0%]',
  },

  [TextVariantEnum.link]: {
    as: TextAsEnum.span,
    classNames: 'font-poppins font-normal text-[16px] leading-[24px] tracking-[0%] underline',
  },
  [TextVariantEnum.subtext]: {
    as: TextAsEnum.span,
    classNames: 'font-poppins font-normal text-[12px] leading-[18px] tracking-[0%]',
  },
};

export const Text = ({
  variant = TextVariantEnum.text,
  as: asTag = undefined,
  className = '',
  children = undefined,
}: TextProps) => {
  const currentVariant = variants[variant] || variants['text'];

  const Tag = asTag || currentVariant.as;
  const classes = currentVariant.classNames;

  return <Tag className={mergeClasses(classes, className)}>{children}</Tag>;
};
