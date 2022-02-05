import React, { useEffect, useState } from 'react';
import NavbarComponent from '@/layout/navbar';
import LoaderComponent from '@/base/loader';
import FooterComponent from '@/layout/footer';
import BreadcrumbComponent from '@/widgets/breadcrumb';
import { logout } from '@/services/auth';
import api from '@/services/api';
import navbarEnum from '@/interfaces/navbar';
import Router from 'next/router';
import LayoutComponent from '@/layout/layout';
import ErrorMsg from '@/base/errorMsg';
import SubContainer from '@/base/subContainer';
import { modelNavbarAdmin } from '../../core/schemas/navbar';

const breadcrumbs = [
  { url: navbarEnum.Dashboard, text: 'admin' },
  { url: navbarEnum.Dashboard, text: 'dashboard' },
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
          Router.push('/login');
        }
      });
  }, []);

  return (
    <LayoutComponent>
      <NavbarComponent selected={navbarEnum.Dashboard} modelNavbar={modelNavbarAdmin} />
      <BreadcrumbComponent admin breadcrumbs={breadcrumbs} />

      <SubContainer>
        <LoaderComponent active={activeLoader} />
        <ErrorMsg msg={errorMsg} />

        <p>Bem vindo(a) {username}</p>

        <p>Consultas: {countViewsAll}</p>
        <p>Usuários: {countViewsIps}</p>

        <p>agentes: {countAlAgents}</p>
        <p>mapas: {countAlMaps}</p>
        <p>posts: {countAllPosts}</p>
        <p>sugestões: {countAllSuggestions}</p>
        <p>administradores: {countAllUsers}</p>
      </SubContainer>
      <FooterComponent />
    </LayoutComponent>
  );
}
