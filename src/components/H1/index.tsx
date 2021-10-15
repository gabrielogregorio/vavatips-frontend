import React from "react"

interface propsInterface {
  title: any
}

export const H1 = ({ title } : propsInterface) => {
  return <h1>{title}</h1>
}

