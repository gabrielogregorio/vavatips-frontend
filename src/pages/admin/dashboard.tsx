import React, { useEffect, useState } from 'react';
import api from '../../core/services/api';
import NavbarComponent from '../../components/layout/navbar';
import { logout } from '../../core/services/auth';
import LoaderComponent from '../../components/base/loader';
import FooterComponent from '../../components/layout/footer';
import BreadcrumbComponent from '../../components/widgets/breadcrumb';
import { navbarEnum } from '../../interfaces/navbar';

const breadcrumbs = [
  { url: '/Dashboard', text: 'admin' },
  { url: '/Dashboard', text: 'admin/dashboard' },
];

export default function DashboardScreen() {
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
        }
      });
  }, []);

  return (
    <div className="container">
      <NavbarComponent selected={navbarEnum.Dashboard} />
      <BreadcrumbComponent admin breadcrumbs={breadcrumbs} />

      <div className="subcontainer">
        <LoaderComponent active={activeLoader} />
        <p>{errorMsg}</p>

        <p>Bem vindo(a) {username}</p>

        <p>Consultas: {countViewsAll}</p>
        <p>Usuários: {countViewsIps}</p>

        <p>agentes: {countAlAgents}</p>
        <p>mapas: {countAlMaps}</p>
        <p>posts: {countAllPosts}</p>
        <p>sugestões: {countAllSuggestions}</p>
        <p>administradores: {countAllUsers}</p>
      </div>
      <FooterComponent color="secundary" />
    </div>
  );
}
