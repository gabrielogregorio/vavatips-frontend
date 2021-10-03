import React from "react";
type typeInput = 'text' | 'password'

interface propsInterface {
  text: string,
  value: string,
  type: typeInput,
  setValue: (e: any) => void
}

export const InputValue = (props: propsInterface) => {
  return (
    <div className="groupInput">
      <div className="groupInputSelet">
        <label htmlFor="">{props.text}</label>
        <input type={props.type} value={props.value}  onChange={(e) => props.setValue(e.target.value)} />
      </div>
    </div>
  )
}
