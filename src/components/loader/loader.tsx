import React from 'react'
import styles from './style.module.css'
interface loaderProps {
  active: boolean
}

export const LoaderComponent = (props: loaderProps) => {
  function renderActive() {
    return props.active ? (
      <div className={styles.loader}>
        <div>
        </div>
      </div>
    ) : null
  }

  return  (
    <>
      {renderActive()}
    </>
  )

}
