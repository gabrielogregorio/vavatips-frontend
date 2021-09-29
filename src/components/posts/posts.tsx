import React, { useState } from "react";
import styles from './post.module.css'
type typeType = 'next' | 'prev'

export const PostComponent = ( { props }: any) => {
  const [ idImage, setIdImage ] = useState<number>(0)

  function nextImage(type: typeType, length: number) {
    if (type === 'next' && idImage < length -1 ) {
      setIdImage(idImage + 1)
    } else if (type === 'prev' && idImage > 0 ) {
      setIdImage(idImage - 1)
    }
  }


  return (
    <div className={styles.posts}>
      <h3 className={styles.titlePost}>{props.title}</h3>
      <p className={styles.description}>{props.description}</p>
      <p className={styles.tags}>
        <span> #{props.tags.map}</span> <span> #{props.tags.agent}</span> <span> #{props.tags.ability}</span> <br/>
        <span> #{props.tags.moment}</span> <span> #{props.tags.difficult}</span> <span> #{props.tags.side}</span> <span> #{props.tags.mapPosition}</span>
      </p>

      <div className={styles.imgAndDescription}>
        <div className={styles.imgPost}>
          <img src={props.imgs[idImage].img} alt={props.imgs[idImage].title} />

          { idImage > 0 ? (
            <div className={styles.previus} onClick={() => nextImage('prev', props.imgs.length)}>
              <i className="fas fa-angle-left"></i>
            </div>
          ) : null }

          { idImage < props.imgs.length -1 ? (
            <div className={styles.next} onClick={() => nextImage('next', props.imgs.length)}>
              <i className="fas fa-angle-right"></i>
            </div>
          ) : null }

          <p>{idImage + 1} - {props.imgs[idImage].title}</p>
        </div>
      </div>
    </div>
  )

}
