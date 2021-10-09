import React, { useEffect, useState } from 'react'
import api from '../../../services/api'
import { NavbarComponent, navbarEnum } from '../../../components/navbar/navbar'
import { logout } from '../../../services/auth'
import { LoaderComponent } from '../../../components/loader/loader'
import { FooterComponent } from '../../../components/Footer/footer'
import { BreadcrumbComponent } from '../../../components/Breadcrumb/Breadcrumb'

let breadcrumbs = [
  { url: '/Dashboard', text: 'administrativo'},
  { url: '/Dashboard', text: 'dashboard'}
]

export const DashboardScreen = () => {
  const [username, setUsername] = useState<string>("")
  const [errorMsg, setErrorMsg] = useState<string>("")
  const [ activeLoader, setActiveLoader ] = useState<boolean>(true)

  const [ countViewsIps, setCountViewsIps] = useState<number>(0)
  const [ countViewsAll, setCountViewsAll] = useState<number>(0)

  useEffect(() => {
    api.get(`/views`).then(res => {
      setCountViewsAll(res.data.countAll)
      setCountViewsIps(res.data.countIps)
    })

    api.get(`/user`).then(res => {
      setUsername(res.data.username)
      setActiveLoader(false)
    }).catch(error => {
      if(error?.response?.data?.msg === 'jwt expired') {
        setActiveLoader(false)
        logout()
      }
    })
  }, [])

  return (
    <div className="container">
       <NavbarComponent selected={navbarEnum.Dashboard} />
       <BreadcrumbComponent admin breadcrumbs={breadcrumbs} />

       <div className="subcontainer">

        <LoaderComponent  active={activeLoader}/>
        <p>{errorMsg}</p>

        <p>Bem vindo(a) {username}</p>

        <p>Consultas: {countViewsAll}</p>
        <p>Usuários: {countViewsIps}</p>

      </div>
      <FooterComponent color="secundary" />
    </div>
  )
}
