import { useEffect, useState } from 'react';
import NavbarComponent from '@/layout/navbar';
import api from '@/services/api';
import FooterComponent from '@/layout/footer';
import BreadcrumbComponent from '@/widgets/breadcrumb';
import navbarEnum from '@/interfaces/navbar';
import LoaderComponent from '@/base/loader';
import LayoutComponent from '@/layout/layout';
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
      <tr key={report.id} className="border-b">
        <td className="px-5 pl-0 break-all text-base dark:text-skin-gray-400 text-skin-gray-500 text-left">
          {report.postId}
        </td>
        <td className="px-5 pl-0 break-all text-base dark:text-skin-gray-400 text-skin-gray-500 text-left">
          {report.email}
        </td>
        <td className="px-5 pl-0 break-all text-base dark:text-skin-gray-400 text-skin-gray-500 text-left">
          {report.description}
        </td>
        <td className="px-5 pl-0 break-all text-base dark:text-skin-gray-400 text-skin-gray-500 text-left">
          {report.status ?? 'Não atendido'}
        </td>
      </tr>
    ));
  }

  return (
    <LayoutComponent>
      <NavbarComponent selected={navbarEnum.SuggestionScreen} modelNavbar={modelNavbarAdmin} />
      <BreadcrumbComponent admin breadcrumbs={breadcrumbs} />

      <LoaderComponent active={loading} />
      <ErrorMsg msg={error} />

      <SubContainer>
        <table className="w-full max-w-maxWidthDefault">
          <thead className="border-b">
            <tr>
              <th className="text-base text-skin-gray-400 text-left">Post</th>
              <th className="text-base text-skin-gray-400 text-left">Email</th>
              <th className="text-base text-skin-gray-400 text-left">Descrição</th>
              <th className="text-base text-skin-gray-400 text-left">Status</th>
            </tr>
          </thead>

          <tbody>{renderSuggestions()}</tbody>
        </table>
      </SubContainer>
      <FooterComponent />
    </LayoutComponent>
  );
};
export default SuggestionScreen;
