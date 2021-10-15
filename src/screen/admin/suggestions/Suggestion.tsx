import React, { useEffect, useState } from 'react'
import 'dotenv/config'
import { NavbarComponent, navbarEnum } from '../../../components/navbar'
import api from '../../../services/api'
import { FooterComponent } from '../../../components/Footer';

import { BreadcrumbComponent } from '../../../components/Breadcrumb';


let breadcrumbs = [
  { url: '/Dashboard', text: 'administrativo'},
  { url: '/Dashboard', text: 'sugestões'}
]

export const SuggestionScreen = () => {
  const [ suggestions, setSuggestions ] = useState<any[]>([])

  useEffect(() => {
    loadSuggestion()
  }, [])

  async function loadSuggestion() {
    console.log('load suggestion')
    const suggestionResponse = api.get(`/suggestions`)

    try {
      const [ suggestion ] = await Promise.all([ suggestionResponse ])
      const suggestionJson = suggestion.data
      setSuggestions(suggestionJson)

    } catch(error) {
      console.log(error)
    }
  }

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
