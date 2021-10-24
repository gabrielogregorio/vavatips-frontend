import React, { useEffect, useState } from 'react'
import api from '../../../services/api'
import { NavbarComponent, navbarEnum } from '../../../components/Navbar'
import { logout } from '../../../services/auth'
import { LoaderComponent } from '../../../components/Loader'
import { FooterComponent } from '../../../components/Footer'
import { BreadcrumbComponent } from '../../../components/Breadcrumb'

let breadcrumbs = [
  { url: '/Dashboard', text: 'administrativo'},
  { url: '/Dashboard', text: 'dashboard'}
]

export const DashboardScreen = () => {
  const [username, setUsername] = useState<string>("")
  const [ errorMsg ] = useState<string>("")
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
