import React from "react"

interface propsInterface {
  children: any
}

export const Subcontainer = ({ children }: propsInterface) => {
  return (
    <div className="subcontainer">
      {children}
    </div>
  )
}
