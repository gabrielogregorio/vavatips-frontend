import { ReactNode, useEffect, useState } from 'react';
import { Navbar } from '@/layout/navbar';
import { Loader } from '@/base/loader';
import { Footer } from '@/layout/footer';
import { Breadcrumb } from '@/widgets/breadcrumb';
import { api } from '@/services/api';
import { navbarEnum } from '@/enums/navbar';
import Router from 'next/router';
import { Layout } from '@/layout/layout';
import { ErrorMsg } from '@/base/errorMsg';
import { SubContainer } from '@/base/subContainer';
import { modelNavbarAdmin } from '@/schemas/navbar';
import { logout } from '../../core/services/auth';

export const ItemList = ({ children }: { children: ReactNode }) => (
  <p className="dark:text-skin-white text-skin-gray-500">{children}</p>
);

const breadcrumbs = [
  { url: navbarEnum.Dashboard, text: 'admin' },
  { url: navbarEnum.Dashboard, text: 'dashboard' },
];

const Dashboard = () => {
  const [username, setUsername] = useState<string>('');
  const [errorMsg] = useState<string>('');
  const [activeLoader, setActiveLoader] = useState<boolean>(true);
  const [countViewsIps, setCountViewsIps] = useState<number>(0);
  const [countViewsAll, setCountViewsAll] = useState<number>(0);
  const [countAlAgents, setCountAlAgents] = useState<number>(0);
  const [countAlMaps, setCountAlMaps] = useState<number>(0);
  const [countAllPosts, setCountAllPosts] = useState<number>(0);
  const [countAllSuggestions, setCountAllSuggestions] = useState<number>(0);
  const [countAllUsers, setCountAllUsers] = useState<number>(0);

  useEffect(() => {
    api.get(`/dashboard`).then((res) => {
      setCountViewsAll(res.data.countAll);
      setCountViewsIps(res.data.countIps);
      setCountAlAgents(res.data.countAlAgents);
      setCountAlMaps(res.data.countAlMaps);
      setCountAllPosts(res.data.countAllPosts);
      setCountAllSuggestions(res.data.countAllSuggestions);
      setCountAllUsers(res.data.countAllUsers);
    });

    api
      .get(`/user`)
      .then((res) => {
        setUsername(res.data.username);
        setActiveLoader(false);
      })
      .catch((error) => {
        if (error?.response?.data?.msg === 'jwt expired') {
          setActiveLoader(false);
          logout();
          Router.push('/login');
        }
      });
  }, []);

  return (
    <Layout>
      <Navbar selected={navbarEnum.Dashboard} modelNavbar={modelNavbarAdmin} />
      <Breadcrumb breadcrumbs={breadcrumbs} />

      <SubContainer>
        <div className="max-w-maxWidthDefaultForm flex flex-col justify-start w-full">
          <Loader active={activeLoader} />
          <ErrorMsg msg={errorMsg} />
          <ItemList>Bem vindo(a) {username}</ItemList>
          <ItemList>Consultas: {countViewsAll}</ItemList>
          <ItemList>Usuários: {countViewsIps}</ItemList>
          <ItemList>agentes: {countAlAgents}</ItemList>
          <ItemList>mapas: {countAlMaps}</ItemList>
          <ItemList>posts: {countAllPosts}</ItemList>
          <ItemList>sugestões: {countAllSuggestions}</ItemList>
          <ItemList>administradores: {countAllUsers}</ItemList>
        </div>
      </SubContainer>
      <Footer />
    </Layout>
  );
};
export default Dashboard;
