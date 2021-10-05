import React from 'react'
import { Link } from 'react-router-dom'
import styles from './style.module.css'

interface breadCrumbItemInterface {
  url: string,
  text: string
}

interface propsInterface {
  breadcrumbs: breadCrumbItemInterface[],
  admin?: boolean
}

export const BreadcrumbComponent = (props: propsInterface) => {

  function renderBreadCrumb() {
    let lastItem = props.breadcrumbs.length - 1

    return props.breadcrumbs.map((breadcrumb, index )=> {
      return (
        <div key={index}>
          {lastItem === index ? (
            <p>{breadcrumb.text}</p>
          ) : (
            <>
              <Link style={{color: props.admin ? 'var(--secundary)' : 'var(--primary)' }} to={breadcrumb.url}>{breadcrumb.text}</Link>
              <span  style={{color: props.admin ? 'var(--secundary)' : 'var(--primary)' }}>&gt;</span>
            </>
          )}
        </div>
      )
    })
  }

  return (
    <div className={styles.breadcrumb}>
      <div className={styles.breadcrumbItem}>
        {renderBreadCrumb()}
      </div>
    </div>
  )
}
