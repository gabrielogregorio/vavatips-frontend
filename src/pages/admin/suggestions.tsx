import { useEffect, useState } from 'react';
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
import { Table, Tbody, Td, Th, Thead, Tr } from '../../components/base/table';

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

  function renderSuggestions() {
    return suggestions.map((report: suggestionInterface) => (
      <div className={report.id}>
        <Tr keyItem={report.id}>
          <Td>{report.postId}</Td>
          <Td>{report.email}</Td>
          <Td>{report.description}</Td>
          <Td>{report.status ?? 'Não atendido'}</Td>
        </Tr>
      </div>
    ));
  }

  return (
    <Layout>
      <Navbar selected={navbarEnum.SuggestionScreen} modelNavbar={modelNavbarAdmin} />
      <Breadcrumb admin breadcrumbs={breadcrumbs} />

      <Loader active={loading} />
      <ErrorMsg msg={error} />

      <SubContainer>
        <Table>
          <Thead>
            <Tr keyItem={1}>
              <Th>Post</Th>
              <Th>Email</Th>
              <Th>Descrição</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>

          <Tbody>{renderSuggestions()}</Tbody>
        </Table>
      </SubContainer>
      <Footer />
    </Layout>
  );
};
export default SuggestionScreen;
