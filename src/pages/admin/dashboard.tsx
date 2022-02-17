import { useEffect, useState } from 'react';
import NavbarComponent from '@/layout/navbar';
import LoaderComponent from '@/base/loader';
import FooterComponent from '@/layout/footer';
import BreadcrumbComponent from '@/widgets/breadcrumb';
import api from '@/services/api';
import navbarEnum from '@/interfaces/navbar';
import Router from 'next/router';
import LayoutComponent from '@/layout/layout';
import ErrorMsg from '@/base/errorMsg';
import SubContainer from '@/base/subContainer';
import { modelNavbarAdmin } from '@/schemas/navbar';
import { logout } from '../../core/services/auth';

const breadcrumbs = [
  { url: navbarEnum.Dashboard, text: 'admin' },
  { url: navbarEnum.Dashboard, text: 'dashboard' },
];

const DashboardScreen = () => {
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
    <LayoutComponent>
      <NavbarComponent selected={navbarEnum.Dashboard} modelNavbar={modelNavbarAdmin} />
      <BreadcrumbComponent admin breadcrumbs={breadcrumbs} />

      <SubContainer>
        <div className="max-w-maxWidthDefaultForm flex flex-col justify-start w-full">
          <LoaderComponent active={activeLoader} />
          <ErrorMsg msg={errorMsg} />
          <p className="text-skin-textColor">Bem vindo(a) {username}</p>
          <p className="text-skin-textColor">Consultas: {countViewsAll}</p>
          <p className="text-skin-textColor">Usuários: {countViewsIps}</p>
          <p className="text-skin-textColor">agentes: {countAlAgents}</p>
          <p className="text-skin-textColor">mapas: {countAlMaps}</p>
          <p className="text-skin-textColor">posts: {countAllPosts}</p>
          <p className="text-skin-textColor">sugestões: {countAllSuggestions}</p>
          <p className="text-skin-textColor">administradores: {countAllUsers}</p>
        </div>
      </SubContainer>
      <FooterComponent />
    </LayoutComponent>
  );
};
export default DashboardScreen;
