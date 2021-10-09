import React, { useEffect, useState } from 'react'
import 'dotenv/config'
import { NavbarComponent, navbarEnum } from '../../../components/navbar/navbar'
import api from '../../../services/api'
import { FooterComponent } from '../../../components/Footer/footer';

import { BreadcrumbComponent } from '../../../components/Breadcrumb/Breadcrumb';


let breadcrumbs = [
  { url: '/Dashboard', text: 'administrativo'},
  { url: '/Dashboard', text: 'sugestões'}
]

export const SuggestionScreen = () => {
  const [ suggestions, setSuggestions ] = useState<any[]>([])

  useEffect(() => {
    api.get(`/suggestions`).then(res => {
      setSuggestions(res.data)
    })
  }, [])

  function renderSuggestions() {
    return suggestions.map(report => (
        <tr key={report._id}>
          <td>{report.post_id}</td>
          <td>{report.email}</td>
          <td>{report.description}</td>
          <td>{report.status ?? 'Não atendido'}</td>
        </tr>
    ))
  }

  return (
    <div className="container">
      <NavbarComponent selected={navbarEnum.SuggestionScreen} />
      <BreadcrumbComponent admin breadcrumbs={breadcrumbs} />

      <div className="subcontainer">
      <table>
        <thead>
          <tr>
            <th>Post</th>
            <th>Email</th>
            <th>Descrição</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {renderSuggestions()}
        </tbody>
        </table>

      </div>
      <FooterComponent color="secundary" />
    </div>
  )
}
