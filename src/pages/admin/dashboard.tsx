import { ReactNode } from 'react';
import { Navbar } from '@/layout/navbar';
import { Loader } from '@/base/loader';
import { Footer } from '@/layout/footer';
import { Breadcrumb } from '@/widgets/breadcrumb';
import { navbarEnum } from '@/enums/navbar';
import { Layout } from '@/layout/layout';
import { ErrorMsg } from '@/base/errorMsg';
import { SubContainer } from '@/base/subContainer';
import { modelNavbarAdmin } from '@/schemas/navbar';
import { useDashboard } from '@/hooks/useDashboard';
import { getKeysFromAnyObject } from '@/helpers/handleObjects';

const keyLabel = {
  countAll: 'Consultas',
  countIps: 'Usuários',
  countAllPosts: 'posts',
  countAlMaps: 'mapas',
  countAlAgents: 'agentes',
  countAllSuggestions: 'sugestões',
  countAllUsers: 'administradores',
};

export const ItemList = ({ children }: { children: ReactNode }) => (
  <p className="dark:text-skin-white text-skin-gray-500">{children}</p>
);

const breadcrumbs = [
  { url: navbarEnum.Dashboard, text: 'admin' },
  { url: navbarEnum.Dashboard, text: 'dashboard' },
];

const Dashboard = () => {
  const { info, username, errorMsg, isLoading } = useDashboard();

  const renderDashboardItems = () => {
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
