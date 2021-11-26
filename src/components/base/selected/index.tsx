interface propsInterface {
  text: string,
  value: string,
  setValue: (event: any) => void,
  render: () => any[]
}

export const Selected = (props: propsInterface) => {

  function renderItems() {
    return props.render?.().map(item => {
      return <option value={item.name} key={item.id} >{item.name}</option>
    })
  }
     
  return (
    <div className="groupInputSelet">
      <label>{props.text}</label>
      <select value={props.value} onChange={(e) => props.setValue(e.target.value)} >
      <option value=""></option>
        {renderItems()}
      </select>
    </div>
  )
}
