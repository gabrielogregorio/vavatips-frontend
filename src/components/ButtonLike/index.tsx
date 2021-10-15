import React from "react";
import './styles.css'

type styleType = 'testBtn' | 'likeBtn' | 'suggestionBtn'

interface propsInterface {
  active: boolean,
  title: string,
  style: styleType,
  onClick: (data: any) => void
}

export const ButtonLike = (props: propsInterface) => {
  return <button
    className={`${props.style} ${props.active ? 'active' : ''}`}
    onClick={props.onClick}>{props.title}</button>
}
