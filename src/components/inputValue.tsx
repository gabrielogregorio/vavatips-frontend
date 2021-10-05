import React from "react";
type typeInput = 'text' | 'password' | 'email'

interface propsInterface {
  text: string,
  value: string,
  type: typeInput,
  disabled?:  boolean,
  setValue: (e: any) => void
}

export const InputValue = (props: propsInterface) => {
  let disabled = props.disabled ?? false

  return (
    <div className="groupInput">
      <div className="groupInputSelet">
        <label htmlFor="">{props.text}</label>
        <input disabled={disabled} type={props.type} value={props.value}  onChange={(e) => props.setValue(e.target.value)} />
      </div>
    </div>
  )
}
