import { ReactElement, ReactNode } from 'react';
import { Navbar } from '@/layout/navbar';
import { Loader } from '@/base/loader';
import { Breadcrumb } from '@/widgets/breadcrumb';
import { navbarEnum } from '@/enums/navbar';
import { Layout } from '@/layout/layout';
import { ErrorMsg } from '@/base/errorMsg';
import { SubContainer } from '@/base/subContainer';
import { modelNavbarAdmin } from '@/schemas/navbar';
import { useDashboard } from '@/hooks/useDashboard';
import { getKeysFromAnyObject } from '@/helpers/handleObjects';
import { Footer } from '@/layout/footer';

const keyLabel = {
  countAlAgents: 'agentes',
  countAlMaps: 'mapas',
  countAll: 'Consultas',
  countAllPosts: 'posts',
  countAllSuggestions: 'sugestões',
  countAllUsers: 'administradores',
  countIps: 'Usuários',
};

export const ItemList = ({ children }: { children: ReactNode }): ReactElement => (
  <p className="dark:text-skin-white text-skin-gray-500">{children}</p>
);

const breadcrumbs = [
  { text: 'admin', url: navbarEnum.Dashboard },
  { text: 'dashboard', url: navbarEnum.Dashboard },
];

const Dashboard = (): ReactElement => {
  const { info, username, errorMsg, isLoading } = useDashboard();

  const renderDashboardItems = (): ReactElement[] => {
    const itemsDashboard = getKeysFromAnyObject(info);

    return itemsDashboard.map((key) => (
      <ItemList key={key}>
        {keyLabel[key] ?? key}: {info?.[key].toString()}
      </ItemList>
    ));
  };

  return (
    <Layout>
      <Navbar selected={navbarEnum.Dashboard} modelNavbar={modelNavbarAdmin} />
      <Breadcrumb breadcrumbs={breadcrumbs} />

      <SubContainer>
        <div className="max-w-maxWidthDefaultForm flex flex-col justify-start w-full">
          <Loader active={isLoading} />
          <ErrorMsg msg={errorMsg} />
          <ItemList>Bem vindo(a) {username}</ItemList>

          {renderDashboardItems()}
        </div>
      </SubContainer>
      <Footer />
    </Layout>
  );
};
export default Dashboard;
