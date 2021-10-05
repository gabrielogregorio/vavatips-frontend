import React from "react";

interface propsInterface {
  text: string,
  value: string,
  setValue: (e: any) => void
}

export const Textarea = (props: propsInterface) => {
  return (
    <div className="groupInput">
    <div className="groupInputSelet">
      <label htmlFor="">{props.text}</label>
      <textarea value={props.value} onChange={(e) => props.setValue(e.target.value)}></textarea>
    </div>
   </div>
  )
}
