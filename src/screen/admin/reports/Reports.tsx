import React, { useEffect, useState } from 'react'
import 'dotenv/config'
import { NavbarComponent, navbarEnum } from '../../../components/navbar/navbar'
import api from '../../../services/api'
import { FooterComponent } from '../../../components/Footer/footer';

import { BreadcrumbComponent } from '../../../components/Breadcrumb/Breadcrumb';


let breadcrumbs = [
  { url: '/Dashboard', text: 'administrativo'},
  { url: '/Dashboard', text: 'reports'}
]

export const ReportScreen = () => {
  const [ reports, setReports ] = useState<any[]>([])

  useEffect(() => {
    loadReports()
  }, [])

  async function loadReports() {
    console.log('report suggestion')
    const reportResponse = api.get(`/reports`)

    try {
      const [ report ] = await Promise.all([ reportResponse ])
      const reportJson = report.data
      setReports(reportJson)
    } catch(error) {
      console.log(error)
    }
  }

  function renderReports() {
    return reports.map(report => (
        <tr key={report._id}>
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
        <thead>
          <tr>
            <th>Post</th>
            <th>Email</th>
            <th>Descrição</th>
            <th>Tela</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {renderReports()}
        </tbody>
        </table>

      </div>
      <FooterComponent color="secundary" />
    </div>
  )
}
