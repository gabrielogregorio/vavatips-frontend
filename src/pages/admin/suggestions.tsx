import React, { useEffect, useState } from 'react';
import NavbarComponent from '@/layout/navbar';
import api from '@/services/api';
import FooterComponent from '@/layout/footer';
import BreadcrumbComponent from '@/widgets/breadcrumb';
import navbarEnum from '@/interfaces/navbar';
import LoaderComponent from '@/base/loader';
import LayoutComponent from '@/layout/layout';
import SubContainer from '@/base/subContainer';
import { modelNavbarAdmin } from '@/schemas/navbar';

const breadcrumbs = [
  { url: navbarEnum.Dashboard, text: 'admin' },
  { url: navbarEnum.Dashboard, text: 'sugestões' },
];

export default function SuggestionScreen() {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  async function loadSuggestion() {
    setLoading(true);
    const suggestionResponse = api.get(`/suggestions`);

    try {
      const [suggestion] = await Promise.all([suggestionResponse]);
      const suggestionJson = suggestion.data;
      setSuggestions(suggestionJson);
      // eslint-disable-next-line no-empty
    } catch (error) {}
    setLoading(false);
  }

  useEffect(() => {
    loadSuggestion();
  }, []);

  function renderSuggestions() {
    return suggestions.map((report) => (
      <tr key={report.id} className="border-b">
        <td className="px-5 pl-0 break-all text-base text-skin-textColor text-left">
          {report.postId}
        </td>
        <td className="px-5 pl-0 break-all text-base text-skin-textColor text-left">
          {report.email}
        </td>
        <td className="px-5 pl-0 break-all text-base text-skin-textColor text-left">
          {report.description}
        </td>
        <td className="px-5 pl-0 break-all text-base text-skin-textColor text-left">
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

      <SubContainer>
        <table className="w-full max-w-maxWidthDefault">
          <thead className="border-b">
            <tr>
              <th className="text-base text-skin-textColor text-left">Post</th>
              <th className="text-base text-skin-textColor text-left">Email</th>
              <th className="text-base text-skin-textColor text-left">Descrição</th>
              <th className="text-base text-skin-textColor text-left">Status</th>
            </tr>
          </thead>

          <tbody>{renderSuggestions()}</tbody>
        </table>
      </SubContainer>
      <FooterComponent />
    </LayoutComponent>
  );
}
