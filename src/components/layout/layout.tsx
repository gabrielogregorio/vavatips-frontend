import { useTheme } from '../../core/contexts/theme';

export default function LayoutComponent({ children }: any) {
  const { theme } = useTheme();

  return <div className={`${theme === '' ? '' : 'light'}`}>{children}</div>;
}
