import React from "react";

interface propsInterface {
  text: string,
  value: string,
  list: any[],
  setValue: (e: any) => void
}

export const inputSelectedComponent = (props: propsInterface) => {

  return (
    <div className="groupInput">
      <div className="groupInputSelet">
        <label>{props.text}</label>
        <select value={props.value} onChange={(e) => props.setValue(e.target.value)} >
          <option value=""></option>
        </select>
      </div>
     </div>
  )
}
