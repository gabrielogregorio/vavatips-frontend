import React from "react";

interface propsInterface {
  text: string,
  value: string,
  list: any[],
  setValue: (e: any) => void
}

  // function renderList() {
  //   return props.list.map(item => {
  //     return <option value={item.name} key={item.id} >{item.name}</option>
  //   })
  // }

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
