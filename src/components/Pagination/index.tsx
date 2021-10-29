import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from './style.module.css'

type urlBase = 'ViewPosts' | 'Posts'

interface propsInterface {
  initial: number,
  finish: number,
  selected: number,
  map: string,
  agent: string,
  urlBase: urlBase
}

interface interfacePagination {
  id: number
}

export const PaginationComponent = (props: propsInterface) => {
  const [ pagination, setPagination ] = useState<interfacePagination[]>([])

  useEffect(() => {
    let paginationTemp:interfacePagination[] = []
    for(let i = 1; i <= props.finish; i++) {
      paginationTemp.push({id: i})
    }
    setPagination(paginationTemp)
  }, [props])


  function generateUrl(page:number): string {
    return `/${props.urlBase}?map=${props.map}&agent=${props.agent}&page=${page}`
  }


  function renderProps () {
    return pagination.map(pag => {

      // Se for o botão selecionado
      if(pag.id === props.selected) {
        return (
          <div className={styles.selectedButton} key={pag.id}>
            <Link to={generateUrl(pag.id)} className={styles.active}>{pag.id}</Link>
          </div>
        )

      // se a posição em análise for >= a posição selecionada - 2
      // ou se a posição em análise for <= a posição selecionada + 2
      }else if (pag.id >= props.selected -2 && pag.id <= props.selected + 2) {
        return (
          <div className={styles.selectedButton} key={pag.id}>
            <Link to={generateUrl(pag.id)}>{pag.id}</Link >
          </div>
        )

        // Se chegou na ultima posição
      } else if (pag.id === props.finish) {
        return (
          <div className={styles.selectedButton} key={pag.id}>
            <Link to={generateUrl(pag.id)}>{pag.id}</Link>
          </div>
        )

        // Se a posição selecionada for maior que 3 e apenas isso => ...
      } else if(pag.id === props.selected + 3) {
        return (
          <div className={styles.selectedButton} key={pag.id}>
            <p>...</p>
          </div>
        )

        // Se a posição em análise for 1
      }  else if(pag.id === 1) {
        return (
          <div className={styles.selectedButton} key={pag.id}>
            <Link to={generateUrl(pag.id)}>{pag.id}</Link >
          </div>
        )

        // se a posição for menor que 3 => ...
      }else if(pag.id === props.selected - 3) {
        return (
          <div className={styles.selectedButton} key={pag.id}>
            <p>...</p>
          </div>
        )
      }

      return null
    })
  }

  return (
    <div className={styles.pagination}>
      <div className={styles.paginationItems}>
        {renderProps()}
      </div>
    </div>
  )
}
