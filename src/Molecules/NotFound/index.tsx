import { Text, TextVariantEnum } from '../../Atoms/Text';
import { Image } from '../../libs/image';
import { mergeClasses } from '../../libs/mergeClasses';

interface Props {
  className?: string;
}

export const NotFound = ({ className = '' }: Props) => {
  return (
    <div className={mergeClasses(`flex gap-3xl items-center`, className)}>
      <Image
        src={'/images/kj-in-notebook-kingdom.png'}
        width={100}
        className="select-none"
        height={140}
        alt="killjoy segurando um notebook kingdom"
        aria-hidden
        draggable={false}
      />

      <Text variant={TextVariantEnum.text} className="text-content-fg">
        Área Limpa! Ou pior, sem nada, será que eu preciso programar minha torreta pra te ajudar nessa busca?
      </Text>
    </div>
  );
};
