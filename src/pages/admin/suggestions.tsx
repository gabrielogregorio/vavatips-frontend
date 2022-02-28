import { ReactNode, useEffect, useState } from 'react';
import Navbar from '@/layout/navbar';
import api from '@/services/api';
import Footer from '@/layout/footer';
import Breadcrumb from '@/widgets/breadcrumb';
import navbarEnum from '@/interfaces/navbar';
import Loader from '@/base/loader';
import Layout from '@/layout/layout';
import SubContainer from '@/base/subContainer';
import { modelNavbarAdmin } from '@/schemas/navbar';
import ErrorMsg from '../../components/base/errorMsg';

const breadcrumbs = [
  { url: navbarEnum.Dashboard, text: 'admin' },
  { url: navbarEnum.Dashboard, text: 'sugestões' },
];

interface suggestionInterface {
  id: string;
  postId: string;
  email: string;
  description: string;
  status: string;
}
const Th = ({ children }: { children: ReactNode }) => (
  <th className="text-base text-skin-white text-left">{children}</th>
);

const Td = ({ children }: { children: ReactNode }) => (
  <td className="px-5 pl-0 break-all text-base dark:text-skin-white text-skin-gray-500 text-left">
    {children}
  </td>
);

const SuggestionScreen = () => {
  const [suggestions, setSuggestions] = useState<suggestionInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  function loadSuggestion() {
    setLoading(true);
    api
      .get(`/suggestions`)
      .then((res) => {
        setSuggestions(res.data);
      })
      .catch((err) => {
        setError(err?.message || 'Erro no servidor');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    loadSuggestion();
  }, []);

  return (
    <Layout>
      <Navbar selected={navbarEnum.SuggestionScreen} modelNavbar={modelNavbarAdmin} />
      <Breadcrumb admin breadcrumbs={breadcrumbs} />

      <Loader active={loading} />
      <ErrorMsg msg={error} />

      <SubContainer>
        <table className="w-full max-w-maxWidthDefault">
          <thead className="border-b">
            <tr className="border-b">
              <Th>Post</Th>
              <Th>Email</Th>
              <Th>Descrição</Th>
              <Th>Status</Th>
            </tr>
          </thead>

          <tbody>
            {suggestions.map((report: suggestionInterface) => (
              <tr key={report.id} className="border-b">
                <Td>{report.postId}</Td>
                <Td>{report.email}</Td>
                <Td>{report.description}</Td>
                <Td>{report.status ?? 'Não atendido'}</Td>
              </tr>
            ))}
          </tbody>
        </table>
      </SubContainer>
      <Footer />
    </Layout>
  );
};
export default SuggestionScreen;
