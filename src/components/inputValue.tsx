import React from "react";

interface propsInterface {
  text: string,
  value: string,
  setValue: (e: any) => void
}

export const InputValue = (props: propsInterface) => {
  return (
    <div className="groupInput">
      <div className="groupInputSelet">
        <label htmlFor="">{props.text}</label>
        <input type="text" value={props.value}  onChange={(e) => props.setValue(e.target.value)} />
      </div>
    </div>
  )
}
