import React, { useEffect, useState } from 'react'
import 'dotenv/config'
import { NavbarComponent, navbarEnum } from '../../../components/navbar/navbar'
import api from '../../../services/api'
import { FooterComponent } from '../../../components/Footer/footer';

import { BreadcrumbComponent } from '../../../components/Breadcrumb/Breadcrumb';


let breadcrumbs = [
  { url: '/Profile', text: 'administrativo'},
  { url: '/Profile', text: 'reports'}
]

export const ReportScreen = () => {
  const [ reports, setReports ] = useState<any[]>([])

  useEffect(() => {
    api.get(`/reports`).then(res => {
      setReports(res.data)
    })
  }, [])

  function renderReports() {
    return reports.map(report => (
        <tr>
          <td>{report.post_id}</td>
          <td>{report.email}</td>
          <td>{report.description}</td>
          <td>{report.screenHeight}x{report.screenWidth}</td>
          <td>{report.status ?? 'Não atendido'}</td>
         </tr>
    ))
  }

  return (
    <div className="container">
      <NavbarComponent selected={navbarEnum.ReportScreen} />
      <BreadcrumbComponent admin breadcrumbs={breadcrumbs} />

      <div className="subcontainer">
      <table>
          <tr>
            <th>Post</th>
            <th>Email</th>
            <th>Descrição</th>
            <th>Tela</th>
            <th>Status</th>
          </tr>
          {renderReports()}
        </table>

      </div>
      <FooterComponent color="secundary" />
    </div>
  )
}
