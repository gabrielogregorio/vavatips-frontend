import React, { useEffect, useState } from 'react';
import NavbarComponent from '@/layout/navbar';
import api from '@/services/api';
import FooterComponent from '@/layout/footer';
import BreadcrumbComponent from '@/widgets/breadcrumb';
import { navbarEnum } from '@/interfaces/navbar';
import LoaderComponent from '../../components/base/loader';

const breadcrumbs = [
  { url: '/Dashboard', text: 'administrativo' },
  { url: '/Dashboard', text: 'sugestões' },
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
      <tr key={report.id}>
        <td>{report.postId}</td>
        <td>{report.email}</td>
        <td>{report.description}</td>
        <td>{report.status ?? 'Não atendido'}</td>
      </tr>
    ));
  }

  return (
    <div className="container">
      <NavbarComponent selected={navbarEnum.SuggestionScreen} />
      <BreadcrumbComponent admin breadcrumbs={breadcrumbs} />

      <LoaderComponent active={loading} />

      <div className="sub__container">
        <table>
          <thead>
            <tr>
              <th>Post</th>
              <th>Email</th>
              <th>Descrição</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>{renderSuggestions()}</tbody>
        </table>
      </div>
      <FooterComponent color="secondary" />
    </div>
  );
}
