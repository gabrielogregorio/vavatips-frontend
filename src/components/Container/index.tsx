import React from "react";

interface propsInterface {
  children: any
}

export const Container = ({ children }: propsInterface) => {
  return (
    <div className="container">
      {children}
    </div>
  )
}
