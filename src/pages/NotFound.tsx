import { Title } from '../components/base/title';
import { FooterComponent } from '../components/layout/footer';

export const NotFoundScreen = () => {
  return (
    <div className="container">
      <Title>Not Found</Title>
      <FooterComponent color="primary" />
    </div>
  );
};
